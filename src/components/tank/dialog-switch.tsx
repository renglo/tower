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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import FormSwitch from "@/components/tank/form-switch"

import { useState } from 'react';


interface DialogSwitchProps {
    refreshUp: () => void; 
    path: string;
    method: string;
    title: string;
    instructions: string;
    label: string;
}

export default function DialogSwitch({ refreshUp, path, method, title, instructions,label }: DialogSwitchProps) {


  const [open, setOpen] = useState(false);

  // Function to update the state
  const refreshAction = () => {
      setOpen(false);
      refreshUp();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2">
            <Switch 
                defaultChecked={
                    method === 'DELETE'
                      ? true
                      : false
                  } 
                key={path} 
                id={path}  
            />
            <Label 
                htmlFor={path}
            >
                {label}
            </Label>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {instructions}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[300px] w-[375px] rounded-md border p-6" >
          <FormSwitch               
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
