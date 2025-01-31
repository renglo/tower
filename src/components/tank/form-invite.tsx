import { FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"

interface FormPutProps {
    team_id: string;
    portfolio_id: any;
    refreshUp: () => void;
    path: string;
    method: string;
}


export default function FormInvite({ team_id, portfolio_id, refreshUp, path, method }: FormPutProps) {  
      

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault(); // Prevent default form submission
        // Create a FormData object from the form
        const formData = new FormData(event.currentTarget);
        // Convert the FormData entries directly into a plain object
        const data = Object.fromEntries(formData.entries());

        // Additional logic here

        toast({
        title: "You submitted the following invitation:",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
        });
        console.log('Invitation Submitted')
        console.log(data)

        try {
            // Put the data to your server or API endpoint
            const response = await fetch(path, {
                method: method,
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${sessionStorage.accessToken}`,
                },
                body: JSON.stringify(data),
            });

            const rs = await response.json();

        
            // Handle the response
            if (response.ok) {

                //loadTree();
                refreshUp();

                console.log('Success');
                console.log(rs.message);
                toast({
                title: "Success",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{rs.message}</code>
                    </pre>
                ),
                });
                       

            } else {
                console.error('Error.');
                toast({
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{rs.message}</code>
                    </pre>
                ),
                });
            }
        } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Error",
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
                <label>e-mail</label>
                <input 
                    name="email" 
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <label>Team ID</label>
                <input 
                    name="team_id"
                    type="text" 
                    readOnly
                    value={team_id}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <label>Portfolio ID</label>
                <input 
                    name="portfolio_id"
                    type="text" 
                    readOnly
                    value={portfolio_id}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <Button>Send invite</Button>
            </div>            
        </form>
    );
}