// Modal.tsx
import { motion } from "framer-motion";
import { useEffect } from "react";

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.9 }}
        className="bg-white rounded-lg p-5"
      >
        <div className="p-1 rounded-xl border-2 border-dashed border-[#6990f2] w-full">
          <img
            src={image ? URL.createObjectURL(image) : ""}
            alt={image?.name}
            className="w-full h-full rounded-md"
          />
        </div>
        <h3 className="text-xl font-light capitalize text-gray-500 text-center">
          Your plant disease detected, and the disease is
        </h3>
        <p className="py-4 text-center text-green-500">
          <u>
            <b>
              {plantCondition.status && plantCondition.data?.predicted_class}
            </b>
          </u>
        </p>
        <h3 className="text-xl font-light capitalize text-gray-500 text-center">
          Disease confidence is
        </h3>
        <p className="py-4 text-center text-green-500">
          <u>
            <b>
              {plantCondition.status &&
                plantCondition.data?.confidence_percentage}
            </b>
          </u>
        </p>
        <button className="btn" onClick={onClose}>
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Modal;
