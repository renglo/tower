// GlobalContext
import React, { createContext, useState } from 'react';


// Define the shape of your context
interface Org {
  handle: string;
  name: string;
  org_id: string;
}

interface App {
  actions: string[];
  app_id: string;
  handle: string;
  name: string;
}

interface Team {
  apps: { [appId: string]: App };
  name: string;
  team_id: string;
}

interface Portfolio {
  name: string;
  orgs: { [orgId: string]: Org };
  portfolio_id: string;
  teams: { [teamId: string]: Team };
}

interface Tree {
  portfolios: { [portfolioId: string]: Portfolio };
  user_id: string;
  error?: string; //Only when there is an error. 
}


interface GlobalContextType {
  user: string;
  loadUser: () => void;  // Add the loadUser function
  tree: Tree;
  loadTree: () => void;
  refresh: boolean; 
}

// Create the context with `undefined` as a possible value
export const GlobalContext = createContext<GlobalContextType | undefined>(undefined);


// We store user and tree documents in sessionStorage as GlobalContext seems to lose context seldomly.
// This provides a "start where you left" opportunity to the GlobalContext when this happens. 

// Define a type for the provider props
interface GlobalProviderProps {
  children: React.ReactNode;
}

// Create a provider component
export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {

  const [refresh, setRefresh] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const [user, setUser] = useState(() => {
    const savedData = sessionStorage.getItem('user');
    return savedData ? JSON.parse(savedData) : {};
  });
  const [tree, setTree] = useState(() => {
    const savedData = sessionStorage.getItem('tree');
    return savedData ? JSON.parse(savedData) : {};
  });


  const loadUser = async () => {
    try {
      // Fetch UserDoc
      const Response = await fetch(`${import.meta.env.VITE_API_URL}/_auth/user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${sessionStorage.accessToken}`,
        },
      });
      const Data = await Response.json();
      setUser(Data);
      //Backup
      sessionStorage.setItem('user', JSON.stringify(Data));
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


  /* Error returned to fetch when Token is expired
  {
    "description": "Token is expired",
    "error": "Invalid Cognito Authentication Token"
  }
  */

  // Get tree document
  const loadTree = async () => {
    try {
        // Fetch UserDoc
        const Response = await fetch(`${import.meta.env.VITE_API_URL}/_auth/tree`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${sessionStorage.accessToken}`,
        },
        });
      
        const Data = await Response.json();

        if (Data?.error) {
          console.log('Error exists:', Data.error);
          sessionStorage.clear();
          window.location.href = `/login`;
        }else{
          setTree(Data);
          //Backup
          sessionStorage.setItem('tree', JSON.stringify(Data));
          setRefresh(prev => !prev); 
        }
        
             

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



  return (
    <GlobalContext.Provider value={{ user, loadUser, tree, loadTree, refresh }}>
      {children}
    </GlobalContext.Provider>
  );
};