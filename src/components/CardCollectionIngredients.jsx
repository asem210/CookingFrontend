import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const CardCollectionIngredients = ({ title, ingredientes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);

  const itemsPerPage = 4;

  const nextItem = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % ingredientes.length);
  };

  const previousItem = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + ingredientes.length) % ingredientes.length);
  };

  const getVisibleItems = () => {
    const visibleItems = [];
    if (ingredientes.length <= itemsPerPage) return ingredientes;

    for (let i = 0; i < itemsPerPage; i++) {
      visibleItems.push(ingredientes[(startIndex + i) % ingredientes.length]);
    }

    return visibleItems;
  };

  const toggleSelection = (id) => {
    setSelectedArray((prevArray) => {
      if (prevArray.includes(id)) {
        return prevArray.filter((elemento) => elemento !== id);
      } else {
        return [...prevArray, id];
      }
    });
  };

  const visibleItems = getVisibleItems();

  return (
    <div className="border border-[#F2F2F2] rounded-[15px] shadow-sm p-2">
      <div className="flex items-center justify-between">
        <p className="font-belleza font-bold ml-4">{title}</p>
        <HiMagnifyingGlass className="mr-4 hover:cursor-pointer" size="22px" />
      </div>
      <div className="flex w-full items-center ">
        {visibleItems.length !== 0 && (
          <>
            {' '}
            <IoIosArrowBack
              size="30px"
              className="hover:cursor-pointer"
              onClick={previousItem}
            />
            <div className="grid grid-cols-4 overflow-x-hidden mt-2 w-[90%] ">
              {visibleItems.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center p-1"
                  id={item.id}
                >
                  <img
                    src={item.img}
                    className={`border-2 border-red-500 rounded-full w-[70px] h-[70px] p-0.5 hover:cursor-pointer ${
                      selectedArray.includes(item.id) ? 'grayscale' : ''
                    }`}
                    alt={item.name}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleSelection(item.id);
                    }}
                  />
                  <p className="font-belleza">{item.name}</p>
                </div>
              ))}
            </div>
            <IoIosArrowForward
              size="30px"
              className="hover:cursor-pointer"
              onClick={nextItem}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default CardCollectionIngredients;
