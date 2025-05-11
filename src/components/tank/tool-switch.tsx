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

import { useState, useContext } from 'react';
import { GlobalContext } from "@/components/tank/global-context"
import { useLocation, useNavigate } from 'react-router-dom';


import { Badge } from "@/components/ui/badge"

interface Portfolio {
  name: string;
  portfolio_id: string;
  orgs: Record<string, Org>;
  tools: Record<string, Tool>;
}

interface Org {
  name: string;
  org_id: string;
  tools: string[];
}

interface Tool {
  name: string;
  handle: string;
}

interface ToolSwitchProps {
  refreshUp: () => void; 
}

export default function ToolSwitch({ refreshUp }: ToolSwitchProps) {

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
  const p_org = location.pathname.split('/')[2];

  const [open, setOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState(location.pathname.split('/')[3]);


  


  return (
    <div className="flex items-center space-x-4">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>     
            <div className="flex items-center flex-col">
            {selectedTool ? (
            
            <Badge variant="outline" className="text-xxs">{selectedTool}</Badge>
            
            ) : (
            <span className="text-xxs ">Select One</span>
            )}
            </div>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput placeholder="Switch tool" />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup>

                      {tree && 
                       tree.portfolios && 
                       tree.portfolios[p_portfolio] && 
                       tree.portfolios[p_portfolio].orgs && 
                       tree.portfolios[p_portfolio].orgs[p_org] &&
                       tree.portfolios[p_portfolio].orgs[p_org].tools ? (
                          tree.portfolios[p_portfolio].orgs[p_org].tools.length > 0 ? (
                            tree.portfolios[p_portfolio].orgs[p_org].tools
                              .map((tool_id) => (
                              <CommandItem
                                key={tool_id}
                                value={tool_id}
                                onSelect={() => {
                                  setSelectedTool(tree.portfolios[p_portfolio].tools[tool_id].handle);
                                  setOpen(false);
                                  refreshUp();
                                  navigate(`/${p_portfolio}/${p_org}/${tree.portfolios[p_portfolio].tools[tool_id].handle}`);
                                }}
                              >
                                <div className="flex items-center gap-4 flex-row">
                                  
                                  <Badge
                                    className={cn(
                                      "text-xxs",
                                      tool_id === selectedTool ? "opacity-100" : "opacity-30"
                                    )}
                                    variant="outline">{tree.portfolios[p_portfolio].tools[tool_id].handle}</Badge>

                                  <span
                                    className={cn(
                                      "",
                                      tool_id === selectedTool ? "font-extrabold" : "font-light"
                                    )}
                                  >
                                    {tree.portfolios[p_portfolio].tools[tool_id].name}
                                  </span>
                                </div>
                              </CommandItem>
                            ))
                          ) : (
                            <div className="text-xs text-muted-foreground">No Tools</div>
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
