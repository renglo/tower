import {
    Plus,
    History,
    ToyBrick,
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
                        <DropdownMenuItem>
                            New chat
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button variant="ghost" className="" onClick={() => actionUp('new_workspace')}>
                    <span className="sr-only">New Workspace</span>
                    <ToyBrick className="h-8 w-8" />
            </Button>
        </>

    
  )
}
