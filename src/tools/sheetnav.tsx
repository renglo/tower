
import ToolDataSheetNav from "@/tools/data/navigation/tool_data_sheetnav";

import { useLocation } from "react-router-dom";

interface SheetNavProps {
    portfolio: string;
    org: string;
}


export default function SheetNav({portfolio,org}:SheetNavProps) {   
    
    const location = useLocation();
    const tool = location.pathname.split('/')[3]
    //const page = 'acct'
       
    return ( 

        <>
            {tool === 'gartic' && <ToolDataSheetNav portfolio={portfolio} org={org} />}
        </> 
    
    )
}