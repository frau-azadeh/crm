import { ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
};

export default function Modal({ isOpen, children, onClose }: ModalProps) {
  if (!isOpen) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white relative rounded-lg w-full max-w-md p-6 "
      >
        <button
          onClick={onClose}
          className="absolute top-2 text-gray600 hover:text-red600 right-2 transition text-lg font-bold"
        >
          ×
        </button>
        {children}
      </div>
    </div>
  );
}
