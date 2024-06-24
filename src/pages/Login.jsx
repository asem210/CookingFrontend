import React, { useState } from 'react';
import images from '../constants/images';
import { LoginForm, RegisterForm } from '../components/forms';
import SwitchButtonLogin from '../components/switchButton';
import { LoginSocialMedia } from '../components/GoogleLogin';
import { useAuth } from '../hooks/authHook';

const Login = () => {
  const { login, status, logOut } = useAuth();

  const [selectedOption, setSelectedOption] = useState('login');
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
    <div className="flex h-screen w-screen">
      <div className="w-1/2">
        <img src={imageObject.link} alt="logo" className="w-full h-full" />
      </div>
      <div className="w-1/2 pl-[160px] pr-[160px] py-10">
        <div>
          <div className="flex justify-end">
            <img src={logo.link} alt="Cooking logo" />
          </div>
        </div>
        <div className="flex flex-col justify-center items-center w-full">
          <div className="flex pt-8 pb-5">
            <p className="font-belleza text-[28px] text-negro">Bienvenido a Cooking</p>
          </div>

          <SwitchButtonLogin handleClick={handleOptionClick} option={selectedOption} />

          <div className="flex flex-col pt-5 w-3/4">
            {selectedOption === 'login' ? (
              <LoginForm />
            ) : (
              <RegisterForm action={setUserData} data={userData} />
            )}
            <LoginSocialMedia onlogin={login} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
