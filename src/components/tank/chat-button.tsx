import {
    Send,
} from "lucide-react"


interface ButtonProps {
  path: string;
  method: string;
  messageUp: () => void;
  payload?: {};
}

export default function ChatButton({ path, method, messageUp, payload = {} }: ButtonProps) {

  // Function to handle button click
  const handleGoClick = async () => {
    try {
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
    
        <Send onClick={handleGoClick} className="h-5 w-5" />
        
  )
}
