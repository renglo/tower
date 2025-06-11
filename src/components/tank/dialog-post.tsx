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
import { ScrollArea } from "@/components/ui/scroll-area"
import FormPost from "@/components/tank/form-post"
import { useState } from 'react';

import {
  SquarePlus,
} from "lucide-react"


interface DialogPostProps {
  refreshUp: () => void; // refreshUpis a function 
  blueprint: any; // Replace 'any' with a more specific type if possible
  path: string;
  method: string;
  title: string;
  instructions: string;
  buttontext?:string;
}

export default function DialogPost({ refreshUp, blueprint, path, method, title, instructions, buttontext }: DialogPostProps) {

  const [open, setOpen] = useState(false);
  console.log('Blueprint @ DialogPost')
  console.log(blueprint);

  // Function to update the state
  const refreshAction = () => {
    setOpen(false);
    refreshUp()

  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        
        <SquarePlus />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>

            {instructions} 

          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh]">
          <FormPost
              refreshUp={refreshAction}
              blueprint={blueprint}
              path={path}
              method={method}
          />
        </ScrollArea>
        <DialogFooter>     
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
