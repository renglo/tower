import ToolDataCRUD from "@/tools/data/pages/tool_data_crud"
import ToolDataDashboard from "@/tools/data/pages/tool_data_dashboard";

import { useLocation } from "react-router-dom";

export default function Data() {

    const location = useLocation();
    const page = location.pathname.split('/')[4]

    console.log('Page:',page)

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
        
          <div className="flex flex-col sm:gap-2 sm:pl-2">
  
            {page === undefined ? ( <ToolDataDashboard />):(<ToolDataCRUD readonly={false} />)} 
          
          </div>
        </div>
    )
}
