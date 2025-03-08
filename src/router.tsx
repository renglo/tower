import { lazy, Suspense } from 'react';
import { useParams } from "react-router-dom";
import toolsConfig from '@/tools.json';

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
    //const location = useLocation();
    //console.log('Router :',location)
    //const pathSegments = location.pathname.split('/');
    //const portfolio = pathSegments[1] || null;
    //const org = pathSegments[2] || null;
    //const tool = pathSegments[3] || null;
    //const ring = pathSegments[4] || null;

    const { portfolio, org, tool, ring } = useParams();

    console.log('Portfolio/Org/Tool/Ring',portfolio,org,tool,ring);


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
                tool={tool}
                ring={ring}
             />
        </Suspense>
    );
}
