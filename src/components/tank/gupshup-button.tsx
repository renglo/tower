import {
    Phone,
} from "lucide-react"

interface ChatPayload {
  action?: string;
  data?: string;
  [key: string]: any;
}

interface ButtonProps {
  path: string;
  method: string;
  messageUp: (response: any) => void;
  messageReset: (value: boolean) => void;
  message: string;
  payload?: ChatPayload;
}

export default function GupshupButton({ path, method, messageUp, messageReset, message, payload = {} }: ButtonProps) {
  
    // This component emulates a Gupshup request
  const gupshup_payload = {   
        "app": "DemoApp", 
        "timestamp": new Date().getTime(),   
        "version": 2, 
        "type": "message",    
        "payload": {  
            "id": "ABEGkYaYVSEEAhAL3SLAWwH" + Math.random().toString(36).substring(2,15),   
            "source": payload['sender'],   
            "type": "text", 
            "payload": {    
            // Varies according to the type of payload. 
                "message" : message
            },  
            "sender": { 
            "phone": payload['sender'],  
            "name": "FirstLast",   
            "country_code": "91", 
            "dial_code": "1234567" 
            },  
            "context": {    
            "id": "XXXXXXX",  
            "gsId": "YYYYYY"    
            }   
        } 
    }

  const handleGoClick = async () => {
    try {
      messageReset(true);
      let response;
      if(method=='POST'){
        response = await fetch(path, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.accessToken}`,
          },
          body: JSON.stringify(gupshup_payload),
        });
      }else if(method=='DELETE'){
        response = await fetch(path, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${sessionStorage.accessToken}`,
          }
        });
      }else{
        throw new Error('Invalid method');  // proper error throwing in JavaScript/TypeScript
      }
      
      
      if (response.ok) {
        const jsonResponse = await response.json();
        messageUp(jsonResponse);
      } else {
        messageUp({'success':false});
      }

    } catch (error) {
      console.error('Error:', error);
      messageUp({'success':false});
    }
  }

  return (
    
        <Phone color="#ddd" onClick={handleGoClick} className="h-5 w-5" />
  )
}
