import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import recipeService from '../apis/recipe';
import images from '../constants/images';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const [recipeName, setRecipeName] = useState('');
  const navigate = useNavigate();

  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };
  const gif = getObjectById(5);

  const handleSearch = async () => {
    try {
      const fuzzySearchResults = await recipeService.fuzzySearch(recipeName);
      if (fuzzySearchResults.data && fuzzySearchResults.data.length === 1) {
        const id = fuzzySearchResults.data[0].id; // Obtén el ID del resultado único
        navigate(`${name_proyect}/home/${id}`); // Navega a la ruta con el ID
      } else {
        console.log('Resultados de búsqueda:', fuzzySearchResults.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 lg:px-10">
      <h2 className="font-belleza text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-negro mb-4 text-center">
        Bienvenido a
      </h2>
      <figure className="overflow-hidden flex items-center justify-center h-20 w-full mb-4 max-md:h-10  max-lg:h-15">
        <img src={gif.link} alt="Loading..." className="h-48 md:h-48 lg:h-64" />
      </figure>
      <p className="font-belleza text-sm sm:text-base md:text-lg lg:text-xl text-negro text-center mb-4">
        Encuentra la receta perfecta con los ingredientes que tienes en casa
      </p>
      <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 my-2 flex items-center relative">
        <input
          className="border border-black rounded-md p-1.5 w-full text-negro"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          onKeyDown={handleSearchKeyDown}
          placeholder="Buscar receta..."
        />
        <HiMagnifyingGlass
          className="absolute right-2 cursor-pointer text-xl text-gray-600 hover:text-naranja"
          onClick={handleSearch}
        />
      </div>
    </div>
  );
};

export default Header;
