
import { useEffect } from 'react';

interface DialogProps {
  message: string;
  onClose: () => void;
}

export const DialogBox: React.FC<DialogProps> = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-96">
      <div className="bg-white rounded-lg p-6 max-w-md transform transition-all duration-300 ease-in-out border border-gray-200">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Notification</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mb-4">{message}</p>
        <div className="w-full bg-gray-200 rounded-full h-1">
          <div className="bg-blue-500 h-1 rounded-full animate-pulse"></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center"></p>
      </div>
    </div>
  );
};