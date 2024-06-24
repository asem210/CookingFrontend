import React from 'react';

const ModalDelete = ({ message, show, onClose, onsubmit, id_delete = -1 }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-3">
        <h2 className="text-xl font-semibold mb-4 font-belleza">
          La pagina web Cooking dice:
        </h2>
        <p className="font-belleza">{message}</p>
        <div className="flex justify-center items-center gap-5 w-full">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 w-1/4"
            onClick={() => {
              if (id_delete === -1) {
                onClose();
                return;
              }
              onsubmit(id_delete);
              onClose();
            }}
          >
            Si
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-1/4"
            onClick={() => {
              onClose();
            }}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};
export default ModalDelete;
