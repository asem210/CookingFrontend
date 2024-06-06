import React, { useState } from "react";
import images from "../constants/images";

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
      <div className="w-1/2 px-10 py-10">
        <div>
          <div className="flex justify-end">
            <img src={logo.link} alt="Cooking logo" />
          </div>
        </div>
        <div className="flex-col justify-center items-center bg-blue-200">
          <div className="flex pt-5">
            <p className="font-belleza text-[16px] text-negro">
              Bienvenido a Cooking
            </p>
          </div>
          <div className="flex flex-col items-center justify-center py-6">
            <nav className="flex overflow justify-center items-center-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-sm text-gray-600 bg-gray-500/5 rounded-xl w-[329px]">
              <button
                role="tab"
                type="button"
                className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset shadow ${
                  selectedOption === "login"
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-yellow-600"
                }`}
                onClick={() => handleOptionClick("login")}
              >
                Login
              </button>
              <button
                role="tab"
                type="button"
                className={`flex whitespace-nowrap items-center h-8 px-5 font-medium rounded-lg outline-none focus:ring-2 focus:ring-yellow-600 focus:ring-inset hover:text-gray-800 ${
                  selectedOption === "register"
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-yellow-600"
                }`}
                onClick={() => handleOptionClick("register")}
              >
                Register
              </button>
            </nav>
          </div>
          {selectedOption == "login" ? (
            <div className="flex flex-col  ">
              <div className="">
                <p className="font-belleza text-[16px] text-negro text-start">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </div>
              <div className="flex flex-row bg-slate-500 w-3/4">
                <div className=" w-3/4 bg-black">
                  <p>Hola</p>
                </div>
                <div className="w-1/4">
                  <p>Hola</p>
                </div>
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

export default Login;
