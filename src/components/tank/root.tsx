import { Outlet } from "react-router-dom";
import {
  Search,
  Settings,
  ArrowBigLeft,
} from "lucide-react"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import{
  Avatarsq,
  AvatarsqFallback,
  AvatarsqImage,
} from "@/components/ui/avatarsq"
import { Toaster } from "@/components/ui/toaster"
import OrgSwitch from "@/components/tank/org-switch"
import ToolSwitch from "@/components/tank/tool-switch"
import SideNav from "@/tools/nav"
import SheetNav from "@/tools/sheetnav"
import { useNavigate,NavLink,useParams,useLocation } from 'react-router-dom'
import {GlobalContext} from "@/components/tank/global-context"

import { useState, useEffect, useContext } from 'react';


export default function Root() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { user, loadUser, tree, loadTree } = context;
  
  const { portfolio, org } = useParams(); // Extract the 'route' parameter from the URL
  const [refresh, setRefresh] = useState(false);
  const location = useLocation();


  
  if (tree?.error) {
    console.log('Token Expired...');
    sessionStorage.clear();
    window.location.href = `/login`;
  }

  console.log('GlobalContext tree')
  console.log(tree)

  console.log('GlobalContext user')
  console.log(user)

  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    navigate('/login');
  };

 
  useEffect(() => {
    // ReloadContext 
    
    const initializeContext = () => {

      console.log('Initializing context')
      console.log('Loading User')
      loadUser();
      console.log('Loading Tree')    
      loadTree();
 
    };

    initializeContext();

  }, []);
  
  

  
  useEffect(() => {
    // Function to check whether the AccessToken has expired
    // The Cognito AccessToken expires every 3600 seconds (1 hour)
    // To-Do: Implement a refresh token process. 
    
    const checkTokenExpiration = () => {

      const tokenExp = sessionStorage.getItem('token_exp'); // Get the token expiration from sessionStorage
      const currentTime = Date.now() / 1000; // Current time in seconds

      console.log('Checking if Token has expired')
      console.log(currentTime)
      console.log(tokenExp)
      
      // Trigger logout if token_exp doesn't exist OR if the token has expired
      const tokenExpAsNumber = tokenExp ? parseInt(tokenExp, 10) : null;
      if (!tokenExpAsNumber || tokenExpAsNumber < currentTime) {
        handleLogout();
      }
 
    };

    // Check every minute (60000 milliseconds = 60 seconds)
    const intervalId = setInterval(checkTokenExpiration, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);


  const handleClick = (route: string) => {
    navigate(route, { replace: true });  // Navigate to the specified route
  };

  // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    console.log(refresh);
  };


  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside 
        className="fixed inset-y-0 left-0 z-10 hidden w-16 flex-col border-r bg-background sm:flex"
        >
        <nav className="flex flex-col items-center gap-4 px-1 sm:py-0">
          <div className="flex items-center flex-col">
            <NavLink
                to={`/home`}
                className="group flex h-16 w-16 shrink-0 items-center justify-center gap-2 mt-0 mb-4 md:text-base"     
            >
                <img src={`${import.meta.env.VITE_WL_LOGO}`} className="ml-auto" alt="Logo" />
                <span className="sr-only">Logo</span>
            </NavLink>      
          </div> 
        </nav>
        
        <SideNav
            portfolio={`${portfolio}`} 
            org={`${org}`} 
         />

        <nav 
          className={
            location.pathname.split('/')[2]
              ? 'mt-auto flex flex-col items-center gap-4 px-2 sm:py-5'
              : 'hidden'
          }
        >

          <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                  <NavLink
                      to={`/${portfolio}/settings`}
                      className={
                        location.pathname.split('/')[2] === 'settings'
                          ? 'group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-gray-200 text-lg font-semibold text-muted-foreground md:h-12 md:w-12 md:text-base'
                          : 'flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8'
                      }
                  >
                      <Settings className="h-5 w-5" />
                      <span className="sr-only">Settings</span>
                  </NavLink>
                </TooltipTrigger>
                <TooltipContent side="right">Settings</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          
          <SheetNav
            portfolio={`${portfolio}`} 
            org={`${org}`} 
          />
            

          {(location.pathname.split('/')[2] !== 'settings' && location.pathname.split('/')[2])  && (
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <OrgSwitch
                      refreshUp={refreshAction} 
                    />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    
                    <ToolSwitch
                      refreshUp={refreshAction} 
                    />
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{location.pathname.split('/')[4]}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}

          {(location.pathname.split('/')[2] == 'settings' && location.pathname.split('/')[2])  && (
            <Breadcrumb className="">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <NavLink to={`/home`}>  
                      <ArrowBigLeft className="h-5 w-5" />
                    </NavLink>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          )}


          <div className="relative ml-auto flex-1 md:grow-0">
            <span className="hidden sm:flex">
                <div className="hidden">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                </div>        
            </span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src="/placeholder-user.png"
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account 
                <div className="text-xs text-muted-foreground">{sessionStorage.cu_handle}</div>
                <div className="text-xs text-muted-foreground">{sessionStorage.cu_email}</div>
                <div className="text-xs text-muted-foreground">{sessionStorage.cu_first} {sessionStorage.cu_last}</div> 
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Switch Portfolio</DropdownMenuLabel>

              {
                (tree.portfolios && Object.keys(tree.portfolios).length > 0) ? (
                    Object.values(tree.portfolios).map((row) => (
                      <DropdownMenuItem key={row['portfolio_id']}>

                        <div 
                          className={
                            location.pathname.split('/')[1] === row['portfolio_id']
                              ? "font-bold"  // Apply bold text when condition is met
                              : ""
                          }
                        >
                          <div 
                            className="flex items-center gap-2 flex-row"
                            onClick={() => handleClick(`/${row['portfolio_id']}/settings/tools`)}
                          >
                            <Avatarsq>
                              <AvatarsqImage src='' />
                              <AvatarsqFallback>1a</AvatarsqFallback>
                            </Avatarsq>
                            {row['name']}
                          </div>
                        </div>



                      </DropdownMenuItem>
                    ))
                ) : (
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2 flex-row">
                      <div className="text-xs text-muted-foreground">No Portfolio</div>
                    </div>
                  </DropdownMenuItem>
                )
              }
      
              <DropdownMenuSeparator />
              <DropdownMenuItem key="settings">
                <NavLink to={`/account`} >
                  Account settings
                </NavLink>
              </DropdownMenuItem>
              <DropdownMenuItem key="logout" onClick={handleLogout}>Logout</DropdownMenuItem>
              
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <Outlet />
        <Toaster />
      </div>
    </div>
  )
}
