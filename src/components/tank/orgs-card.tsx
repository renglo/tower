import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import DialogPut from '@/components/tank/dialog-put'
import DialogUpload from '@/components/tank/dialog-upload'
import DialogDelete from '@/components/tank/dialog-delete'
import { useState, useEffect } from 'react';


interface OrgMosaicProps { 
  orgdoc: any; 
  teamsdict: any;
  portfolioid: string;
}




export default function OrgsCard({orgdoc,teamsdict,portfolioid}: OrgMosaicProps) {


  const [refresh, setRefresh] = useState(false);
  const [imgError, setImgError] = useState(false);

  // Reset imgError when refresh changes
  useEffect(() => {
    setImgError(false); // Reset error state to false
  }, [refresh]);

  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    //refreshUp();
    console.log(refresh);

  };
    
  return (

            <Card>
                <CardHeader className="pb-2">
                <CardDescription>
                  id:{orgdoc.org_id}
                </CardDescription>
                <CardTitle className="group text-lg">
                  <span className="flex items-center gap-2">
                   <Badge variant="org">Org</Badge>
                   {orgdoc.name}
                    <span 
                      className={
                        teamsdict
                          ? 'flex items-center gap-2'
                          : 'flex items-center gap-2 hidden'
                      }
                    >
                      <DialogPut 
                            selectedKey='name' 
                            selectedValue={orgdoc.name} 
                            refreshUp={refreshAction}
                            title="Edit attribute"
                            instructions="Modify the attribute and click save."
                            path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${portfolioid}/orgs/${orgdoc.org_id}`}
                            method='PUT'
                      />
                      <DialogDelete 
                              selectedKey='name' 
                              selectedValue={orgdoc.name} 
                              refreshUp={refreshAction}
                              title="Delete entity"
                              instructions={`Are you sure you want to delete this Organization? 
                                All its assets (data, models, history) will be permanently deleted.`}
                              path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${portfolioid}/orgs/${orgdoc.org_id}`}
                              method='DELETE'
                      /> 
                    </span>
                  </span>   
                </CardTitle>
                </CardHeader>
              
                <CardContent>
                
                <div className="text-xs text-muted-foreground">
                    {orgdoc.about} {orgdoc.location}
                    {imgError ? (
                      <div style={{ width: '381px', height: '381px', backgroundColor: 'lightgray' }}></div>
                    ) : (
                      <img 
                        src={`${import.meta.env.VITE_API_URL}/_docs/${portfolioid}/${orgdoc.org_id}/_thumbnails/${orgdoc.org_id}.png?refresh=${refresh}`} 
                        onError={() => setImgError(true)}
                      />
                    )}
                </div>
                <div>
                  <DialogUpload
                      portfolio={portfolioid} 
                      org={orgdoc.org_id}
                      refreshUp = {refreshAction}
                      path = {`${import.meta.env.VITE_API_URL}/_docs/${portfolioid}/${orgdoc.org_id}/_thumbnails`}
                      title = 'Image upload'
                      instructions = 'Format:PNG, Ideally square format, no more than 1000x1000'
                  />
                </div>
                </CardContent>
                
            </Card>
           
  )
}
