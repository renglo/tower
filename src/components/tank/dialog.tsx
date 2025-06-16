import * as React from "react"
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

interface DialogProps {
  title: string
  instructions?: string
  children: React.ReactNode
  trigger?: React.ReactNode
  footer?: React.ReactNode
  maxWidth?: string
  maxHeight?: string
}

export function DialogComponent({
  title,
  instructions,
  children,
  trigger,
  footer,
  maxWidth = "425px",
  maxHeight = "60vh"
}: DialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">Open Dialog</Button>}
      </DialogTrigger>
      <DialogContent className={`sm:max-w-[${maxWidth}]`}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {instructions && (
            <DialogDescription>
              {instructions}
            </DialogDescription>
          )}
        </DialogHeader>
        <ScrollArea className={`h-[${maxHeight}]`}>
          {children}
        </ScrollArea>
        {footer && (
          <DialogFooter>
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
} 