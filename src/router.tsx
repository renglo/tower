import { lazy, Suspense, useContext } from 'react';
import { useParams } from "react-router-dom";
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

    const { portfolio, org, tool, ring } = useParams();

    // Handle case when context might be undefined
    const context = useContext(GlobalContext);

    if (!context) {
        throw new Error("No GlobalProvider");
    }
    const { tree } = context as unknown as { tree: { portfolios: Record<string, Portfolio> } };

    const tool_id = tree.portfolios[portfolio]?.orgs[org]?.tools?.
        find(toolId => tree.portfolios[portfolio]?.tools[toolId]?.handle === tool);


    console.log('Router : Portfolio/Org/Tool/Ring',portfolio,org,tool_id,ring);


    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    // Dynamically load the tool component
    const ToolComponent = importTool(tool);
       
    return (
        <Suspense fallback={<div></div>}>
            <ToolComponent
                portfolio={portfolio}
                org={org}
                tool={tool_id}
                ring={ring}
                tree = {tree}
             />
        </Suspense>
    );
}
