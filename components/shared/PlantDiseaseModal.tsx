import { motion } from "framer-motion";
import { useEffect } from "react";
import Image from "next/image";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  plantCondition: {
    status: boolean;
    data?: {
      predicted_class: string;
      confidence_percentage: number;
    };
  };
  image: File | null;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  plantCondition,
  image,
}) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? onClose() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [onClose]);

  if (!isOpen) return null;
  const confidence = plantCondition.data?.confidence_percentage ?? 0;
  const isHighConfidence = confidence >= 70;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative bg-gradient-to-r from-green-100 to-blue-200 rounded-xl p-8 shadow-2xl max-w-lg w-full transform transition-all duration-300"
        style={{ border: '2px solid #84a98c', boxShadow: '0 10px 25px rgba(0, 0, 0, 0.15)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 bg-red-500 text-white p-2 rounded-full shadow-md transform transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          aria-label="Close"
        >
          &times;
        </button>

        {/* Image */}
        <div className="mb-5">
          <div className="p-1 rounded-xl border-4 border-[#84a98c] w-full max-h-64 overflow-hidden">
            {image ? (
              <Image
                width={500}
                height={500}
                src={URL.createObjectURL(image)}
                alt={image.name}
                className="w-full h-full rounded-md"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                No Image Provided
              </div>
            )}
          </div>
        </div>

        {/* Plant Condition Information */}
        {plantCondition.status ? (
          isHighConfidence ? (
            <>
              <h3 className="text-2xl font-semibold text-green-700 text-center">
                Disease Detected
              </h3>
              <p className="py-4 text-center text-green-600">
                <u>
                  <b>{plantCondition.data?.predicted_class}</b>
                </u>
              </p>
              <h3 className="text-xl font-light text-gray-600 text-center">
                Confidence Level
              </h3>
              <p className="py-4 text-center text-green-600">
                <u>
                  <b>{confidence}</b>
                </u>
              </p>
            </>
          ) : (
            <>
              <h3 className="text-xl font-light text-gray-600 text-center">
                Unable to confidently detect the disease.
              </h3>
              <p className="py-4 text-center text-red-500">
                <u>
                  <b>Confidence is too low: {confidence}%</b>
                </u>
              </p>
              <h3 className="text-lg font-light text-gray-600 text-center">
                Please try with a clearer image or seek expert advice.
              </h3>
            </>
          )
        ) : (
          <h3 className="text-xl font-light text-gray-600 text-center">
            No plant disease information available.
          </h3>
        )}
      </motion.div>
    </motion.div>
  );
};

export default Modal;