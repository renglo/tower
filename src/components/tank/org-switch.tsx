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

interface OrgSwitchProps {
  refreshUp: () => void; 
}

export default function OrgSwitch({ refreshUp }: OrgSwitchProps) {

  const navigate = useNavigate();


  // Handle case when context might be undefined
  const context = useContext(GlobalContext);

  if (!context) {
    throw new Error("No GlobalProvider");
  }
  const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };


  //const { tree } = useContext(GlobalContext);
  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1];

  const [open, setOpen] = useState(false);
  const [selectedOrg, setSelectedOrg] = useState(location.pathname.split('/')[2]);

  const app_now = location.pathname.split('/')[3];
  const ring_now = location.pathname.split('/')[4] || '';


  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>     
            <div className="flex items-center flex-col">
            {selectedOrg ? (
            <>
            <Avatarsq>
                <AvatarsqImage src={`${import.meta.env.VITE_API_URL}/_docs/${p_portfolio}/${selectedOrg}/_thumbnails/${selectedOrg}.png`} />
                <AvatarsqFallback></AvatarsqFallback>
            </Avatarsq>
            
             <span className="text-xxs ">{tree && 'portfolios' in tree ? tree?.portfolios[p_portfolio]?.orgs[selectedOrg]?.name : ''}</span>
            </>
            ) : (
            <span className="text-xxs ">Select One</span>
            )}
            </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Switch organization" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>

                      {tree && tree.portfolios && tree.portfolios[p_portfolio] ? (
                          tree.portfolios[p_portfolio].orgs &&
                          Object.keys(tree.portfolios[p_portfolio].orgs).length > 0 ? (
                            Object.values(tree.portfolios[p_portfolio].orgs as Record<string, Org>)
                              .filter((row: Org) => row.active === true)
                              .map((row: Org) => (
                              <CommandItem
                                key={row.org_id}
                                value={row.org_id}
                                onSelect={() => {
                                  setSelectedOrg(row.org_id);
                                  setOpen(false);
                                  refreshUp();
                                  navigate(`/${p_portfolio}/${row.org_id}/${app_now}/${ring_now}`);
                                }}
                              >
                                <div className="flex items-center gap-4 flex-row">
                                  <Avatarsq
                                    className={cn(
                                      "",
                                      row.org_id === selectedOrg ? "opacity-100" : "opacity-30"
                                    )}
                                  >
                                    <AvatarsqImage src={`${import.meta.env.VITE_API_URL}/_docs/${p_portfolio}/${row.org_id}/_thumbnails/${row.org_id}.png`} />
                                    <AvatarsqFallback>
                                      {row.handle.substring(0, 3)}
                                    </AvatarsqFallback>
                                  </Avatarsq>
                                  <span
                                    className={cn(
                                      "",
                                      row.org_id === selectedOrg ? "font-extrabold" : "font-light"
                                    )}
                                  >
                                    {row.name}
                                  </span>
                                </div>
                              </CommandItem>
                            ))
                          ) : (
                            <div className="text-xs text-muted-foreground">No Orgs</div>
                          )
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
