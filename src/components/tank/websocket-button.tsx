import {
    Send,
} from "lucide-react"
import { useEffect, useState } from "react";

interface WebSocketPayload {
  action?: string;
  handler?: string;
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
}

export default function WebSocketButton({messageUp,messageReset,message,payload = {} as WebSocketPayload}: ButtonProps) {

    const [ws, setWs] = useState<WebSocket | null>(null);
    //const [input, setInput] = useState<string>("");

    useEffect(() => {

        const socket = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}`);
    
        socket.onopen = () => {
          console.log("WebSocket connected");
          // Optionally, send an initial message upon connection.
          // socket.send(JSON.stringify({ action: "init", data: "Hello from client" }));
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
        };
    
        socket.onclose = () => {
          console.log("WebSocket disconnected");
        };
    
        setWs(socket);
    
        // Clean up the WebSocket connection when the component unmounts
        return () => {
          socket.close();
        };
    }, []);

    const sendMessage = () => {
        if (ws && ws.readyState === WebSocket.OPEN) {
          console.log('Message out:',message)
    
          const ws_payload = {
            action: payload.action,
            data: message,
            auth: `${sessionStorage.accessToken}`,
            handler: payload.handler, 
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
          messageReset(false)
        }
    };

    return (

        <Send onClick={sendMessage} className="h-5 w-5" />
        
    )
}
