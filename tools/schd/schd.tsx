//import ToolGarticCRUD from "@/tools/gartic/pages/tool_gartic_crud"
import ToolDataCRUD from "@/tools/data/pages/tool_data_crud"

import { useLocation } from "react-router-dom";

export default function Schd() {

    const location = useLocation();
    const page = location.pathname.split('/')[4]

    console.log('Page:',page)

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
        
          <div className="flex flex-col sm:gap-2 sm:pl-2">

            {page === 'schd_jobs' && <ToolDataCRUD readonly={false} />}
            {page === 'schd_runs' && <ToolDataCRUD readonly={true} />}
            {page === 'schd_rules' && <ToolDataCRUD readonly={false} />}

          </div>
        </div>
    )
}