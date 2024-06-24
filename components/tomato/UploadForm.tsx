"use client";

import { useState, useEffect } from "react";
import axios from "axios";
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
        "http://localhost:5172/tomato-plant-disease",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const progress = Math.round(
              //@ts-ignore
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

  const handleShowToast = () => {
    if (!image) {
      toast.error("No image selected. Please upload an image.");
    } else {
      toast.success("This is not an appropriate image for this modal!");
    }
  };

  const handleCloseModal = () => {
    setImage(null);
    setPlantCondition({ status: false });
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log("Component mounted");
    return () => {
      console.log("Component unmounted");
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5 md:flex-row">
        <div className="w-full">
          <div className="h-72">
            <FileUploader
              onFieldChange={handleFieldChange}
              imageUrl=""
              //@ts-ignore
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
      <div className="relative">
        <div className="flex rounded-lg">
          <button
            onClick={handleShowToast}
            className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-l"
            style={{ visibility: "hidden" }}
          >
            Show Toast
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r"
            style={{ visibility: "hidden" }}
          >
            Show Modal
          </button>
        </div>
        <span
          className="absolute inset-0 flex justify-center items-center text-white font-bold py-2 px-4 bg-green-500 rounded-lg cursor-pointer"
          onClick={(e) => {
            const halfWidth = e.currentTarget.offsetWidth / 2;
            if (e.nativeEvent.offsetX < halfWidth) {
              handleShowToast();
            } else {
              handleSubmit();
            }
          }}
        >
          Submit
        </span>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        plantCondition={plantCondition}
        image={image}
      />
      <ToastContainer />
    </div>
  );
};

export default ImgForm;
