import { lazy, Suspense } from 'react';
import toolsConfig from '@/tools.json';

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
    // Find the tool with bootstrap=true
    const bootstrapTool = toolsConfig['bootstrap'];
    
    if (!bootstrapTool) {
        return null;
    }

    // Dynamically load the onboarding component
    const OnboardingComponent = importOnboarding(bootstrapTool);
           
    return ( 
        <Suspense fallback={<div></div>}>
            <OnboardingComponent />
        </Suspense>    
    )
}