import React, { useState } from "react";
import images from "../constants/images";
import { LoginForm, RegisterForm } from "../components/forms";
import SwitchButtonLogin from "../components/switchButton";
import { LoginSocialMedia } from "../components/GoogleLogin";
import { useAuth } from "../hooks/authHook";
import BackToHomeButton from "../components/ReturnTo";

const Login = () => {
  const { login, status, logOut } = useAuth();
  const [selectedOption, setSelectedOption] = useState("login");
  const [userData, setUserData] = useState({});

  const handleOptionClick = (option) => {
    setSelectedOption(option);
  };

  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const imageObject = getObjectById(6);
  const logo = getObjectById(3);

  return (
    <div className="flex flex-col md:flex-row h-screen w-screen">
      {/* Columna izquierda con la imagen */}
      <div className="w-full md:w-1/2 hidden md:block">
        <img
          src={imageObject.link}
          alt="logo"
          className="w-full h-full object-cover"
        />
      </div>
      {/* Columna derecha con el contenido */}
      <div className="w-full md:w-1/2 p-4 md:pl-[40px] md:pr-[40px] md:py-10">
        <div className="flex justify-between items-center">
          <BackToHomeButton text={"Volver"} navigateTo={"home"} />

          <img src={logo.link} alt="Cooking logo" className="w-24 md:w-auto" />
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex pt-8 pb-5">
            <p className="font-belleza text-[28px] text-negro text-center">
              Bienvenido a Cooking
            </p>
          </div>
          <SwitchButtonLogin
            handleClick={handleOptionClick}
            option={selectedOption}
          />
          <div className="flex flex-col pt-5 w-1/2 md:w-full sm:w-1/2 lg:w-1/2 mx-auto ">
            {/* Mostrar el formulario de login o registro */}
            {selectedOption === "login" ? (
              <LoginForm />
            ) : (
              <RegisterForm action={setUserData} data={userData} />
            )}
            {/* Mostrar el inicio de sesión con redes sociales */}
            <LoginSocialMedia onlogin={login} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
