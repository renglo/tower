import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import {
  EllipsisVertical,
  LibraryBig,
} from "lucide-react"

import { NavLink,useLocation } from 'react-router-dom';

import { useState, useEffect, useRef} from 'react';

import DataTable from "@/components/tank/data-table"
import ItemPreview from "@/components/tank/item-preview"
import DialogPost from "@/components/tank/dialog-post"
import { overloadBlueprint, Blueprint } from '@/lib/tank_utils';

interface ToolDataCRUDProps {
  readonly: boolean;
}

export default function ToolDataCRUD({ readonly }: ToolDataCRUDProps) {

    const location = useLocation();
    const isInitialMount = useRef(true);

    const [blueprint, setBlueprint] = useState<Blueprint>({ label: '' });
    const [selectedId, setSelectedId] = useState<string>('');
    const [deletedId, setDeletedId] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    const portfolio_id = location.pathname.split('/')[1]
    const org_id = location.pathname.split('/')[2] 
    //const app_id = location.pathname.split('/')[3]
    const ring_id = location.pathname.split('/')[4]


    //console.log('BLUEPRINT 000');
    //console.log(blueprint)

    useEffect(() => {
        // Function to fetch Blueprint and Data
        const fetchBlueprint = async () => {
          try {
            // Fetch Blueprint
            const blueprintResponse = await fetch(`${import.meta.env.VITE_API_URL}/_blueprint/irma/${ring_id}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${sessionStorage.accessToken}`,
              },
            });
            const blueprintData = await blueprintResponse.json();
            setBlueprint(blueprintData);
            
            setRefresh(prev => !prev);
    
            // After fetching blueprint, run overloadBlueprint
            const updatedBlueprint = await overloadBlueprint(blueprintData, portfolio_id, org_id);
            if (updatedBlueprint) {
                setBlueprint(updatedBlueprint);
            }
    
          } catch (err) {
            if (err instanceof Error) {
              setError(err); 
            } else {
              setError(new Error("An unknown error occurred"));  // Handle other types
            }
            console.log(error)
          }
        };
        
        fetchBlueprint();
        
    }, [location]);



    useEffect(() => {
        // Function to fetch Blueprint and Data
        const deleteItem = async () => {
          try {

            // Delete Request 
            const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_data/${portfolio_id}/${org_id}/${ring_id}/${deletedId}`, {
              method: 'DELETE',
              headers: {
                'Authorization': `Bearer ${sessionStorage.accessToken}`,
              },
            });
            const dataData = await dataResponse.json();
            
            console.log('Deleted Item:');
            console.log(dataData);
    
    
          } catch (err) {
            if (err instanceof Error) {
              setError(err);  // Now TypeScript knows `err` is of type `Error`.
            } else {
              setError(new Error("An unknown error occurred"));  // Handle other types
            }
            console.log(error)
          } finally {
            //setLoading(false);
            setRefresh(prev => !prev);
            console.log('Set Refresh!');
          }
        };


        // Skip the fetch call on the initial render
        if (isInitialMount.current) {
          isInitialMount.current = false;  // Mark that the component has loaded
          return;  // Exit the useEffect early to avoid running deleteItem
        }

        // This will run on subsequent updates when `deletedId` changes
        if (deletedId) {  // Make sure there's a valid deletedId
          deleteItem();
        }

    }, [deletedId]);



    // Function to handle the selected id passed from the child component
    const handleSelectId = (id: string) => {
      console.log('Handling the clicked row:');
      console.log(id);
      setSelectedId(id);
    };

    // Function to handle the deleted id passed from the child component
    const handleDeleteId = (id: string) => {
        console.log('Handling the deleted id:')
        console.log(id)
        setDeletedId(id);
    };

    // Function to update the state
    const refreshAction = () => {
        setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
        //refreshUp(); No need to go up further

    };

    return (

            
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
            <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">

                <nav className="ml-auto flex items-center gap-2 hidden">
                  
                  <NavLink
                    to={`/${portfolio_id}/${org_id}/data`}
                    className={({ isActive }) => (isActive ? "h-8 gap-1" : "h-8 gap-1")}
                    style={{ textDecoration: 'none' }} // Ensure no default link styling
                  >
                    {({ isActive }) => (
                      <Button size="sm" variant={isActive ? "default" : "outline"} className="w-full gap-1">
                        <LibraryBig className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Metrics
                        </span>
                      </Button>
                    )}
                  </NavLink>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <EllipsisVertical className="h-3.5 w-3.5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuCheckboxItem checked>
                        <NavLink
                          to={`/${portfolio_id}/${org_id}/data`}
                        >
                        Dashboard
                        </NavLink>           
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                </nav>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                  <Card
                      className="sm:col-span-4"
                  >
                      <CardHeader className="pb-3">
                          <CardTitle>{blueprint.label}</CardTitle>
                          <CardDescription className="max-w-lg text-balance leading-relaxed">
                              {blueprint.description}
                          </CardDescription>
                      </CardHeader>
                      <CardFooter>
                          {!readonly && (
                              <DialogPost
                                  refreshUp={refreshAction}
                                  blueprint={blueprint}
                                  title={`Creating new ${blueprint.label}`}
                                  instructions="Enter the information you have now. You can add to it later."
                                  path={`${import.meta.env.VITE_API_URL}/_data/${portfolio_id}/${org_id}/${ring_id}`}
                                  method='POST'
                              />
                          )}
                      </CardFooter>
                  </Card>
                </div>

             
                <div>
                  <Card>
                      <CardHeader className="px-0">

                      </CardHeader>
                      <CardContent>
                      <DataTable 
                          onSelectId={handleSelectId}                        
                          refresh={refresh}
                          blueprint={blueprint}
                      >
                      </DataTable>
                      </CardContent>   
                  </Card>  
                </div>  
                  
                
            </div>
            <div className="sticky top-5">
                <ItemPreview 
                   selectedId={selectedId} 
                   refreshUp={refreshAction}
                   onDeleteId={handleDeleteId}
                   blueprint={blueprint}
                   portfolio_id={portfolio_id}
                   org_id={org_id}
                   ring_id={ring_id}
                /> 
            </div>
        </main>

    )
}
