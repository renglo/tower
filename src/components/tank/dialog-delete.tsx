import {
    Eraser,
  } from "lucide-react"
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


interface DialogDeleteProps {
    selectedKey: string;          // Assuming selectedKey is a string; change type as needed
    selectedValue: any;           // Replace 'any' with a more specific type if possible
    refreshUp: () => void;      // refreshUp is a function
    path: string;
    method: string;
    title: string;
    instructions: string;
}

export default function DialogDelete({ selectedKey, selectedValue, refreshUp, path, method, title, instructions }: DialogDeleteProps) {


  const [open, setOpen] = useState(false);

  // Function to update the state
  const refreshAction = () => {
      setOpen(false);
      refreshUp();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Eraser className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
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
