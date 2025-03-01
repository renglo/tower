import { lazy, Suspense } from 'react';
import { useLocation } from "react-router-dom";
import toolsConfig from '@/tools.json';

// Import tool components dynamically with error handling
const importToolSheetNav = (tool: string) => {
    return lazy(() => 
        import(`@tools/${tool}/ui/navigation/${tool}_sheetnav.tsx`)
            .catch(() => {
                // Return a simple component if import fails
                return {
                    default: () => null
                };
            })
    );
};

interface SheetNavProps {
    portfolio: string;
    org: string;
}

export default function SheetNav({portfolio, org}: SheetNavProps) {   
    const location = useLocation();
    const tool = location.pathname.split('/')[3];
    
    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    // Dynamically load the tool component
    const ToolSheetNavComponent = importToolSheetNav(tool);
       
    return (
        <Suspense fallback={<div></div>}>
            <ToolSheetNavComponent portfolio={portfolio} org={org} />
        </Suspense>
    );
}