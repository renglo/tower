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

interface TriggerManualProps {
  path: string;
  method: string;
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
  payload?: {};
}

export default function TriggerManual({ path, method, statusUp, captions, payload = {} }: TriggerManualProps) {

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
          

      } else {
        console.error(captions['response_ko_title']);
        toast({
          title: captions['response_ko_title'],
          description: (
              <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">{captions['response_ko_content']}</code>
              </pre>
          ),
        });
        setOpen(false);
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

          {captions['dialog_instructions']}

          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] w-[375px] rounded-md border p-6" >
          <Button onClick={handleGoClick}>{captions['dialog_cta']}</Button>
        </ScrollArea>
        <DialogFooter>     
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
