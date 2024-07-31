import React from 'react';
import images from '../constants/images';
import { MoreInfo } from '../components/forms';
import BackToHomeButton from '../components/ReturnTo';

const RegisterPage = () => {
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const imageObject = getObjectById(6);
  const logo = getObjectById(3);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* Columna izquierda con la imagen */}
      <div className="w-full md:w-1/2 hidden md:block">
        <img src={'/login.avif'} alt="logo" className="w-full h-full object-cover" />
      </div>
      {/* Columna derecha con el contenido */}
      <div className="w-full md:w-1/2 p-4 md:pl-[40px] md:pr-[40px] md:py-10 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <BackToHomeButton text={'Volver'} navigateTo={'login'} />
          <img src={'/logo.svg'} alt="Cooking logo" className="ml-auto w-24 md:w-auto" />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex pt-3">
            <p className="font-belleza text-[28px] text-negro text-center">
              Continúa con tu registro
            </p>
          </div>
          <div className="flex flex-col pt-2 w-3/4 md:w-2/3">
            <MoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
