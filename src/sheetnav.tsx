import { lazy, Suspense } from 'react';
import toolsConfig from '@/tools.json';
import { WindowSizeProvider } from '@/contexts/WindowSizeContext';

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
    tool: string;
    ring: string;
}

export default function SheetNav({portfolio, org, tool, ring}: SheetNavProps) {   
    
    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    // Dynamically load the tool component
    const ToolSheetNavComponent = importToolSheetNav(tool);
       
    return (
        <div className="contents">
            <Suspense fallback={<div></div>}>
                <WindowSizeProvider>
                    <ToolSheetNavComponent 
                        portfolio={portfolio} 
                        org={org} 
                        tool={tool} 
                        ring={ring} 
                    />
                </WindowSizeProvider>
            </Suspense>
        </div>
    );
}