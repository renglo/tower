import { lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
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
    
    const navigate = useNavigate();

    // Only render if tool exists in config
    if (!tool || !(tool in toolsConfig['tools'])) {
        return null;
    }

    const handleNavigation = (path: string) => {
        navigate(path);
    };

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
                        onNavigate={handleNavigation}
                    />
                </WindowSizeProvider>
            </Suspense>
        </div>
    );
}