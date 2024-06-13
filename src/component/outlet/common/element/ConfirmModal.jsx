import React from 'react';

const ConfirmModal = ({ isOpen, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-4 w-1/3">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button 
            className="bg-red-500 text-white px-4 py-2 rounded" 
            onClick={onConfirm}
          >
            Delete
          </button>
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded" 
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
