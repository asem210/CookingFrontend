import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiCheckSquare, FiSquare } from "react-icons/fi";
import "react-international-phone/style.css"; // Asegúrate de importar los estilos por defecto
import { PhoneInput } from "react-international-phone";
export const InputDefault = ({
  label,
  placeholder,
  action,
  name,
  // campo,
  // cambio,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className=" pb-3">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-[40px] flex items-center justify-start">
        <input
          // value={campo}
          // onChange={(event) => cambio(event.target.value)}
          {...action(name)}
          placeholder={placeholder}
          className="outline-none border-none mx-8 h-full w-full"
        />
      </div>
    </div>
  );
};

export const InputPassword = ({
  label,
  placeholder,
  action,
  name,
  // campo,
  // cambio,
}) => {
  const [clickedIn, setClickedIn] = useState(false);

  const tooglePasswordVisibility = () => {
    if (clickedIn === false) {
      setClickedIn(true);
    } else {
      setClickedIn(false);
    }
  };

  return (
    <div className="flex flex-col">
      <label className="pb-3">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-[40px] flex items-center justify-start relative">
        <input
          type={clickedIn ? "text" : "password"}
          {...action(name)}
          placeholder={placeholder}
          // value={campo}
          // onChange={(event) => cambio(event.target.value)}
          className="outline-none border-none h-full w-full ml-8 mr-10"
        />
        <div
          className="absolute inset-y-0 right-0 flex items-center pr-3"
          onClick={tooglePasswordVisibility}
        >
          {clickedIn ? (
            <FaRegEyeSlash size={20} className="cursor-pointer" />
          ) : (
            <FaRegEye size={20} className="cursor-pointer" />
          )}
        </div>
      </div>
    </div>
  );
};

export const InputPhone = ({ phone, setPhone }) => {
  return (
    <form className="flex flex-col items-center space-y-4">
      <label className="text-[16px] ">Número de teléfono</label>
      <PhoneInput
        value={phone}
        onChange={(value) => setPhone(value)}
        defaultCountry="RU"
        containerClassName="w-full"
        inputClassName="border border-gray-300 rounded-lg px-4 py-2 w-full"
        countrySelectProps={{
          className: "border border-gray-300 rounded-l-lg px-4 py-2 w-full ",
        }}
      />
    </form>
  );
};
