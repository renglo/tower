import {
  Braces,
  RefreshCcw,
} from "lucide-react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"

import DialogPut from '@/components/tank/dialog-put'
import DialogDelete from '@/components/tank/dialog-delete'

import { GlobalContext } from "@/components/tank/global-context"
import { useState,useContext } from 'react';
import { useLocation} from 'react-router-dom';
import GraphTreeRadial from "@/components/tank/graph-tree-radial"

interface Portfolio {
  name: string;
  orgs: Record<string, Org>;
  teams: Record<string, Team>;
  tools: Record<string, Tool>;
}

interface Org {
  name: string;
  org_id: string;
  active: boolean;
  teams: string[];
}

interface Team {
  name: string;
  team_id: string;
  tools: Record<string, string>;
}

interface Tool {
  name: string;
  handle: string;
}

export const description =
  "Settings Home"

export default function SettingsHome() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };
  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1]

  const [refresh, setRefresh] = useState(false);

  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    console.log(refresh);
  };


  const refreshTree = async () => {
    try {
      // Fetch Blueprint
      await fetch(`${import.meta.env.VITE_API_URL}/_auth/tree/refresh`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.accessToken}`,
        },
      });
  
    } catch (err) { 
      console.log(err); // Log the error directly
    }
  };

  return (
          <div className="grid gap-6">
            
            <Card>
              <CardHeader>
                <CardTitle></CardTitle>
                <CardDescription>
                  
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-8">

                <div className="flex items-center gap-4 px-6 py-6">
                  <Badge variant="portfolio">Portfolio</Badge>
                  <span className="flex items-center gap-1 group text-2xl font-semibold"> 
                      {tree.portfolios[p_portfolio].name}    
                      <DialogPut 
                        selectedKey='name' 
                        selectedValue={tree.portfolios[p_portfolio].name} 
                        refreshUp={refreshAction}
                        title="Edit Portfolio"
                        instructions="Modify the Portfolio name and click save."
                        path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${p_portfolio}`}
                        method='PUT'
                      />                       
                      <DialogDelete 
                            selectedKey='name' 
                            selectedValue={tree.portfolios[p_portfolio].name} 
                            refreshUp={refreshAction}
                            title="Delete entity"
                            instructions="Are you sure you want to delete this portfolio?"
                            path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${p_portfolio}`}
                            method='DELETE'
                      />            
                  </span>
                  <HoverCard>
                    <HoverCardTrigger><Braces className="h-5 w-5" /></HoverCardTrigger>
                    <button onClick={refreshTree} className="flex items-center">
                      <RefreshCcw className="h-5 w-5" />
                    </button>
                    <HoverCardContent className="w-120">
                      <pre className="mt-12 w-full rounded-md bg-slate-950 p-4">
                          <code className="text-white font-small">{JSON.stringify(tree.portfolios[p_portfolio], null, 2)}</code>
                      </pre>               
                    </HoverCardContent>
                  </HoverCard>
                </div>


                <Card
                  className="max-w-xl"
                >
                  <CardContent>
                    <GraphTreeRadial />
                  </CardContent>
                </Card>


                
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 hidden">
                    <code className="text-white">{JSON.stringify(tree.portfolios[p_portfolio], null, 2)}</code>
                </pre> 
              </CardFooter>
            </Card>
          </div>
  )
}
