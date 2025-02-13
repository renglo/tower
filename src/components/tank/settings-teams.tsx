import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { GlobalContext } from "@/components/tank/global-context"
import { useState, useEffect, useContext } from 'react';
import { useParams,useLocation } from 'react-router-dom';

import TeamCard from "@/components/tank/team-card"
import DialogPost from "@/components/tank/dialog-post"


interface Blueprint {
  label: string;
  // Add other properties as needed
  [key: string]: any; // This allows for additional dynamic properties if necessary
}

export default function SettingsTeams() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context;

  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1]
  //const p_setting = location.pathname.split('/')[3]

  const [blueprint, setBlueprint] = useState<Blueprint>({ label: '' });
  const [refresh, setRefresh] = useState(false);
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
          setRefresh(prev => !prev);
          console.log(refresh);

          

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


  return (
          <div className="grid gap-6">
            <Card className="">
              <CardHeader>
                <CardTitle>Teams</CardTitle>
                <CardDescription>
                  A team is a group of people that operate across the organizations in your portfolio.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DialogPost
                            refreshUp={refreshAction}
                            blueprint={blueprint}
                            title={`Create a new Team`}
                            instructions="Enter the name of your new team, you'll be able to add more information about it later"
                            path={`${import.meta.env.VITE_API_URL}/_auth/teams/${p_portfolio}`}
                            method='POST'
                />
              </CardContent>           
            </Card>
            {
              (tree?.portfolios[p_portfolio]?.teams && Object.keys(tree?.portfolios[p_portfolio]?.teams).length > 0) ? (
                  Object.values(tree?.portfolios[p_portfolio]?.teams).map((row) => (

                    <TeamCard 
                       key={row['team_id']}
                       teamdoc={row}
                       portfolioid={p_portfolio}
                    />

                  ))
              ) : (
                
                  <div className="flex items-center gap-2 flex-row">
                    <div className="text-xs text-muted-foreground">No Teams</div>
                  </div>
                
              )
            }
            
          </div>
  )
}
