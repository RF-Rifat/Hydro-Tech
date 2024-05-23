"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileUploader } from "./FileUploader";

const ImgForm = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const handleFieldChange = (url: string) => {
    setImageUrls((prevUrls) => [...prevUrls, url]);
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full">
          <div className="h-72">
            <FileUploader
              onFieldChange={handleFieldChange}
              imageUrl=""
              setFiles={setFiles}
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {imageUrls.map((url, index) => (
          <div key={index} className="relative overflow-hidden rounded-lg h-48">
            <img
              src={url}
              alt={`Uploaded ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
      <Button size="lg" className="button col-span-2 w-full">
        Submit
      </Button>
    </div>
  );
};

export default ImgForm;
