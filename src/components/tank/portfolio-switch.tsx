import { cn } from "@/lib/utils"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Avatarsq,
  AvatarsqFallback,
  AvatarsqImage,
} from "@/components/ui/avatarsq"
import { Badge } from "@/components/ui/badge"

import { useState, useContext } from 'react';
import { GlobalContext } from "@/components/tank/global-context"
import { useLocation, useNavigate } from 'react-router-dom';

interface Portfolio {
  name: string;
  portfolio_id: string;
  orgs: Record<string, Org>;
}

interface Org {
  name: string;
  org_id: string;
  handle: string;
  active: boolean;
}

interface SwitchProps {
  refreshUp: () => void; 
}

export default function PortfolioSwitch({ refreshUp }: SwitchProps) {

  const navigate = useNavigate();


  // Handle case when context might be undefined
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("No GlobalProvider");
  }
  const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };


  //const { tree } = useContext(GlobalContext);
  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState(location.pathname.split('/')[1]);

  const app_now = location.pathname.split('/')[3];
  const ring_now = location.pathname.split('/')[4] || '';


  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>     
            <div className="flex items-center flex-col">
            {selectedPortfolio ? (
            <>
          
            <Badge variant="outline" className="text-xxs">{tree && 'portfolios' in tree ? tree?.portfolios[selectedPortfolio]?.name : ''}</Badge>

            </>
            ) : (
            <span className="text-xxs ">Select One</span>
            )}
            </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Switch Portfolio" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>

                      {tree && tree.portfolios ?  (
                            Object.values(tree.portfolios as Record<string, Portfolio>) 
                              .map((row: Portfolio) => (
                              <CommandItem
                                key={row.portfolio_id}
                                value={row.portfolio_id}
                                onSelect={() => {
                                  setSelectedPortfolio(row.portfolio_id);
                                  setOpen(false);
                                  refreshUp();
                                  navigate(`/${row.portfolio_id}/_p/${app_now}/${ring_now}`);
                                }}
                              >
                                <div className="flex items-center gap-4 flex-row">
                                  

                                  <Badge
                                    className={cn(
                                      "text-xxs",
                                      row.portfolio_id === selectedPortfolio ? "opacity-100" : "opacity-30"
                                    )}
                                    variant="outline">{row.name}
                                  </Badge>



                                  <span
                                    className={cn(
                                      "",
                                      row.portfolio_id === selectedPortfolio ? "font-extrabold" : "font-light"
                                    )}
                                  >
                                    {row.name}
                                  </span>
                                </div>
                              </CommandItem>
                            ))
                          ) : (
                          <div className="text-xs text-muted-foreground"></div> // Handle loading state
                      )}



              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
