import { lazy, Suspense } from 'react';
import { useLocation } from "react-router-dom";
import toolsConfig from '@/tools.json';

// Import tool components dynamically
const importTool = (tool: string) => {
    return lazy(() => 
        import(`../tools/${tool}/ui/${tool}.tsx`)
            .catch(() => {
                // Return a simple component if import fails
                return {
                    default: () => null
                };
            })
    );
};

export default function ToolRouter() {
    const location = useLocation();
    const tool = location.pathname.split('/')[3];

    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    // Dynamically load the tool component
    const ToolComponent = importTool(tool);
       
    return (
        <Suspense fallback={<div></div>}>
            <ToolComponent />
        </Suspense>
    );
}
