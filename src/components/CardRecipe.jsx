import React, { useState } from 'react';

import { FaArrowRight } from 'react-icons/fa6';
import { LuClock4 } from 'react-icons/lu';
import { IoBookmarkOutline } from 'react-icons/io5';
import { FcBookmark } from 'react-icons/fc';

const CardRecipe = ({
  img = 'https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg',
  time = 'xx',
  porcion = 'x',
  name = 'plato xx',
  fitStep = 'Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada ',
  dificulty = 'medio',
}) => {
  const [bookmarkSave, setBookmarkSave] = useState(false);

  return (
    <div className="rounded-xl border shadow-md max-h-[300px] overflow-hidden ">
      <figure className="relative overflow-hidden items-center justify-center flex h-1/2 w-full rounded-t-xl">
        <img src={img} className="h-full w-full" />

        {bookmarkSave ? (
          <FcBookmark
            className="absolute text-naranja top-1 left-1 cursor-pointer"
            size={'30px'}
            onClick={() => {
              setBookmarkSave(false);
            }}
          />
        ) : (
          <IoBookmarkOutline
            className="absolute text-naranja top-1 left-1 cursor-pointer"
            size={'30px'}
            onClick={() => {
              setBookmarkSave(true);
            }}
          />
        )}

        <p className="absolute text-white font-belleza  top-[80%]  left-[5%] text-[17px]">
          {dificulty}
        </p>
        <div className="absolute text-white font-belleza items-center gap-2 flex top-[80%]  left-[65%] ">
          <LuClock4 />
          <p className="text-[18px]"> {time + ' min.'}</p>
        </div>
      </figure>
      <div className="mt-2 h-fit ">
        <div className="font-belleza ">
          <div className="flex justify-around font-belleza items-center">
            <p className="font-semibold text-[18px]  w-1/2  h-5  overflow-hidden"> {name}</p>
            <p className="font-semibold">Porciones: {porcion} </p>
          </div>
          <p className="text-[12px] mx-5 mt-2 max-h-14 overflow-hidden ">{fitStep}</p>
        </div>
        <div className="font-belleza text-naranja flex items-center justify-center gap-2 mt-2 hover:text-orange-400 cursor-pointer">
          <p>Ir a la receta</p>
          <FaArrowRight size={'28px'} />
        </div>
      </div>
    </div>
  );
};

export default CardRecipe;
