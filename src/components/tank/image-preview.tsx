"use client"

interface ImagePreviewProps {
  blueprint: {
    fields?: {
      name: string;
      widget?: string;
    }[];
  };
  data: {
    [key: string]: string;
  };
}

export default function ImagePreview({ blueprint, data }: ImagePreviewProps) {
  return (
    <>
      {/*<img src='http://127.0.0.1:5000/_docs/60a5c21b325c/2051f6e03b21/gartic_images/cf5535ba-0e37-4470-abe4-c7e33cd028fa.jpg' alt="img"/>*/}

      {blueprint?.fields?.filter(field => field.widget === 'image').map(field => (
        <img key={field.name} src={`${import.meta.env.VITE_API_URL}/${data[field.name]}`} alt="img" />
      ))}
      
    </>
  );
}
