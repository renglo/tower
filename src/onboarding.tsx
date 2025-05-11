import { lazy, Suspense, useContext } from 'react';
import toolsConfig from '@/tools.json';
import { GlobalContext } from "@/components/tank/global-context"

// Import onboarding component dynamically
const importOnboarding = (tool: string) => {
    return lazy(() => 
        import(`@tools/${tool}/ui/onboarding/${tool}_onboarding.tsx`)
            .catch(() => {
                console.log(`${tool} :Not found`)
                return {
                    default: () => null
                };
            })
    );
};

export default function Onboarding() {   
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('No GlobalProvider');
    }
    const { tree } = context;

    const bootstrapComponents: React.ComponentType<{ tree: any }>[] = [];
    
    for (const bootstrapTool of toolsConfig['bootstrap']) {
        if (!bootstrapTool) {
            return null;
        }

        // Dynamically load the onboarding component
        const OnboardingComponent = importOnboarding(bootstrapTool);
        bootstrapComponents.push(OnboardingComponent);
    }
            
    return ( 
        <>
            {bootstrapComponents.map((OnboardingComponent, index) => (
                <Suspense key={index} fallback={<div></div>}>
                    <OnboardingComponent tree={tree} />
                </Suspense>    
            ))}
        </>
    )
}