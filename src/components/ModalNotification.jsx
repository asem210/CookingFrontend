import React from 'react';
import { useMessage } from '../hooks/messageHook';

const ModalNotification = () => {
  const { show, type, message, closeModalMessage } = useMessage();
  if (show) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Error</h2>
          <p className="mb-4">{type}</p>
          <p className="mb-4">{message}</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={() => {
              closeModalMessage();
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  return <></>;
};

export default ModalNotification;
