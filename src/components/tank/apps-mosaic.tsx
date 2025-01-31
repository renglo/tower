import {
    LineChart,
    CalendarDays,
  } from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
  } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

import { NavLink } from 'react-router-dom'


interface AppMosaicProps { 
appdoc: any; 
}




export default function AppsMosaic({appdoc}: AppMosaicProps) {
    
  return (

            <Card>
                <CardHeader className="pb-2">
                
                </CardHeader>
                <CardContent>

                    <div className="flex justify-between space-x-4">
                    
                    <NavLink
                        to={`/`}
                        className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base"
                        >
                        <LineChart className="h-25 w-25" />
                        <span className="sr-only">Sensors</span>
                    </NavLink>
                    <div className="space-y-1">
                        <h4 className="text-sm font-semibold">{appdoc.name}</h4>
                        <p className="text-sm">
                        App that helps you with bookkeeping in your business. 
                        </p>
                        <div className="flex items-center pt-2">
                        <CalendarDays className="mr-2 h-4 w-4 opacity-70" />{" "}
                        <span className="text-xs text-muted-foreground">
                            Installed on December 2021
                        </span>
                        </div>
                    </div>
                    </div>
                    
                </CardContent>
                <CardFooter className="border-t">
                <div className="flex flex-col gap-1 py-4">
                    <span className="text-xs text-muted-foreground pb-4">Actions allowed:</span>
                    {appdoc.actions.length > 0 ? (
                    appdoc.actions.map((row: string, index: number) => (
                        <Badge key={index} variant="outline">Role: {row}</Badge>   
                    ))
                    ) : (
                    <span>No actions allowed.</span>  
                    )}           
                </div>
                </CardFooter>
            </Card>
           
  )
}
