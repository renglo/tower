import {
  Bot,
  Bike,
  TimerReset,
} from "lucide-react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

import { NavLink } from 'react-router-dom'


interface ToolMenuProps {
    portfolio: string;
    org: string;
}


export default function ToolSchdSideNav({portfolio,org}:ToolMenuProps) {    
       
      return ( 
        
        <nav 
          className={
            (!location.pathname.split('/')[2] || location.pathname.split('/')[2]=='settings' )
              ? 'hidden' 
              : 'flex flex-col items-center gap-4 px-1 sm:py-4'
          }  
        >           
          
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/schd/schd_jobs`}
                      className={
                        location.pathname.split('/')[3] === 'schd_jobs'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <Bot className="h-5 w-5" />
                        <span className="sr-only">Jobs</span>
                    </NavLink>
                    <span className="text-xxs ">Jobs</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Jobs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/schd/schd_runs`}
                      className={
                        location.pathname.split('/')[3] === 'schd_runs'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <Bike className="h-5 w-5" />
                        <span className="sr-only">Runs</span>
                    </NavLink>
                    <span className="text-xxs ">Runs</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Runs</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/schd/schd_rules`}
                      className={
                        location.pathname.split('/')[3] === 'schd_rules'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <TimerReset className="h-5 w-5" />
                        <span className="sr-only">Rules</span>
                    </NavLink>
                    <span className="text-xxs ">Rules</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Rules</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          
        </nav>
      )
    }