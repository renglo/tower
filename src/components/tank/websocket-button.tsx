import {
    Send,
} from "lucide-react"
import { useEffect, useState } from "react";

interface WebSocketPayload {
  action?: string;
  entity_type?: string;
  entity_id?: string;
  thread?: string;
  portfolio?: string;
  org?: string;
}

interface ButtonProps {
  messageUp: (response: any) => void;
  messageReset: (value: boolean) => void;
  message: string;
  payload?: WebSocketPayload;
  trigger?: boolean;
}

export default function WebSocketButton({messageUp,messageReset,message,payload = {} as WebSocketPayload, trigger}: ButtonProps) {

    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);

    const connectWebSocket = () => {
        if (isConnecting) return;
        
        setIsConnecting(true);
        const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`);
    
        socket.onopen = () => {
          console.log("WebSocket connected");
          setIsConnecting(false);
        };
    
        socket.onmessage = (event) => {
          console.log("Received message:", event.data); 
          const msg = {
            "type":'rs',
            "update": JSON.parse(event.data)
          }
          messageUp(msg);
        };
    
        socket.onerror = (error) => {
          console.error("WebSocket error:", error);
          setIsConnecting(false);
        };
    
        socket.onclose = () => {
          console.log("WebSocket disconnected");
          setIsConnecting(false);
          // Attempt to reconnect after a delay
          setTimeout(() => {
            if (!ws || ws.readyState !== WebSocket.OPEN) {
              connectWebSocket();
            }
          }, 3000); // Wait 3 seconds before attempting to reconnect
        };
    
        setWs(socket);
    };

    useEffect(() => {
        connectWebSocket();
    
        // Clean up the WebSocket connection when the component unmounts
        return () => {
          if (ws) {
            ws.close();
          }
        };
    }, []);

    useEffect(() => {
        if (trigger) {
            sendMessage();
        }
    }, [trigger]);

    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          console.log('Message out:',message)
    
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

          const msg = {
            "type":'rq',
            "doc":{
              "message":message,
              "author_id":sessionStorage.cu_handle,
              "time": Math.floor(Date.now() / 1000),
              "output":''
            }
          }

          ws.send(JSON.stringify(ws_payload));
          messageReset(true);
          messageUp(msg);
        } else {
          console.error("WebSocket is not connected.");
          messageReset(false);
          // Attempt to reconnect if not already connecting
          if (!isConnecting) {
            connectWebSocket();
          }
        }
    };

    return (

        <span className="flex items-center">
          <Send onClick={sendMessage} className="h-5 w-5" />
        </span>     
        
    )
}
