import { lazy, Suspense, useContext } from 'react';
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { GlobalContext } from "@/components/tank/global-context"
import toolsConfig from '@/tools.json';


interface Portfolio {
    name: string;
    portfolio_id: string;
    orgs: Record<string, Org>;
    tools: Record<string, Tool>;
  }
  
interface Org {
    name: string;
    org_id: string;
    tools: string[];
}

interface Tool {
    name: string;
    handle: string;
}


// Import tool components dynamically
const importTool = (tool: string) => {
    return lazy(() => 
        import(`@tools/${tool}/ui/${tool}.tsx`)
            .catch(() => {
                // Return a simple component if import fails
                return {
                    default: () => null
                };
            })
    );
};

export default function ToolRouter() {

    const { portfolio, org, tool, section } = useParams();
    const [searchParams] = useSearchParams();
    const queryParams = Object.fromEntries(searchParams?.entries() || []) || {};

    // Handle case when context might be undefined
    const context = useContext(GlobalContext);
    const navigate = useNavigate();

    if (!context) {
        throw new Error("No GlobalProvider");
    }
    const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };

    if (!portfolio || !org) {
        return null;
    }

    let tool_id
    if(org == '_all'){ 
        tool_id = Object.entries(tree.portfolios[portfolio]?.tools || {}).find(([_, toolData]) => toolData.handle === tool)?.[0];
    }else{
        //Translate tool handle into tool id
        tool_id = tree.portfolios[portfolio]?.orgs[org]?.tools?.
        find((toolId: string) => tree.portfolios[portfolio]?.tools[toolId]?.handle === tool);
    }

    

    

    console.log('Router : Portfolio/Org/Tool/Section/Query',portfolio,org,tool_id,section,queryParams);


    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    const handleNavigation = (path: string) => {
        navigate(path);
    };

    // Dynamically load the tool component
    const ToolComponent = importTool(tool);
       
    return (
        <Suspense fallback={<div></div>}>
            <ToolComponent
                portfolio={portfolio}
                org={org}
                tool={tool_id}
                section={section}
                tree = {tree}
                query = {queryParams}
                onNavigate={handleNavigation}
             />
        </Suspense>
    );
}
