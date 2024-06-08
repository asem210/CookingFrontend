import React, { useState } from "react";
import images from "../constants/images";
import LoginForm from "../components/forms";
import SwitchButtonLogin from "../components/switchButton";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("login");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const imageObject = getObjectById(6);
  const logo = getObjectById(3);
  return (
    <div className="flex h-screen w-screen ">
      <div className="w-1/2">
        <img src={imageObject.link} alt="logo" className="w-full h-full" />
      </div>
      <div className="w-1/2 pl-[160px]  pr-[160px] py-10">
        <div>
          <div className="flex justify-end">
            <img src={logo.link} alt="Cooking logo" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="flex pt-8 pb-5">
            <p className="font-belleza text-[28px] text-negro">
              Bienvenido a Cooking
            </p>
          </div>

          <SwitchButtonLogin
            handleClick={handleOptionClick}
            option={selectedOption}
          />

          {selectedOption == "login" ? (
            <div className="flex flex-col pt-10 ">
              <div className="">
                <p className="font-belleza text-[16px] text-negro text-start">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s.
                </p>

                <LoginForm />

                <LoginSocialMedia />
              </div>
            </div>
          ) : (
            <div className="w-3/4">hOLAN'T</div>
          )}
        </div>
      </div>
    </div>
  );
};

export const LoginSocialMedia = () => {
  return (
    <div className="flex flex-col font-belleza w-full justify-center items-center">
      <p>o continúa con</p>
      <div className="flex flex-row">
        <FcGoogle />
        <FaFacebook />
      </div>
    </div>
  );
};

export default Login;
