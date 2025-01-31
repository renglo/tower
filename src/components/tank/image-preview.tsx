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
      

      {blueprint?.fields?.filter(field => field.widget === 'image').map(field => (
        <img key={field.name} src={`${import.meta.env.VITE_API_URL}/${data[field.name]}`} alt="img" />
      ))}
      
    </>
  );
}
