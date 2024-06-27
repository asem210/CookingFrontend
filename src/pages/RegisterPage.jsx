import React, { useState } from 'react';
import images from '../constants/images';
import { MoreInfo } from '../components/forms';
import { IoArrowBackCircleSharp } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

const RegisterPage = () => {
  const navigate = useNavigate();
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };
  const name_proyect = import.meta.env.VITE_NAME_PAGE || '';

  const imageObject = getObjectById(6);
  const logo = getObjectById(3);
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2">
        <img src={imageObject.link} alt="logo" className="w-full h-full" />
      </div>
      <div className="w-1/2 pl-[30px] pr-[30px] py-10 flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <IoArrowBackCircleSharp
            size={60}
            color="#E9644F"
            onClick={() => navigate(name_proyect + '/login')}
            className=" cursor-pointer"
          />
          <img src={logo.link} alt="Cooking logo" className="ml-auto" />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex pt-3">
            <p className="font-belleza text-[28px] text-negro">Continúa con tu registro</p>
          </div>
          <div className="flex flex-col pt-2 w-3/4">
            <MoreInfo />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
