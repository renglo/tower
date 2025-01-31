import {
  Search,
  EllipsisVertical,
  Database,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavLink } from 'react-router-dom'
import { useState } from 'react';

interface ToolMenuProps {
    portfolio: string;
    org: string;
}


export default function ToolDataSheetNav({portfolio,org}:ToolMenuProps) {  
    
    const [open, setOpen] = useState(false);
       
    return ( 

        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <EllipsisVertical className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              
            

        
        
            <nav className="grid gap-6 text-lg font-medium">

                <NavLink
                    to={`/home`}
                    onClick={() => {
                        setOpen(false);
                    }}
                    className="group flex h-11 w-11 shrink-0 items-center justify-center gap-2  md:h-8 md:w-8 md:text-base"     
                > 
                    
                    <img src={`${import.meta.env.VITE_WL_LOGO}`} className="ml-auto h-12 w-12" alt="Logo" />
                    <span className="sr-only">Logo</span>
                </NavLink> 
                <NavLink
                    to={`/${portfolio}/${org}/data`}
                    onClick={() => {
                        setOpen(false);
                    }}
                    className="flex items-center gap-4 px-2.5 text-foreground"
                >
                    <Database className="h-5 w-5" />
                    Data
                </NavLink>
                
                <span className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8"
                    />
                </span>
            </nav>

            </SheetContent>
        </Sheet>
    )
}