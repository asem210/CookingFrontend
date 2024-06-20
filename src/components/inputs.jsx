import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import 'react-international-phone/style.css'; // Asegúrate de importar los estilos por defecto
import { PhoneInput } from 'react-international-phone';
import { PhoneNumberUtil } from 'google-libphonenumber';

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

export const InputFormCreateIng = ({
  label,
  placeholder,
  action,
  name,
  visible = false,
  width = 'w-full',
}) => {
  return (
    <div className={' flex flex-col ' + width}>
      <label className=" pb-2">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-xl flex items-center justify-start ">
        <input
          {...action(name)}
          placeholder={placeholder}
          className="outline-none border-none mx-4 h-full w-full "
          readOnly={visible}
        />
      </div>
    </div>
  );
};

export const InputFormStatic = ({ label, width = 'w-full', value }) => {
  return (
    <div className={' flex flex-col ' + width}>
      <label className=" pb-2">{label}</label>
      <div className="w-full h-[44px] border border-black rounded-xl flex items-center justify-start bg-slate-100">
        <input
          className="outline-none border-none mx-4 h-full w-full bg-slate-100"
          readOnly
          value={value}
        />
      </div>
    </div>
  );
};

export const CheckBoxFormCreateIng = ({ label, action, name, width = 'w-full' }) => {
  return (
    <div className={' items-center flex flex-col ' + width}>
      <label className=" pb-2">{label}</label>
      <div className="w-full h-[20px]  rounded-xl flex  justify-center  items-center">
        <input
          {...action(name)}
          type="checkbox"
          className="  mx-4 py-10 outline-none border-none  h-full w-full overflow-hidden text-[14px] mt-4  "
        />
      </div>
    </div>
  );
};

export const TextFormCreateIng = ({
  label,
  placeholder,
  action,
  name,
  visible = false,
  width = 'w-full',
}) => {
  return (
    <div className={'flex flex-col ' + width}>
      <label className=" pb-2">{label}</label>
      <div className="w-full h-[90px] border border-black rounded-xl flex  justify-center  items-center">
        <textarea
          {...action(name)}
          placeholder={placeholder}
          className="  mx-4 py-10 outline-none border-none  h-full w-full overflow-hidden text-[14px]  "
          readOnly={visible}
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
      <select
        {...action(name)}
        className="border border-black  rounded-xl flex items-center py-3 px-4 font-belleza outline-none"
      >
        <option value="" disabled>
          {itemDefault || 'default'}
        </option>
        {items.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
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
          type={clickedIn ? 'text' : 'password'}
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

export const InputPhone = ({ phone, setPhone, action }) => {
  return (
    <div className="flex flex-col w-full space-y-3">
      <label className="text-[16px] ">Número de teléfono</label>
      <div className="w-full h-[44px] flex items-center justify-start">
        <PhoneInput
          {...action('phone')}
          className="text-[16px]"
          value={phone}
          onChange={(value) => setPhone(value)}
          defaultCountry="pe"
          containerClassName="w-full"
          inputClassName="border border-gray-300 rounded-lg px-4 py-2 w-full"
          countrySelectProps={{
            className: 'border border-gray-300 rounded-l-lg  py-5 w-max ',
          }}
        />
      </div>
    </div>
  );
};
