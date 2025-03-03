import {
    ChevronLeft,
    ChevronRight,
    Copy,
    MoreVertical,
} from "lucide-react"
  

import { Button } from "@/components/ui/button"
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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import { useState, useEffect } from 'react';

import DialogPut from '@/components/tank/dialog-put'
import ImagePreview from "@/components/tank/image-preview"


interface ItemPreviewProps { 
  selectedId: string;            
  refreshUp: () => void;         
  onDeleteId: (id: string) => void; 
  blueprint?: any;
  portfolio: string;
  org: string;
  ring: string;               
}


interface DataType {
  name?: string;
  _id?: string;
  [key: string]: any; // Additional properties
}

interface FieldDictionary {
  [key: string]: {
    widget?: string;
    hint?: string;
    label?: string;
  };
}

interface BlueprintField {
  name: string;
  widget?: string;
  hint?: string;
  label?: string;
}

  
export default function ItemPreview({selectedId,refreshUp,onDeleteId,blueprint,portfolio,org,ring}: ItemPreviewProps) {


    //const [data, setData] = useState({}); // State to hold table data
    const [data, setData] = useState<DataType>({});

    //const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState<Error | null>(null);
    const [refresh, setRefresh] = useState(false);
    const [showCard, setShowCard] = useState(true);
    const [fieldsDictionary, setFieldsDictionary] = useState<FieldDictionary>({});

    useEffect(() => {
        // Function to fetch Data
        const fetchData = async () => {
            try {

            console.log('About to fetch');
            
            // Fetch Data
            const dataResponse = await fetch(`${import.meta.env.VITE_API_URL}/_data/${portfolio}/${org}/${ring}/${selectedId}`, {
                method: 'GET',
                headers: {
                'Authorization': `Bearer ${sessionStorage.accessToken}`,
                },
            });
            const response = await dataResponse.json();
            setData(response);
            setShowCard(true);
        
        
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
        
        fetchData();
    }, [selectedId,refresh]);


    useEffect(() => {
        // Iterate through blueprint.fields and generate a dictionary where the key is the name and the content is the field object itself
        const dictionary: FieldDictionary = {};
        if (blueprint && blueprint.fields) {
            blueprint.fields.forEach((field: BlueprintField) => {
                dictionary[field.name] = field;
            });
        }
        setFieldsDictionary(dictionary);
    }, [blueprint]);




      
    // Function to update the state
    const refreshAction = () => {
        setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
        refreshUp();

    };


    const handleDeleteId = (id: string) => {
      
      onDeleteId(id)
      setData({});
      setShowCard(false);
      
    };


    
    {/*

    // This is a temporary solution for the MVP. Ring names are hardcoded in the code #gross
    function GraphToShow({ name }: { name: string }) {
      let componentToRender;
  
      switch (name) {
          case 'usecase1':
              componentToRender = <GraphTimeseries2 />;
              break;
          case 'usecase2':
              componentToRender = <GraphBarchart />;
              break;
          case 'usecase3':
              componentToRender = <GraphComparisonBar />;
              break;
          case 'usecase4':
              componentToRender = <GraphRadial />;
              break;
          case 'usecase5':
              componentToRender = <GraphWave />;
              break;
          default:
              componentToRender = <div></div>;
      }
  
      return (   
        <div className="grid gap-3">
          {componentToRender}
        </div>
      );
    }

    */}

    return (

    <>
      <Card
        className="overflow-hidden"
      > 
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
            {(!selectedId || !showCard) ? (
              <span>All</span>
            ) : (         
              <span>{data.name}</span>
            )}
              
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Item ID</span>
              </Button>
            </CardTitle>
            <CardDescription className={`${(!selectedId || !showCard) ? 'hidden' : ''}`}>id: {data._id}</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <MoreVertical className="h-3.5 w-3.5" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="text-gray-300">Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onClick={() => handleDeleteId(selectedId)}
                >Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-12 p-6 text-sm">  

          {(!selectedId || !showCard) ? (
                <span>Select an item from the list to see its details</span>
              ) : (         
                <ImagePreview blueprint={blueprint} data={data}/>
          )}
          
          
          <div className={`grid gap-3  ${(!selectedId || !showCard) ? 'hidden' : ''}`}>
            <div className="font-semibold">Item Details</div>
            <ul className="grid gap-3">
            {Object.entries(data).map(([key, value]) => (

                fieldsDictionary[key]?.widget !== 'image' && !key.startsWith('_') ? (
                    <li 
                        key={key}
                        className="group flex items-center justify-between">
                        <span className="text-muted-foreground">
                            {key}:
                        </span>
                        <span className="flex items-center gap-1">
                            <DialogPut 
                                selectedKey={key} 
                                selectedValue={value} 
                                refreshUp={refreshAction}
                                blueprint={blueprint}
                                title="Edit attribute"
                                instructions="Modify the attribute and click save."
                                path={`${import.meta.env.VITE_API_URL}/_data/${portfolio}/${org}/${ring}/${selectedId}`}
                                method='PUT'
                            />
                            {typeof value === 'object' && value !== null ? JSON.stringify(value) : blueprint?.rich?.[blueprint.sources?.[key]?.split(':')[0]]?.[value] ?? value}
                        </span> 
                    </li>
                ) : null


            ))}
            </ul>
          </div>   
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Last Updated <time dateTime="2023-11-23">{data._modified}</time>
          </div>
          <Pagination className="ml-auto mr-0 w-auto">
            <PaginationContent>
              <PaginationItem>
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span className="sr-only">Previous Order</span>
                </Button>
              </PaginationItem>
              <PaginationItem>
                <Button size="icon" variant="outline" className="h-6 w-6">
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="sr-only">Next Order</span>
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Card>
    </> 
    )
  }