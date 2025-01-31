import { useState, useEffect, FormEvent, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import {GlobalContext} from "@/components/tank/global-context"

interface FormDeleteProps {
    selectedKey: string;
    selectedValue: any;
    refreshUp: () => void;
    path: string;
    method: string;
}

interface FieldState {
    key: string;
    value: string;
  }


export default function FormDelete({ selectedKey, selectedValue, refreshUp, path, method }: FormDeleteProps) {  
      
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('No GlobalProvider');
    }
    const { loadTree } = context;
    
    const [fieldNow, setFieldNow] = useState<FieldState>({
        key: selectedKey,
        value: '',
      });


    // Populate the field
    useEffect(() => {
        setFieldNow({"key":selectedKey,"value":selectedValue});     
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault(); // Prevent default form submission
        // Create a FormData object from the form
        const formData = new FormData(event.currentTarget);
        // Convert the FormData entries directly into a plain object
        const data = Object.fromEntries(formData.entries());

        
        // Additional logic here

        toast({
        title: "You want to delete the following entity:",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
            </pre>
        ),
        });
        console.log('Form Submitted')
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

            /*
            const response = await fetch(`${import.meta.env.VITE_API_URL}/_data/${location.pathname.split('/')[1]}/${location.pathname.split('/')[3]}/${selectedId}`, {
                method: 'PUT',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            */
        
            // Handle the response
            if (response.ok) {

                loadTree();
                refreshUp();

                console.log('Entity Deleted successfully!');
                // Optionally, clear the form or show a success message
                //setName('');
                //setEmail('');
                //setMessage('');
                toast({
                title: "Success",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Delete successful</code>
                    </pre>
                ),
                });
                
                
                

            } else {
                console.error('Failed to delete the entity.');
                console.log(rs);
                toast({
                title: `Error`,
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
                title: "Error.",
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
                <label>Type "{fieldNow.value}" to confirm you want to delete it. </label>
                <input 
                    name={fieldNow.key} 
                    type="text"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                />
                <Button>Confirm Delete</Button>
            </div>            
        </form>
    );
}