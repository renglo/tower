import {
  EllipsisVertical,
  Braces,
} from "lucide-react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useState, useEffect } from 'react';
//import AppsMosaic from "@/components/tank/apps-mosaic"
//import OrgsCard from "@/components/tank/orgs-card"
import DialogInvite from '@/components/tank/dialog-invite'
import DialogPut from '@/components/tank/dialog-put'
import DialogDelete from '@/components/tank/dialog-delete'
import DialogDeleteText from '@/components/tank/dialog-delete-text'


interface TeamCardProps { 
  teamdoc: any; 
  portfolioid: string;
}


interface User {
  name: string;
  last: string;
  email: string;
  user_id: string;
}


export default function TeamCard({teamdoc,portfolioid}: TeamCardProps) {

  const [teamusers, setTeamusers] = useState({});
  const [error, setError] = useState<Error | null>(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
      // Function to fetch Blueprint
      const fetchTeamUsers = async () => {
        try {
          // Fetch Blueprint
          console.log('Teamdoc:')
          console.log(teamdoc)
          console.log(`${import.meta.env.VITE_API_URL}/_auth/teams/${teamdoc.team_id}/users`)
          const Response = await fetch(`${import.meta.env.VITE_API_URL}/_auth/teams/${teamdoc.team_id}/users`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${sessionStorage.accessToken}`,
            },
          });
          const Data = await Response.json();
          console.log('Team Users:')
          console.log(Data)
          setTeamusers(Data); 

        } catch (err) {
          if (err instanceof Error) {
            setError(err);  // Now TypeScript knows `err` is of type `Error`.
            console.log(error);
          } else {
            setError(new Error("An unknown error occurred"));  // Handle other types
            console.log(error);
          }
          console.log('Error fetching TeamUsers')
        } finally {
          //setLoading(false);
        }
      };

      fetchTeamUsers();
  }, [refresh]);

  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    

  };


  return (
          <Card x-chunk="dashboard-01-chunk-5">
            <CardHeader>
              <CardTitle>
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4 px-6 py-6">
                <Badge variant="team">Team</Badge>
                <span className="flex items-center gap-1 group text-2xl font-semibold"> 
                    {teamdoc.name}    
                    <DialogPut 
                      selectedKey='name' 
                      selectedValue={teamdoc.name} 
                      refreshUp={refreshAction}
                      title="Edit attribute"
                      instructions="Modify the attribute and click save."
                      path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${portfolioid}/teams/${teamdoc.team_id}`}
                      method='PUT'
                    />                       
                    <DialogDelete 
                          selectedKey='name' 
                          selectedValue={teamdoc.name} 
                          refreshUp={refreshAction}
                          title="Delete entity"
                          instructions="Are you sure you want to delete this team?"
                          path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${portfolioid}/teams/${teamdoc.team_id}`}
                          method='DELETE'
                    />            
                </span>
                <HoverCard>
                  <HoverCardTrigger><Braces className="h-5 w-5" /></HoverCardTrigger>
                  <HoverCardContent className="w-120">
                    <pre className="mt-12 w-full rounded-md bg-slate-950 p-4">
                        <code className="text-white font-small">{JSON.stringify(teamdoc, null, 2)}</code>
                    </pre>               
                  </HoverCardContent>
                </HoverCard>

                <DialogInvite 
                      portfolio_id={portfolioid}
                      team_id={teamdoc.team_id} 
                      refreshUp={refreshAction}
                      title= {`Invite a collaborator to team : ${teamdoc.name}`}
                      instructions="Enter the email to send the invite to" 
                      path={`${import.meta.env.VITE_API_URL}/_auth/user/invite`}
                      method='POST'
                />

              </div>

              {
                teamusers && Object.keys(teamusers).length > 0 ? (
                  (Object.values(teamusers) as User[]).map((row: User) => (
                    <div className="flex items-center gap-4" key={row.user_id}>
                      <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage src="/avatars/01.png" alt="Avatar" />
                        <AvatarFallback>{row.name ? row.name.charAt(0) : ''}</AvatarFallback>
                      </Avatar>
                      <div className="grid gap-1">
                        <p className="flex flex-row gap-4 text-sm group font-medium leading-none">
                          <span>{row.name} {row.last}</span>
                          
                          <DialogDelete 
                            selectedKey='name' 
                            selectedValue={row.name} 
                            refreshUp={refreshAction}
                            title="Delete entity"
                            instructions={`Are you sure you want to remove this user from the team?`}
                            path={`${import.meta.env.VITE_API_URL}/_auth/teams/${teamdoc.team_id}/users/${row.user_id}`}
                            method='DELETE'
                          />
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {row.email} <Badge variant="outline">user:{row.user_id}</Badge>
                        </p>
                      </div>
                      <div className="ml-auto font-medium">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="sm" className="h-8 gap-1">
                              <EllipsisVertical className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuCheckboxItem checked>
                              Follow activity
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                              <DialogDeleteText 
                                selectedKey='name' 
                                selectedValue={row.name} 
                                refreshUp={refreshAction}
                                title="Delete entity"
                                instructions={`Are you sure you want to remove this user from the team?`}
                                path={`${import.meta.env.VITE_API_URL}/_auth/teams/${teamdoc.team_id}/users/${row.user_id}`}
                                method='DELETE'
                              />
                            </DropdownMenuCheckboxItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">No Users</div>
                )
              }
 
            </CardContent>
            
          </Card>

  )
}
