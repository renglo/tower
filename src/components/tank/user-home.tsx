import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

import {
    Avatarsq,
    AvatarsqFallback,
    AvatarsqImage,
  } from "@/components/ui/avatarsq"

import { Badge } from "@/components/ui/badge"

import { useContext } from 'react';
import { GlobalContext } from "@/components/tank/global-context"
import { NavLink } from "react-router-dom";

interface Portfolio {
  name: string;
  portfolio_id: string;
  orgs: Record<string, Org>;
  tools: Record<string, Tool>;
}

interface Org {
  name: string;
  org_id: string;
  active: boolean;
  handle: string;
  tools: string[];
}

interface Tool {
  name: string;
  handle: string;
}

export default function UserHome() {


  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };

  return (
    <div className="chart-wrapper mx-auto flex max-w-6xl flex-col flex-wrap items-start justify-center gap-6 p-6 sm:flex-row sm:p-8">
      
      <div className="flex flex-row gap-4 ">

        {
        (tree.portfolios) ? (
          Object.keys(tree.portfolios).length > 0 ? (
            Object.values(tree?.portfolios)
              .filter(p => p.orgs && 
                  Object.keys(p.orgs).length > 0 && 
                  Object.values(p.orgs).some(org => org['active'] === true)
              )
              .map((p) => (

              //Check if p.orgs is empty, if it is, skip this Object
            
           
          <Card className="max-w-xs">
            <CardHeader>
              <CardTitle>{p.name}
              <div className="font-sans text-sm font-normal tracking-normal text-muted-foreground">
                  
              </div>
              </CardTitle>
              <CardDescription>
                
                
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                  <div className="grid gap-4 grid-cols-3">
                      {
                          (p.orgs && Object.keys(p.orgs).length > 0) ? (
                              Object.values(p.orgs)
                                  .filter(row => row['active'] === true)
                                  .map((row) => (
                
                                  
                                  <div className="flex items-center flex-col">
                                    
                                      <Avatarsq>
                                          <AvatarsqImage src={`${import.meta.env.VITE_API_URL}/_docs/${p.portfolio_id}/${row['org_id']}/_thumbnails/${row['org_id']}.png`} />
                                          <AvatarsqFallback>{row['handle'].substring(0, 3)}</AvatarsqFallback>
                                      </Avatarsq>
                                      <span className="text-xxs ">{row['name'].substring(0, 15)}</span> 

                                      
                                      {Array.isArray(row['tools']) && row['tools'].length > 0 ? (
                                          row['tools'].map((tool, index) => (
                                              <NavLink key={index} to={`/${p.portfolio_id}/${row['org_id']}/${p.tools[tool].handle}`}>
                                                  <Badge variant="outline" className="text-xxs">{p.tools[tool].name.substring(0, 10)}</Badge>
                                              </NavLink>
                                          ))
                                      ) : (
                                          <div className="text-xs text-muted-foreground">No Tools Available</div>
                                      )}
                                    
                                  </div>
                                  
                
                              ))
                          ) : (
                              <div className="text-xs text-muted-foreground">No Orgs</div>
                          )
                      }
                  </div>
            </CardContent>
          </Card>
          
          ))


          ) : (
            <div className='flex flex-col gap-4'>
         
            <span>Go to account settings to install apps in your environment. <a href='/account'>Click here</a></span>
            </div>
          )      

        ) : (
        <Card className="max-w-xs">
            <CardHeader>
              <CardTitle></CardTitle>
              <CardDescription></CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex items-center gap-2 flex-row">
                    <div className="text-xs text-muted-foreground">
                      Loading...
                    </div>
                </div>
            </CardContent>
        </Card>
        )
    
    }

   
      </div>
      
    </div>
  )
}
