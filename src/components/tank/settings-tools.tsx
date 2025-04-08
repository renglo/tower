import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  RefreshCcw,
} from "lucide-react"

import { useParams,useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "@/components/tank/global-context"

import ToolsCard from "@/components/tank/tools-card"
import DialogPost from "@/components/tank/dialog-post"


interface Blueprint {
  label: string;
  // Add other properties as needed
  [key: string]: any; // This allows for additional dynamic properties if necessary
}

interface Tool {
  tool_id: string;
  name: string;
  handle: string;
}

interface Portfolio {
  name: string;
  portfolio_id: string;
  orgs: Record<string, Org>;
  teams: Record<string, Team>;
  tools: Record<string, Tool>;
}

interface Org {
  name: string;
  org_id: string;
  active: boolean;
}

interface Team {
  name: string;
  team_id: string;
}
  
export default function SettingsTools() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };
  console.log(tree);


  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1]
  //const p_setting = location.pathname.split('/')[3]


  const [blueprint, setBlueprint] = useState<Blueprint>({ label: '' });
  const [refresh, setRefresh] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const { ring } = useParams(); // Extract the 'route' parameter from the URL



  useEffect(() => {
      // Function to fetch Blueprint
      const fetchBlueprint = async () => {
        try {
          // Fetch Blueprint
          const blueprintResponse = await fetch(`${import.meta.env.VITE_API_URL}/_blueprint/sys/entities/last`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${sessionStorage.accessToken}`,
            },
          });
          const blueprintData = await blueprintResponse.json();
          setBlueprint(blueprintData);
          setRefresh((prev: boolean) => !prev); 
          console.log(refresh)

          

        } catch (err) {
          if (err instanceof Error) {
            setError(err);  // Now TypeScript knows `err` is of type `Error`.
          } else {
            setError(new Error("An unknown error occurred"));  // Handle other types
          }
          console.log(error)
        } finally {
          //setLoading(false);
        }
      };

      fetchBlueprint();
  }, [ring]);


  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    
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
          <div className="grid gap-6 overflow-y-auto max-h-[calc(100vh-180px)]">
            <Card className="">
              <CardHeader>
                <CardTitle>Tools</CardTitle>
                <CardDescription>
                A tool helps your team do something specific in your organization 
              </CardDescription>
              </CardHeader>
              <CardContent className="hidden">
                <DialogPost
                            refreshUp={refreshAction}
                            blueprint={blueprint}
                            title={`Activate a tool in this portfolio`}
                            instructions="Indicate the id of the tool to install, It must be a valid"
                            path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${p_portfolio}/tools`}
                            method='POST'
                />
              </CardContent>  
            </Card>
            <div className="grid gap-4 grid-cols-1">
            {
              (tree?.portfolios[p_portfolio]?.tools && Object.keys(tree?.portfolios[p_portfolio]?.tools).length > 0) ? (
                Object.values(tree?.portfolios[p_portfolio]?.tools as Record<string, Tool>).map((row: Tool) => (
                  <ToolsCard
                    key={row.tool_id}
                    tooldoc={row}
                    teamsdict={tree?.portfolios[p_portfolio]?.teams}
                    orgsdict={tree?.portfolios[p_portfolio]?.orgs}
                    portfolioid={p_portfolio}
                  />
                ))
              ) : (
                <div className="text-xs text-muted-foreground">No Tools</div>
              )
            }
            </div>
            <button onClick={refreshTree} className="flex items-center">
                      <RefreshCcw className="h-5 w-5" />
            </button>
          </div>
          
  )
}
