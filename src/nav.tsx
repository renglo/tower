import { lazy, Suspense } from 'react';
import { useLocation } from "react-router-dom";
import toolsConfig from '@/tools.json';

// Import tool components dynamically
const importToolNav = (tool: string) => {
  // Use relative path from the current directory
  return lazy(() => 
    import(`@tools/${tool}/ui/navigation/${tool}_sidenav.tsx`)
        .catch((error) => {
            console.log(`${tool} :E `, error);
            // Return a simple component if import fails
            return {
                default: () => null
            };
        })
    );
};

interface SideNavProps {
    portfolio: string;
    org: string;
}

export default function SideNav({portfolio, org}: SideNavProps) {   
    const location = useLocation();
    const tool = location.pathname.split('/')[3];
    
    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    // Dynamically load the tool component
    const ToolNavComponent = importToolNav(tool);
       
    return (
        <Suspense fallback={<div></div>}>
            <ToolNavComponent portfolio={portfolio} org={org} />
        </Suspense>
    );
}