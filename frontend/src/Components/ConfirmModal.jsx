import React from "react";

function ConfirmModal({ title, positiveButtonText, negativeButtonText, onConfirm, onClose }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white p-5 rounded-md shadow-md w-80 max-w-full">
        <h3 className="font-semibold text-lg mb-2">{title}</h3>
        <p className="text-sm mb-4">This action cannot be undone.</p>
        <div className="flex justify-end gap-2">
          <button
            className="px-4 py-2 rounded text-white bg-gray-400 hover:bg-gray-500 transition"
            onClick={onClose}
          >
            {negativeButtonText}
          </button>
          <button
            className="px-4 py-2 rounded text-white bg-red-500 hover:bg-red-600 transition"
            onClick={onConfirm}
          >
            {positiveButtonText}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
