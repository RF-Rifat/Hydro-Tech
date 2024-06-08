"use client";

import { useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FileUploader } from "./FileUploader";
import Modal from "./PlantDiseaseModal";

interface PlantCondition {
  status: boolean;
  data?: {
    predicted_class: string;
    confidence_percentage: number;
  };
}

const ImgForm: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [plantCondition, setPlantCondition] = useState<PlantCondition>({
    status: false,
  });

  const handleFieldChange = (url: string) => {
    setImageUrls((prevUrls) => [...prevUrls, url]);
  };

  const handleSubmit = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_STRAWBERRY_API_URL as string,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              // @ts-ignore
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadingProgress(progress);
          },
        }
      );

      const data = response.data;
      setPlantCondition({ status: true, data });
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error uploading image", error);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full">
          <div className="h-72">
            <FileUploader
              onFieldChange={handleFieldChange}
              imageUrl=""
              // @ts-ignore
              setFiles={(newFiles: File[]) => {
                setFiles(newFiles);
                setImage(newFiles[0]);
              }}
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
      <Button
        size="lg"
        className="button col-span-2 w-full"
        onClick={handleSubmit}
      >
        Submit
      </Button>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plantCondition={plantCondition}
        image={image}
      />
    </div>
  );
};

export default ImgForm;
