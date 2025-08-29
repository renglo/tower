import {
    Plus,
} from "lucide-react"

import { Button } from "@/components/ui/button"

interface ChatNewProps {
  actionUp: (id: string) => void;
}

export default function ChatNew({actionUp}: ChatNewProps) {


    return (
        <>
            <Button variant="ghost" className="" onClick={() => actionUp('new_thread')}>
                    <span className="sr-only">New Chat</span>
                    <Plus className="h-8 w-8" />
            </Button>
        </>

    
  )
}
