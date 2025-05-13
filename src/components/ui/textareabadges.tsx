import * as React from "react"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Define interface for the custom props
interface TextareaBadgesProps extends React.ComponentProps<"textarea"> {
  context?: {
    portfolio?: string;
    org?: string;
    section?: string;
    thread?: string;
  };
}

const Badges = React.memo(({ context }: { context?: TextareaBadgesProps['context'] }) => (
  <span className="flex flex-row gap-1 p-2">
    <Badge variant="outline">Portfolio: {context?.portfolio || ''}</Badge>
    <Badge variant="outline">Org: {context?.org || ''}</Badge>
    <Badge variant="outline">Section: {context?.section || ''}</Badge>
    <Badge variant="outline">Thread: {context?.thread || ''}</Badge>
  </span>
));

Badges.displayName = "Badges";

const TextareaBadges = React.memo(React.forwardRef<
  HTMLTextAreaElement,
  TextareaBadgesProps
>(({ className, context, ...props }, ref) => {
  return (
    <span className="w-full rounded-md border border-input">
      <Badges context={context} />
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
}));

TextareaBadges.displayName = "TextareaBadges"

export { TextareaBadges }
