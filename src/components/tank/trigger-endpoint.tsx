import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState } from 'react';

interface TriggerEndpointProps {
  path: string;
  method: string;
  payload: any;
  statusUp: () => void;
  captions: {
    response_ok_title: string;
    response_ok_content: string;
    response_ko_title: string;
    response_ko_content: string;
    dialog_title: string;
    dialog_instructions: string;
    dialog_cta: string;
  };
  onResponse?: (response: any) => void;
  onError?: (error: ErrorDetails) => void;
}

interface ErrorDetails {
  status: number;
  statusText: string;
  method: string;
  path: string;
  message: string;
  details?: any;
}

const getErrorFacts = (response: Response, method: string, path: string, errorData: any): ErrorDetails => {
  const facts: Record<number, string> = {
    400: "Bad Request - The server could not understand the request",
    401: "Unauthorized - Authentication is required",
    403: "Forbidden - The server understood but refuses to authorize",
    404: "Not Found - The requested resource does not exist",
    405: "Method Not Allowed - The HTTP method is not supported",
    408: "Request Timeout - The server timed out waiting for the request",
    409: "Conflict - The request conflicts with current state",
    413: "Payload Too Large - The request entity is too large",
    415: "Unsupported Media Type - The media format is not supported",
    429: "Too Many Requests - Rate limit exceeded",
    500: "Internal Server Error - Something went wrong on the server",
    502: "Bad Gateway - Invalid response from upstream server",
    503: "Service Unavailable - The server is temporarily unavailable",
    504: "Gateway Timeout - The upstream server timed out"
  };

  return {
    status: response.status,
    statusText: response.statusText,
    method,
    path,
    message: facts[response.status] || "An unexpected error occurred",
    details: errorData
  };
};

export default function TriggerEndpoint({ 
  path, 
  method, 
  payload, 
  statusUp, 
  captions,
  onResponse,
  onError 
}: TriggerEndpointProps) {

  const [open, setOpen] = useState(false);
  console.log('Manual Trigger')
  

  const { toast } = useToast();

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
        console.log(captions['response_ok_title']);
        toast({
          title: captions['response_ok_title'],
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{captions['response_ok_content']}</code>
              </pre>
          ),
        });
        setOpen(false);
        statusUp();
        
        // Call onResponse with the response data
        if (onResponse) {
          const data = await response.json();
          onResponse(data);
        }
      } else {
        const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
        const errorFacts = getErrorFacts(response, method, path, errorData);
        
        console.error(captions['response_ko_title'], errorFacts);
        toast({
          title: captions['response_ko_title'],
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{errorFacts.message}</code>
              </pre>
          ),
        });
        setOpen(false);

        // Send error details to parent component
        if (onError) {
          onError(errorFacts);
        }
      }

    } catch (error) {
      console.error('Error:', error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{captions['dialog_cta']}</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{captions['dialog_title']}</DialogTitle>
          <DialogDescription>

          {`${method}:${captions['dialog_instructions']}`}

          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] w-[375px] rounded-md border p-6" >
          <span className="flex flex-col gap-6">
            <pre className="text-sm bg-gray-100 p-2 rounded">
              {JSON.stringify(payload, null, 2)}
            </pre>
            <Button onClick={handleGoClick}>{captions['dialog_cta']}</Button>
          </span>
         
        </ScrollArea>
        <DialogFooter>     
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
