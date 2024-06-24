"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { FileUploader } from "../shared/FileUploader";
import Modal from "../shared/PlantDiseaseModal";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
    if (!image) {
      toast.error("No image selected. Please upload an image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5172/strawberry-plant-disease",
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
      toast.error("Error uploading image. Please try again.");
    }
  };

  const handleCloseModal = () => {
    // Reset the image and plant condition when the modal is closed
    setImage(null);
    setPlantCondition({ status: false });
    setIsModalOpen(false);
  };

  const handleKeyPress = (event: KeyboardEvent) => {
    console.log(`Key pressed: ${event.key}`);
    if (
      event.key === "ArrowUp" ||
      event.key === "ArrowDown" ||
      event.key === "ArrowLeft" ||
      event.key === "ArrowRight"
    ) {
      toast.error("This is not an appropriate action for the image.");
      console.log("This is not an appropriate action for the image.");
    }
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []); // Run only once

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
        onClose={handleCloseModal}
        plantCondition={plantCondition}
        image={image}
      />
      {/* Toast Container for notifications */}
      <ToastContainer />
    </div>
  );
};

export default ImgForm;
