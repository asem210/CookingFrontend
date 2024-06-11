import React, { useState } from "react";
import images from "../constants/images";
import { MoreInfo } from "../components/forms";

import Cookies from "js-cookie";

export const RegisterPage = () => {
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const imageObject = getObjectById(6);
  const logo = getObjectById(3);
  return (
    <div className="flex h-screen w-screen">
      <div className="w-1/2">
        <img src={imageObject.link} alt="logo" className="w-full h-full" />
      </div>
      <div className="w-1/2 pl-[30px] pr-[30px] py-10">
        <div>
          <div className="flex justify-end">
            <img src={logo.link} alt="Cooking logo" />
          </div>
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex pt-3">
              <p className="font-belleza text-[28px] text-negro">
                Continúa con tu registro
              </p>
            </div>
            <div className="flex flex-col pt-2 w-3/4">
              <MoreInfo />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
