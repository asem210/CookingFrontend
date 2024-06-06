import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowForward } from 'react-icons/io';
import { IoIosArrowBack } from 'react-icons/io';

const CardCollectionIngredients = ({ title, ingredientes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 4;
  const nextItem = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % ingredientes.length);
  };

  const previewItem = () => {
    if (startIndex !== 0) setStartIndex((prevIndex) => (prevIndex - 1) % ingredientes.length);
  };

  const getVisibleItems = () => {
    if (ingredientes.length <= itemsPerPage) {
      return ingredientes;
    }

    const visibleItems = [];
    for (let i = 0; i < itemsPerPage; i++) {
      visibleItems.push(ingredientes[(startIndex + i) % ingredientes.length]);
    }

    return visibleItems;
  };

  const visible = () => {
    arrow.classList.remove('hover:cursor-pointer');
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="border border-[#F2F2F2] rounded-[15px] shadow-sm p-2">
      <div className="flex items-center justify-between">
        <p className="font-belleza font-bold ml-4">{title}</p>
        <HiMagnifyingGlass className="mr-4 hover:cursor-pointer" size="22px" />
      </div>
      <div className="flex w-full items-center">
        <IoIosArrowBack size="30px" className="hover:cursor-pointer" onClick={previewItem} />
        <div className="grid grid-cols-4 overflow-x-hidden mt-2 w-[90%]">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center"
              id={item.id}
            >
              <img
                src={item.img}
                className="border-2 border-red-500 rounded-full w-[70px] h-[70px] p-0.5 items-center hover:cursor-pointer"
                alt={item.name}
              />
              <p className="font-belleza">{item.name}</p>
            </div>
          ))}
        </div>
        <IoIosArrowForward
          size="30px"
          className="hover:cursor-pointer"
          onClick={nextItem}
          id="ArrowLeft"
        />
      </div>
    </div>
  );
};

export default CardCollectionIngredients;
