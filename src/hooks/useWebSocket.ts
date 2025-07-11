import { useEffect, useState, useCallback, useRef } from "react";

interface WebSocketPayload {
  action?: string;
  entity_type?: string;
  entity_id?: string;
  thread?: string;
  portfolio?: string;
  org?: string;
}

interface UseWebSocketOptions {
  onMessage?: (data: any) => void;
  onError?: (error: Event) => void;
  onOpen?: () => void;
  onClose?: () => void;
  autoReconnect?: boolean;
  reconnectDelay?: number;
}

export const useWebSocket = (options: UseWebSocketOptions = {}) => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);
  const connectingRef = useRef(false);
  
  // Store callbacks in refs to prevent recreation
  const callbacksRef = useRef(options);
  callbacksRef.current = options;

  const connectWebSocket = useCallback(() => {
    // Prevent multiple simultaneous connection attempts
    if (connectingRef.current || (wsRef.current && wsRef.current.readyState === WebSocket.CONNECTING)) {
      return;
    }
    
    connectingRef.current = true;
    setIsConnecting(true);
    
    const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`);

    socket.onopen = () => {
      console.log("WebSocket connected");
      connectingRef.current = false;
      setIsConnecting(false);
      setIsConnected(true);
      callbacksRef.current.onOpen?.();
    };

    socket.onmessage = (event) => {
      console.log("Received message:", event.data);
      const parsedData = JSON.parse(event.data);
      callbacksRef.current.onMessage?.(parsedData);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      connectingRef.current = false;
      setIsConnecting(false);
      setIsConnected(false);
      callbacksRef.current.onError?.(error);
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected");
      connectingRef.current = false;
      setIsConnecting(false);
      setIsConnected(false);
      callbacksRef.current.onClose?.();
      
      // Attempt to reconnect after a delay
      if (callbacksRef.current.autoReconnect !== false) {
        setTimeout(() => {
          if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) {
            connectWebSocket();
          }
        }, callbacksRef.current.reconnectDelay || 3000);
      }
    };

    wsRef.current = socket;
  }, []);

  const sendMessage = useCallback((message: string, payload: WebSocketPayload = {}) => {
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log('Message out:', message);

      const ws_payload = {
        action: payload.action,
        data: message,
        auth: `${sessionStorage.accessToken}`,
        entity_type: payload.entity_type,
        entity_id: payload.entity_id,
        thread: payload.thread,
        portfolio: payload.portfolio,
        org: payload.org
      };

      wsRef.current.send(JSON.stringify(ws_payload));
      return true;
    } else {
      console.error("WebSocket is not connected.");
      // Attempt to reconnect if not already connecting
      if (!connectingRef.current) {
        connectWebSocket();
      }
      return false;
    }
  }, [connectWebSocket]);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
    }
  }, []);

  useEffect(() => {
    connectWebSocket();

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [connectWebSocket]);

  return {
    sendMessage,
    disconnect,
    isConnected,
    isConnecting,
    connect: connectWebSocket
  };
}; 