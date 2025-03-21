import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Define interface for the custom props
interface TextareaBadgesProps extends React.ComponentProps<"textarea"> {
  context?: {
    portfolio?: string;
    org?: string;
    thread?: string;
  };
}

const TextareaBadges = React.forwardRef<
  HTMLTextAreaElement,
  TextareaBadgesProps  // Use the new interface here
>(({ className, context, ...props }, ref) => {
  return (
    <span className="w-full rounded-md border border-input">
        <span className="flex flex-row gap-1 p-2" >
            <Badge variant="outline">Portfolio: {context?.portfolio || ''}</Badge>
            <Badge variant="outline">Org: {context?.org || ''}</Badge>
            <Badge variant="outline">Thread: {context?.thread || ''}</Badge>
        </span>
        <textarea
        className={cn(
            "flex w-full min-h-[40px] bg-background px-3 py-2 text-base placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
        )}
        ref={ref}
        {...props}
        />
    </span>
  )
})
TextareaBadges.displayName = "TextareaBadges"

export { TextareaBadges }
