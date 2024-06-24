import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";

import images from "../constants/images";

const Header = () => {
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };
  const gif = getObjectById(5);
  return (
    <>
      <h2 className="font-belleza text-[50px] text-negro ">Bienvenido a </h2>
      <figure className="overflow-y-hidden  items-center justify-center flex h-20 w-full mt-[-10px]">
        <img src={gif.link} alt="Loading..." className="h-[400%] " />
      </figure>
      <p className="font-belleza text-[18px] text-negro ">
        Encuentra la receta perfecta con los ingredientes que tienes en casa
      </p>
      <div className="w-1/4  my-2 flex items-center relative">
        <input className="border border-black rounded-md  p-1.5 w-full text-negro  "></input>
        <HiMagnifyingGlass className="absolute left-[92%]" />
      </div>
    </>
  );
};

export default Header;
