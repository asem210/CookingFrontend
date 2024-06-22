import React, { useState, useEffect } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { useIngredient } from "../hooks/ingredientHook";
import ingredientService from "../apis/ingredient";

const CardCollectionIngredients = ({ title, ingredientes }) => {
  const [startIndex, setStartIndex] = useState(0);
  const [selectedArray, setSelectedArray] = useState([]);
  const [ingredient, setIngredient] = useState([]);
  const { selectedIngredients, toggleIngredientSelected } = useIngredient();
  const [searchQuery, setSearchQuery] = useState("");

  const itemsPerPage = 4;

  const nextItem = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % ingredientes.length);
  };

  const previousItem = () => {
    setStartIndex(
      (prevIndex) => (prevIndex - 1 + ingredientes.length) % ingredientes.length
    );
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

  const searchIngredients = async () => {
    try {
      const searchResponse = await ingredientService.getByName(searchQuery);
      setIngredient(searchResponse.data);
      console.log(searchResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchIngredients();
    }
  };
  const visibleItems = getVisibleItems();

  return (
    <div className="border border-[#F2F2F2] rounded-[15px] shadow-sm p-4 bg-white">
      <div className="flex items-center justify-between mb-4">
        <p className="font-belleza font-bold text-lg ml-4">{title}</p>
        <div className="flex items-center mr-4 bg-gray-100 p-2 rounded-lg w-1/2">
          <input
            type="text"
            className="border-none outline-none bg-transparent w-full font-belleza"
            placeholder="Ingrese un ingrediente a buscar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <HiMagnifyingGlass
            className="ml-2 hover:cursor-pointer"
            size="22px"
            onClick={searchIngredients}
          />
        </div>
      </div>
      <div className="flex w-full items-center ">
        {ingredientes.length > itemsPerPage && (
          <IoIosArrowBack
            size="30px"
            className="hover:cursor-pointer"
            onClick={previousItem}
          />
        )}
        <div className="grid grid-cols-4 overflow-x-hidden mt-2 w-[90%] gap-4">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-1"
              id={item.id}
            >
              <img
                src={item.img}
                className={`border-2 border-red-500 rounded-full w-[70px] h-[70px] p-0.5 hover:cursor-pointer ${
                  selectedArray.includes(item.id) ? "grayscale" : ""
                }`}
                alt={item.name}
                onClick={(e) => {
                  e.preventDefault();
                  toggleSelection(item.id);
                  toggleIngredientSelected(item);
                }}
              />
              <p className="font-belleza">{item.name}</p>
            </div>
          ))}
        </div>
        {ingredientes.length > itemsPerPage && (
          <IoIosArrowForward
            size="30px"
            className="hover:cursor-pointer"
            onClick={nextItem}
          />
        )}
      </div>
    </div>
  );
};

export default CardCollectionIngredients;
