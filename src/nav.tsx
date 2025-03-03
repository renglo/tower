import { lazy, Suspense } from 'react';
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
    tool?: string;
    ring?: string;
}

export default function SideNav({portfolio, org, tool, ring}: SideNavProps) {   
    
    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    // Dynamically load the tool component
    const ToolNavComponent = importToolNav(tool);
       
    return (
        <Suspense fallback={<div></div>}>
            <ToolNavComponent 
                portfolio={portfolio} 
                org={org}
                tool={tool}
                ring={ring} 
            />
        </Suspense>
    );
}