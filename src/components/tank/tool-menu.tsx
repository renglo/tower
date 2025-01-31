import {
  LineChart,
  Plug,
  BookOpen,
  BookMarked,
  BetweenHorizontalStart,
  Scale,
  Wind,
  Upload,
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


export default function ToolMenu({portfolio,org}:ToolMenuProps) {    
       
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
                    to={`/${portfolio}/${org}/data`}
                    className={
                      location.pathname.split('/')[3] === 'data'
                        ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                        : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                    }
                    >
                      <LineChart className="h-5 w-5" />
                      <span className="sr-only">Metrics</span>
                    </NavLink>

                    <span className="text-xxs ">Metrics</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Metrics</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col hidden">
                    <NavLink
                      to={`/${portfolio}/${org}/adr/adr_dispatches`}
                      className={
                        location.pathname.split('/')[3] === 'adr'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <Plug className="h-5 w-5" />
                        <span className="sr-only">Connect</span>
                    </NavLink>
                    <span className="text-xxs ">Connect</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Connect</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/acct/acct_chartofaccounts`}
                      className={
                        location.pathname.split('/')[4] === 'acct_chartofaccounts'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <BookOpen className="h-5 w-5" />
                        <span className="sr-only">Books</span>
                    </NavLink>
                    <span className="text-xxs ">Books</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Books</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/acct/acct_accounts`}
                      className={
                        location.pathname.split('/')[4] === 'acct_accounts'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <BookMarked className="h-5 w-5" />
                        <span className="sr-only">Accounts</span>
                    </NavLink>
                    <span className="text-xxs ">Accounts</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Accounts</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/acct/journals`}
                      className={
                        location.pathname.split('/')[4] === 'journals'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <BetweenHorizontalStart className="h-5 w-5" />
                        <span className="sr-only">Journal</span>
                    </NavLink>
                    <span className="text-xxs ">Journal</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Journal</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/acct/ledger`}
                      className={
                        location.pathname.split('/')[4] === 'ledger'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <Scale className="h-5 w-5" />
                        <span className="sr-only">Ledger</span>
                    </NavLink>
                    <span className="text-xxs ">Ledger</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Ledger</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/acct/flow`}
                      className={
                        location.pathname.split('/')[4] === 'flow'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <Wind className="h-5 w-5" />
                        <span className="sr-only">Flow</span>
                    </NavLink>
                    <span className="text-xxs ">Flow</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Flow</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center flex-col">
                    <NavLink
                      to={`/${portfolio}/${org}/acct/upload`}
                      className={
                        location.pathname.split('/')[4] === 'upload'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                    >
                        <Upload className="h-5 w-5" />
                        <span className="sr-only">Upload</span>
                    </NavLink>
                    <span className="text-xxs ">Upload</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right">Upload</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>


      )

    }