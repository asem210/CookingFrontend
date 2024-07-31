import React, { useState, useEffect } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useIngredient } from '../hooks/ingredientHook';
import {
  searchIngredients,
  getVisibleItems,
  calculateTotalPages,
} from '../helpers/ingredientCardHelper';

import { capitalizeAllSentences } from '../utils/othersUtils';

const IngredientItem = ({ item, isSelected, toggleSelection, toggleIngredientSelected }) => (
  <div className="flex flex-col items-center justify-center p-2 transition-transform duration-200 transform hover:scale-105">
    <img
      src={item.img}
      className={`border-2 border-red-500 rounded-full min-w-[70px] min-h-[70px] w-[70px] h-[70px] p-0.5 hover:cursor-pointer transition-all duration-200 ${
        isSelected ? 'grayscale' : ''
      }`}
      alt={item.name}
      onClick={(e) => {
        e.preventDefault();
        toggleSelection(item.id);
        toggleIngredientSelected(item);
      }}
    />
    <p className="font-belleza mt-2 text-sm text-gray-700 truncate">{item.name}</p>
  </div>
);

const CardCollectionIngredients = ({ title, ingredientes }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedArray, setSelectedArray] = useState([]);
  const [ingredient, setIngredient] = useState(null);
  const { toggleIngredientSelected } = useIngredient();
  const [searchQuery, setSearchQuery] = useState('');
  const [allIngredients, setAllIngredients] = useState([]);

  const itemsPerPage = 4;

  useEffect(() => {
    setAllIngredients(ingredientes);
  }, [ingredientes]);

  const handleSearch = async () => {
    try {
      if (searchQuery === '') {
        setIngredient(null);
      } else {
        const data = await searchIngredients(searchQuery);
        setIngredient(data);
      }
    } catch (error) {
      console.log('Error searching ingredients:', error);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
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

  const totalPages = calculateTotalPages(allIngredients, itemsPerPage);

  const visibleItems = getVisibleItems(
    currentPage,
    itemsPerPage,
    allIngredients,
    searchQuery,
    ingredient
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="border border-[#F2F2F2] rounded-lg shadow-lg p-6 bg-white ">
      <div className="flex items-center justify-between mb-6">
        <p className="font-belleza font-bold text-xl max-md:text-[17px]">
          {capitalizeAllSentences(title)}
        </p>
        <div className="flex items-center bg-gray-100 p-2 rounded-lg w-2/3 lg:w-3/4 md:w-1/2 sm:w-full max-w-[60%]">
          <input
            type="text"
            className="border-none outline-none bg-transparent w-full font-belleza px-2 "
            placeholder="Buscar ingrediente..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
          />
          <HiMagnifyingGlass
            className="ml-2 hover:cursor-pointer text-gray-500"
            size="22px"
            onClick={handleSearch}
          />
        </div>
      </div>
      <div className="flex w-full items-center justify-center mb-4">
        <IoIosArrowBack
          size="30px"
          className={`hover:cursor-pointer ${
            currentPage === 1 ? 'text-gray-300' : 'text-black'
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        />
        <div className="grid grid-cols-4  max-lg:grid-cols-3 max-md:grid-cols-2   gap-4 mx-4">
          {visibleItems.map((item, index) => (
            <IngredientItem
              key={index}
              item={item}
              isSelected={selectedArray.includes(item.id)}
              toggleSelection={toggleSelection}
              toggleIngredientSelected={toggleIngredientSelected}
            />
          ))}
        </div>
        <IoIosArrowForward
          size="30px"
          className={`hover:cursor-pointer ${
            currentPage === totalPages ? 'text-gray-300' : 'text-black'
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        />
      </div>
    </div>
  );
};

export default CardCollectionIngredients;
