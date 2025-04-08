import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { useParams, useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from "@/components/tank/global-context"


import OrgsCard from "@/components/tank/orgs-card"
import DialogPost from "@/components/tank/dialog-post"


interface Blueprint {
  label: string;
  // Add other properties as needed
  [key: string]: any; // This allows for additional dynamic properties if necessary
}
  
export default function SettingsOrgs() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context;

  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1]
  
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
    setRefresh((prev: boolean) => !prev);  // Toggle the `refresh` state to trigger useEffect
  };


  return (
          <div className="grid gap-1 overflow-y-auto max-h-[calc(100vh-180px)]">
            <Card className="">
              <CardHeader>
                <CardTitle>Organizations</CardTitle>
                <CardDescription>
                   An organization is a stand-alone entity that belongs to your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DialogPost
                            refreshUp={refreshAction}
                            blueprint={blueprint}
                            title={`Create a new Organization`}
                            instructions="Enter the name of your organization, you'll be able to add more information about it later"
                            path={`${import.meta.env.VITE_API_URL}/_auth/orgs/${p_portfolio}`}
                            method='POST'
                />
              </CardContent>  
            </Card>
            <div className="grid gap-4 grid-cols-2">
            {
              (tree?.portfolios[p_portfolio]?.orgs && Object.keys(tree?.portfolios[p_portfolio]?.orgs).length > 0) ? (
                  Object.values(tree?.portfolios[p_portfolio]?.orgs).map((row) => (

                    <OrgsCard
                      key={row['org_id']}
                      orgdoc={row}
                      teamsdict={tree?.portfolios[p_portfolio]?.teams}
                      portfolioid={p_portfolio}
                    />

                  ))
              ) : (
                <div className="text-xs text-muted-foreground">No Orgs</div>
              )
            }
            </div>  
          </div>
  )
}
