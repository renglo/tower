import { Outlet,Link } from "react-router-dom";

import { useContext, useState } from 'react';
import { GlobalContext } from "@/components/tank/global-context"
import { useLocation} from 'react-router-dom';
import DialogPut from '@/components/tank/dialog-put'


export default function AppSettings() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context;
 
  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1]
  const p_setting = location.pathname.split('/')[3]

  const [refresh, setRefresh] = useState(false);


   // Function to update the state
  const refreshAction = () => {
    setRefresh(prev => !prev); // Toggle the `refresh` state to trigger useEffect
    console.log(refresh);
  };


  return (
    <div className="flex min-h-screen w-full flex-col" key={location.pathname}>
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <div className="text-xl font-semibold group flex items-center gap-1">Settings for {tree?.portfolios[p_portfolio]?.name} 
            
                      <DialogPut 
                        selectedKey='name' 
                        selectedValue={tree.portfolios[p_portfolio].name} 
                        refreshUp={refreshAction}
                        title="Edit Portfolio"
                        instructions="Modify the Portfolio name and click save."
                        path={`${import.meta.env.VITE_API_URL}/_auth/portfolios/${p_portfolio}`}
                        method='PUT'
                      />  

          </div>
          <span className="text-3xl font-semibold"></span>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav
            className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0"
          >
            
            <Link 
              to={`/${p_portfolio}/settings/orgs`}
              className={
                p_setting === 'orgs'
                  ? "font-semibold text-primary"  // Active state
                  : ""
              }
            >Organizations</Link>
            <Link 
              to={`/${p_portfolio}/settings/teams`}
              className={
                p_setting === 'teams'
                  ? "font-semibold text-primary"  // Active state
                  : ""
              } 
            >Teams</Link>
            <Link 
              to={`/${p_portfolio}/settings/tools`}
              className={
                p_setting === 'tools'
                  ? "font-semibold text-primary"  // Active state
                  : ""
              } 
            >Tools</Link>
            
            
          </nav>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}
