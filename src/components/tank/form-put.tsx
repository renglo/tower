import { useState, useEffect, FormEvent, ChangeEvent, useContext } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast"
import {GlobalContext} from "@/components/tank/global-context"

interface FormPutProps {
    selectedKey: string;
    selectedValue: any;
    refreshUp: () => void;
    blueprint?: any;
    path: string;
    method: string;
}

interface FieldState {
    key: string;
    value: string;
    widget?: string;
    label?: string;
}

export default function FormPut({ selectedKey, selectedValue, refreshUp, blueprint, path, method }: FormPutProps) {  
      
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

        const obj: FieldState = {
            key: selectedKey,
            value: selectedValue,
            widget: undefined,
            label: undefined
        };

        if (blueprint?.fields) {
            blueprint.fields.forEach((field: { name: string; widget: string; label?: string }) => {
                if (field.name === selectedKey) {
                    obj.widget = field.widget;
                    obj.label = field.label;
                }
            });
        }


        setFieldNow(obj);


        // We are not using the Blueprint. 
        // Sending a key:value pair instead to update one single field.
        // #TO-DO : Use the blueprint to validate the key exists in the blueprint
        //console.log(blueprint);
        // And that the value is of the type expected.
        
    }, []);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        
        event.preventDefault(); // Prevent default form submission
        // Create a FormData object from the form
        const formData = new FormData(event.currentTarget);
        // Convert the FormData entries directly into a plain object
        const data = Object.fromEntries(formData.entries());

        
        // Additional logic here

        toast({
        title: "You submitted the following values:",
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
                console.log('Changes submitted successfully!');
                // Optionally, clear the form or show a success message
                //setName('');
                //setEmail('');
                //setMessage('');
                toast({
                title: "Changes submitted successfully",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Data submitted successfully!</code>
                    </pre>
                ),
                });
                
                loadTree();
                refreshUp();
                

            } else {
                const errorData = await response.json();
                console.error('Failed to submit the changes.');
                console.error(errorData.message);
                toast({
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{errorData.message}</code>
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

    

        // Function to handle user input
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setFieldNow({"key":selectedKey,"value":event.target.value});
    };

    const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        setFieldNow({"key":selectedKey,"value":event.target.value,"widget":"textarea"});
    };



    return (
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-4">
                <label>{fieldNow.label}</label>
                
                {fieldNow.widget != 'textarea' ? (
                    <input 
                        name={fieldNow.key} 
                        type="text" 
                        value={fieldNow.value}
                        onChange={handleInputChange}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    />
                ) : (
                    <textarea
                        name={fieldNow.key} 
                        onChange={handleTextareaChange}
                        rows={12}
                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                    >
                        {fieldNow.value}
                    </textarea>
                )}

                <Button>Save</Button>
            </div>            
        </form>
    );
}