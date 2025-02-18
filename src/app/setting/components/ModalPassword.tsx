import { ReactNode } from "react";

type ModalPasswordProps = {

    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

export default function ModalPassword ({isOpen, onClose, children}: ModalPasswordProps) {
    if (! isOpen ) return null;
    return(
        <div className="fixed inset-0 bg-black opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 max-w-md w-full rounded-lg shadow-lg relative">
                <button onClick={onClose} className="top-2 right-4 text-gray-950 absolute font-bold text-xl">
                    ×
                </button>
                {children}
            </div>
        </div>
    )
}