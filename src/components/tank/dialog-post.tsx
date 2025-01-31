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


interface DialogPostProps {
  refreshUp: () => void; // refreshUpis a function 
  blueprint: any; // Replace 'any' with a more specific type if possible
  path: string;
  method: string;
  title: string;
  instructions: string;
}

export default function DialogPost({ refreshUp, blueprint, path, method, title, instructions }: DialogPostProps) {

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
        <Button>Create New</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>

            {instructions} 

          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[500px] w-[375px] rounded-md border p-6" >
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
