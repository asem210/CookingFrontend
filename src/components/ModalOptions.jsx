import React from 'react';
import { PiUserCircle } from 'react-icons/pi';
import { PiChefHat } from 'react-icons/pi';
import { BsBookmark } from 'react-icons/bs';
import { BiLogOut } from 'react-icons/bi';

const ModalOptions = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-end z-50 ">
      <div className=" inset-0 bg-[#2E2C2C] opacity-[0.90] absolute"></div>
      <div className="bg-white p-6  shadow-lg z-10 relative w-[25%] h-full lef ">
        <div className="w-full flex  justify-between items-center content-center  mb-10">
          <h2 className="text-2xl ">Nombre de Usuario</h2>
          <img
            src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
            className="w-[20%] h-auto"
          />
        </div>

        <div className="w-full flex items-center mb-2 cursor-pointer  hover:text-amber-500">
          <PiChefHat size={'35px'} />
          <p className="font-belleza ml-1 text-[25px]">Mis Recetas</p>
        </div>
        <div className="w-full flex items-center mb-2 cursor-pointer hover:text-amber-500">
          <BsBookmark size={'35px'} />
          <p className="font-belleza ml-1 text-[25px]">Mis Favoritos</p>
        </div>
        <div className="w-full flex items-center mb-2 cursor-pointer hover:text-amber-500">
          <PiUserCircle size={'35px'} />
          <p className="font-belleza ml-1 text-[25px]">Mi Perfil</p>
        </div>

        <div className="w-full flex items-center mb-2 cursor-pointer hover:text-amber-500 ">
          <BiLogOut size={'35px'} />
          <p className="font-belleza ml-1 text-[25px]">Cerrar Sesión</p>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 mt-10"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalOptions;
