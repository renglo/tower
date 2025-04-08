import {
    Pencil,
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
import ItemPreview from "@/components/tank/item-preview"

import { useState, useRef, useEffect } from 'react';


interface ItemPreviewProps { 
    selectedId: string;            
    refreshUp: () => void;         
    onDeleteId: (id: string) => void; 
    blueprint?: any;
    portfolio: string;
    org: string;
    ring: string;               
  }

export default function DialogPreviewWide({selectedId,refreshUp,onDeleteId,blueprint,portfolio,org,ring}: ItemPreviewProps) {
  const [open, setOpen] = useState(false);
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    setOpen(true);
  }, [selectedId]);

  // Function to update the state
  const refreshAction = () => {
      setOpen(false);
      refreshUp();
  };

  const handleDeleteId = (id: string) => {
      
    onDeleteId(id)
    
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Pencil className="h-5 w-5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[75vw] h-[50vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>:Title:</DialogTitle>
          <DialogDescription>
            :Instructions:
          </DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full w-full p-6">
            <ItemPreview 
                selectedId={selectedId} 
                refreshUp={refreshAction}
                onDeleteId={handleDeleteId}
                blueprint={blueprint}
                portfolio={portfolio}
                org={org}
                ring={ring}
            /> 
          </ScrollArea>
        </div>
        <DialogFooter>     
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
