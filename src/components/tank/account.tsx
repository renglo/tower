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

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import DialogPost from "@/components/tank/dialog-post"

import Onboarding from "@/tools/onboarding"


export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."


interface Blueprint {
  label: string;
  // Add other properties as needed
  [key: string]: any; // This allows for additional dynamic properties if necessary
}


  

export default function Account() {

  
  const [blueprint, setBlueprint] = useState<Blueprint>({ label: '' });
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { ring } = useParams(); // Extract the 'route' parameter from the URL


  useEffect(() => {
      // Function to fetch Entities Blueprint
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


  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    console.log(refresh);
    
  };

  return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      
          <div className="grid grid-cols-3 gap-4 ">
            <Card className="hidden">
              <CardHeader>
                <CardTitle>Portfolios </CardTitle>
                <CardDescription>
                   A Portfolio is an entity used to group organizations.
                </CardDescription>
              </CardHeader>
              <CardContent>

                <DialogPost
                            refreshUp={refreshAction}
                            blueprint={blueprint}
                            title={`Create a new Portfolio`}
                            instructions="Enter the name of the portfolio, you'll be able to add more information about it later"
                            path={`${import.meta.env.VITE_API_URL}/_auth/portfolios`}
                            method='POST'
                />
              </CardContent>             
            </Card> 
            <Card>
              <CardHeader>
                <CardTitle>Install Gartic App</CardTitle>
                <CardDescription>
                  Click here to initiate the installation process.
                </CardDescription>
              </CardHeader>
              <CardContent>

                <div className="text-xs text-muted-foreground">
                    
                    <Onboarding/>
                  </div>
                
              </CardContent>             
            </Card> 
          </div>
          <button onClick={refreshTree} className="flex items-center">
                      <RefreshCcw className="h-2 w-2" />
          </button>
        </div>
  )
}
