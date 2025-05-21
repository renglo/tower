import {
    Snail,
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

export default function ChatButton({ path, method, messageUp, messageReset, message, payload = {} }: ButtonProps) {

  // Function to handle button click
  payload['data'] = message
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
          body: JSON.stringify(payload),
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
    
        <Snail color="#f8f7f7" onClick={handleGoClick} className="h-5 w-5" />
  )
}
