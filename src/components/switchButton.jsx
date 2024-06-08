import React from "react";

const SwitchButtonLogin = ({ handleClick, option }) => {
  return (
    <nav className=" w-[329px] h-[59px] rounded-[33px]  text-white bg-negroclaro flex flex-row overflow-hidden justify-center items-center-x-auto items-center p-1 space-x-1 rtl:space-x-reverse text-[16px]">
      <button
        role="tab"
        type="button"
        className={`font-belleza flex whitespace-nowrap w-[146px] h-[40px]  items-center justify-center text-center px-5 font-medium rounded-[33px] outline-none   ${
          option === "login" ? "bg-naranja" : "bg-transparent"
        }`}
        onClick={() => handleClick("login")}
      >
        Login
      </button>

      <button
        role="tab"
        type="button"
        className={`flex font-belleza whitespace-nowrap items-center  w-[146px] h-[40px] px-5 text-center justify-center font-medium rounded-[33px] outline-none   ${
          option === "register" ? "bg-naranja" : "bg-transparent"
        }`}
        onClick={() => handleClick("register")}
      >
        Register
      </button>
    </nav>
  );
};

export default SwitchButtonLogin;
