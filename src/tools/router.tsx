
//INSERT HERE THE IMPORT FOR EVERY TOOL'S ENTRY POINT
import Data from "@/tools/data/data"
import Schd from "@/tools/schd/schd"


import { useLocation } from "react-router-dom";

export default function ToolRouter() {

    const location = useLocation();
    const tool = location.pathname.split('/')[3]

    //INSERT HERE THE TOOL NAMESPACE AND THE COMPONENT NAME TIED TO IT
    return (
        <>
            {tool === 'data' && <Data />} 
            {tool === 'schd' && <Schd />}      
        </>
    )
}
