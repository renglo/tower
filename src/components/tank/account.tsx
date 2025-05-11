import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  RefreshCcw,
  Copy,
  Check,
} from "lucide-react"

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import DialogPost from "@/components/tank/dialog-post"

import Onboarding from "@/onboarding"


export const description =
  "A settings page. The settings page has a sidebar navigation and a main content area. The main content area has a form to update the store name and a form to update the plugins directory. The sidebar navigation has links to general, security, integrations, support, organizations, and advanced settings."


interface Blueprint {
  label: string;
  // Add other properties as needed
  [key: string]: any; // This allows for additional dynamic properties if necessary
}

interface TokenResponse {
  success: boolean;
  output: string;
}

  

export default function Account() {

  
  const [blueprint, setBlueprint] = useState<Blueprint>({ label: '' });
  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [token, setToken] = useState<TokenResponse>({ success: false, output: '' });
  const [copied, setCopied] = useState(false);
  const [refreshed, setRefreshed] = useState(false);

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



  useEffect(() => {
    // Function to fetch Data
    const fetchData = async () => {
        try {
        
        // Fetch Data
        const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_auth/user/token`, {
            method: 'GET',
            headers: {
            'Authorization': `Bearer ${sessionStorage.accessToken}`,
            },
        });
        const response = await dataResponse.json();
        setToken(response);
        console.log('Token:',response);
            
        } catch (err) {
          console.error(err);
        } finally {
        //setLoading(false);
        }
    };
    
    fetchData();
  }, []);


  const refreshTree = async () => {
    try {
      // Fetch Blueprint
      await fetch(`${import.meta.env.VITE_API_URL}/_auth/tree/refresh`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.accessToken}`,
        },
      });
      setRefreshed(true);
      setTimeout(() => setRefreshed(false), 2000); // Reset after 2 seconds
    } catch (err) { 
      console.log(err);
    }
  };


  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    console.log(refresh);  
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(token.output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
  };

  return (
        <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8 overflow-y-auto max-h-[calc(100vh-40px)]">
      
          <div className="grid grid-cols-3 gap-4 ">
            <Card>
              <CardHeader>
                <CardTitle>Portfolios </CardTitle>
                <CardDescription>
                   Create an empty portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground"> 
                  <DialogPost
                              refreshUp={refreshAction}
                              blueprint={blueprint}
                              title={`Create a new Portfolio`}
                              instructions="Enter the name of the portfolio, you'll be able to add more information about it later"
                              path={`${import.meta.env.VITE_API_URL}/_auth/portfolios`}
                              method='POST'
                              buttontext='Create new'
                  />
                </div>
              </CardContent>             
            </Card> 

            <Card>
              <CardHeader>
                <CardTitle>API Token </CardTitle>
                <CardDescription>
                You can use this token to make test API calls. However you should implement an Auth2.0 cycle to generate and refresh the token dynamically in your application. 
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-4 text-xs text-muted-foreground"> 
                
                Copy Token  
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy onClick={handleCopy} className="h-5 w-5 hover:text-blue-500 transition-colors" />
                )}
                  
                  
                </div>
              </CardContent>             
            </Card> 

            <Card>
              <CardHeader>
                <CardTitle>Refresh Auth Tree </CardTitle>
                <CardDescription>
                The system doesn't need you to refresh the tree as it does it automatically. Use this option only to troubleshoot. 
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-row gap-4 text-xs text-muted-foreground"> 
                
                  
                {refreshed ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <RefreshCcw onClick={refreshTree} className="h-5 w-5 hover:text-blue-500 transition-colors" />
                )}
                  
                  
                </div>
              </CardContent>             
            </Card> 
            
            <Onboarding/>
      
          </div>
          
        </div>
  )
}


