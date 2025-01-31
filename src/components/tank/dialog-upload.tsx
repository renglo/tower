import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";


import { useState } from 'react';


interface DialogUploadProps {
    portfolio: string; 
    org: string;       
    refreshUp: () => void;     
    path: string;
    title: string;
    instructions: string;
}

export default function DialogUpload({ portfolio, org, refreshUp, path, title, instructions }: DialogUploadProps) {

  console.log(`Uploading to ${portfolio}/${org}`)

  const [open, setOpen] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);



  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        setImage(file);
        const reader = new FileReader();
        reader.onloadend = () => {
            setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
    }
  };

  // Toast
  const { toast } = useToast();

  const handleUpload = async () => {

    if (!image) return;

    toast({
        title: "Uploading image",
        description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{image.name}</code>
            </pre>
        ),
    });

    try {


        const formData = new FormData();
        //const fileExtension = image.name.split('.').pop();
        const overrideFileName = `${org}`;
        formData.append('up_file', new Blob([image], { type: image.type }), image.name);
        formData.append('up_file_type', image.type);
        formData.append('up_file_override', overrideFileName);
    
        const uploadResponse = await fetch(path, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${sessionStorage.accessToken}`,
            },
            body: formData, // Send FormData instead of JSON
        });

        const uploadResult = await uploadResponse.json();

        if (uploadResponse.ok) {
            console.log('Image uploaded successfully!');
            toast({
              title: "Image uploaded successfully",
              description: (
                  <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                  <code className="text-white">{JSON.stringify(uploadResult, null, 2)}</code>
                  </pre>
              ),
            });
            
            refreshUp();
            setOpen(false); 

        } else {
            console.error('Failed to submit the data.');
            toast({
                title: "Failed to submit the data.",
                description: (
                    <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">Failed to submit the form.</code>
                    </pre>
                ),
            });
        }


        


    } catch (error) {
        console.error('Error:', error);
        toast({
            title: "Failed to upload the image.",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                <code className="text-white">Error!</code>
                </pre>
            ),
        });
    }





  };





  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <span>Add/Change Image</span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            <div>{instructions}</div>

          </DialogDescription>
        </DialogHeader>
        <ScrollArea className=" rounded-md border p-6" >
            <div>
                <input type="file" onChange={handleFileChange} />
                {preview && <img src={preview} alt="Image preview" className="mt-4" />}
                <Button onClick={handleUpload} className="mt-4">Upload</Button>
            </div>
        </ScrollArea>
        <DialogFooter>     
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
