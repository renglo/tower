
import ToolDataSideNav from "@/tools/data/navigation/tool_data_sidenav";
import ToolSchdSideNav from "@/tools/schd/navigation/tool_schd_sidenav";
import { useLocation } from "react-router-dom";

interface SideNavProps {
    portfolio: string;
    org: string;
}


export default function SideNav({portfolio,org}:SideNavProps) {   
    
    const location = useLocation();
    const tool = location.pathname.split('/')[3]
    
       
    return ( 

        <>
            {tool === 'data' && <ToolDataSideNav portfolio={portfolio} org={org} />}
            {tool === 'schd' && <ToolSchdSideNav portfolio={portfolio} org={org} />}
        </> 
    
    )
}