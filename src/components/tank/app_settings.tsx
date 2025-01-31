import { Outlet,Link } from "react-router-dom";

import { useContext } from 'react';
import { GlobalContext } from "@/components/tank/global-context"
import { useLocation} from 'react-router-dom';



export default function AppSettings() {

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('No GlobalProvider');
  }
  const { tree } = context;
 
  const location = useLocation();
  const p_portfolio = location.pathname.split('/')[1]
  const p_setting = location.pathname.split('/')[3]


  return (
    <div className="flex min-h-screen w-full flex-col" key={location.pathname}>
      
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <div className="text-xl font-semibold">Settings for {tree?.portfolios[p_portfolio]?.name} 

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
