import {
    Plus,
    History,
    ToyBrick,
    Boxes,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"

import { Button } from "@/components/ui/button"

interface ThreadItem {
  _id: string;
  time: string;
}

interface ChatHistoryProps {
  history: { items: ThreadItem[] };
  actionUp: (id: string) => void;
}

export default function ChatHistory({history, actionUp}: ChatHistoryProps) {


    return (
        <>
            <Button variant="ghost" className="" onClick={() => actionUp('new_thread')}>
                    <span className="sr-only">New Chat</span>
                    <Plus className="h-8 w-8" />
            </Button>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="">
                    <span className="sr-only">Chat History</span>
                    <History className="h-8 w-8" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Chat History</DropdownMenuLabel>
                        {history?.items?.map((item) => (
                            <DropdownMenuItem key={item._id} onClick={() => actionUp(item._id)}>
                                {new Date(parseFloat(item.time) * 1000).toLocaleString()}
                            </DropdownMenuItem>
                        ))}
                    <DropdownMenuSeparator />
                        <DropdownMenuItem className="hidden">
                            New chat
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="hidden" onClick={() => actionUp('new_workspace')}>
                    <span className="sr-only">New Workspace</span>
                    <ToyBrick className="h-8 w-8" />
            </Button>

            <div className="h-px w-full bg-gray-200 my-2"></div>


            <Button variant="ghost" className="hidden" onClick={() => actionUp('new_concept')}>
                    <span className="sr-only">New Concept</span>
                    <Boxes className="h-6 w-6" />
            </Button>
        </>

    
  )
}
