import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

export const InputDefault = ({ label, placeholder, action, name }) => {
  return (
    <div className="flex flex-col w-full">
      <label className=" pb-3">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-[40px] flex items-center justify-start">
        <input
          {...action(name)}
          placeholder={placeholder}
          className="outline-none border-none mx-8 h-full w-full"
        />
      </div>
    </div>
  );
};

export const InputFormCreateIng = ({ label, placeholder, action, name }) => {
  return (
    <div className="flex flex-col w-full">
      <label className=" pb-2">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-xl flex items-center justify-start">
        <input
          {...action(name)}
          placeholder={placeholder}
          className="outline-none border-none mx-4 h-full w-full"
        />
      </div>
    </div>
  );
};
export const InputSelectFormCreateIng = ({
  label,
  placeholder,
  action,
  name,
  items,
  itemDefault,
}) => {
  return (
    <div className="flex flex-col w-full">
      <label className="pb-2">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-xl flex items-center justify-start">
        <input
          {...action(name)}
          placeholder={placeholder}
          className="outline-none border-none mx-4 h-full w-full"
          list={`${name}-datalist`}
        />
        <datalist id={`${name}-datalist`} className="relative">
          {items.map((item, index) => (
            <option key={index} value={item} />
          ))}
        </datalist>
      </div>
    </div>
  );
};

export const InputPassword = ({ label, placeholder, action, name }) => {
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
          type={clickedIn ? 'text' : 'password'}
          {...action(name)}
          placeholder={placeholder}
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
