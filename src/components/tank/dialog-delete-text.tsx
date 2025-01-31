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
import FormDelete from "@/components/tank/form-delete"

import { useState } from 'react';


interface DialogDeleteTextProps {
    selectedKey: string;          // Assuming selectedKey is a string; change type as needed
    selectedValue: any;           // Replace 'any' with a more specific type if possible
    refreshUp: () => void;      // refreshUp is a function; 
    path: string;
    method: string;
    title: string;
    instructions: string;
}

export default function DialogDeleteText({ selectedKey, selectedValue, refreshUp, path, method, title, instructions }: DialogDeleteTextProps) {


  const [open, setOpen] = useState(false);

  // Function to update the state
  const refreshAction = () => {
      setOpen(false);
      refreshUp();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <span >Remove user from team</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {instructions}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-[375px] rounded-md border p-6" >
          <FormDelete  
                selectedKey={selectedKey} 
                selectedValue={selectedValue}
                refreshUp={refreshAction}
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
