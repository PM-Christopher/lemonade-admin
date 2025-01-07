import React, {ReactNode} from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const GlobalModal: React.FC<ModalProps> = ({ isOpen, onClose, children })  => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md w-1/3">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500"
                >
                    &times;
                </button>
                <div>{children}</div>
            </div>
        </div>
    );
}

export default GlobalModal;