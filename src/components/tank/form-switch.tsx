import { FormEvent,useContext } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import {GlobalContext} from "@/components/tank/global-context"

interface FormSwitchProps {
    refreshUp: () => void;
    path: string;
    method: string;
}

//export default function FormPut({selectedId,selectedKey,selectedValue,refreshUp}) {
export default function FormSwitch({ refreshUp, path, method }: FormSwitchProps) {  
      
    const context = useContext(GlobalContext);
    if (!context) {
    throw new Error('No GlobalProvider');
    }
    const { loadTree } = context;

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault(); // Prevent default form submission

        try {
            // Put the data to your server or API endpoint
            const response = await fetch(path, {
                method: method,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${sessionStorage.accessToken}`,
                },
            });

        
            // Handle the response
            if (response.ok) {
                console.log('Changes submitted successfully!');
                // Optionally, clear the form or show a success message
                //setName('');
                //setEmail('');
                //setMessage('');
                toast({
                title: "Changes submitted successfully",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Changes submitted successfully!</code>
                    </pre>
                ),
                });

                loadTree();
                refreshUp();
                

            } else {
                console.error('Failed to submit the changes.');
                toast({
                title: "Failed to submit the changes.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Failed to submit the changes.</code>
                    </pre>
                ),
                });
            }
            } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Failed to submit the changes.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Error!</code>
                    </pre>
                ),
                });
        }
    };


    // Toast
    const { toast } = useToast();


    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <Button>Confirm</Button>
            </div>            
        </form>
    );
}