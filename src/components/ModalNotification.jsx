import React from 'react';
import { useMessage } from '../hooks/messageHook';
import { BiSolidErrorAlt } from 'react-icons/bi';
import { BiSolidError } from 'react-icons/bi';
import { PiSealCheckFill } from 'react-icons/pi';

const ModalNotification = () => {
  const { show, type, message, closeModalMessage } = useMessage();
  if (show) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-3">
          <h2 className="text-xl font-semibold mb-4 font-belleza">
            La pagina web Cooking dice:{' '}
          </h2>
          <div className="flex  items-center gap-3">
            {type === 'error' && <BiSolidErrorAlt className="text-red-600" size={'40px'} />}
            {type === 'warning' && <BiSolidError className="text-yellow-500" size={'40px'} />}
            {type === 'success' && <PiSealCheckFill className="text-lime-600" size={'40px'} />}

            <p className="font-belleza">{message}</p>
          </div>

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
