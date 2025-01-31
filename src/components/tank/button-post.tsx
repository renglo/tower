import { ThumbsUp } from 'lucide-react';

import { useToast } from "@/components/ui/use-toast";
import { useState } from 'react';



interface ButtonPostProps {
    title: string;
    color: string;
    path: string;
    method: string;
    payload?: { [key: string]: string };
    reportUp: (value: string) => void; 
}


export default function ButtonPost({ title, color, path, method, payload, reportUp }: ButtonPostProps) {

    const [localButtonState, setLocalButtonState] = useState<string>('');
    // Toast
    const { toast } = useToast();

    async function onSubmit() {

        toast({
        title: "Posted:",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(payload, null, 2)}</code>
            </pre>
        ),
        });
 
        
        try {
            // Post the data to your server or API endpoint
            const response = await fetch(path, {
              method: method,
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.accessToken}`,
              },
              body: JSON.stringify(payload),
            });

            const rs = await response.json();

            console.log(response)
      
            // Handle the response
            if (response.ok) {
              console.log('Data submitted successfully!');
              toast({
                title: "Data submitted successfully",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Data submitted successfully!</code>
                    </pre>
                ),
              });

              reportUp('posted'); // Pass selected value up to parent component
              setLocalButtonState('posted');
              
              //loadTree();
              //refreshUp();
              

            } else {
              console.error('Failed to submit the data.');
              toast({
                title: "Error",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{rs.message}</code>
                    </pre>
                ),
              });

              reportUp('error');
            }
          } catch (error) {
            console.error('Error:', error);
            toast({
                title: "Something went wrong.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Error!</code>
                    </pre>
                ),
              });

            reportUp('error');
        }
    }



    return (
        <>
            {localButtonState === 'posted' ? ( // Check if the button state is 'posted'
                <div className="font-bold text-blue-500">POSTED</div>
            ) : ( 
                <div onClick={onSubmit} className="flex items-center flex-col justify-end gap-2 cursor-pointer">    
                    <div className="flex flex-col rounded-xl p-6 shadow-md items-center" style={{ backgroundColor: color }}>
                        <ThumbsUp className="h-5 w-5" color="#8BC53F" size={20} strokeWidth={3} />
                        <span className="sr-only">{title}</span>
                        <span className="text-xs text-white font-semibold">{title}</span>
                    </div>
                </div>
            )} 
        </>
    );
}

