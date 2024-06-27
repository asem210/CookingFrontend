import React, { useState } from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import recipeService from "../apis/recipe";
import images from "../constants/images";
import { Navigate, useNavigate } from "react-router-dom";

const Header = () => {
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const [recipeName, setRecipeName] = useState("");
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
        console.log("Resultados de búsqueda:", fuzzySearchResults.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <>
      <h2 className="font-belleza text-[50px] text-negro">Bienvenido a</h2>
      <figure className="overflow-y-hidden items-center justify-center flex h-20 w-full mt-[-10px]">
        <img src={gif.link} alt="Loading..." className="h-[400%]" />
      </figure>
      <p className="font-belleza text-[18px] text-negro">
        Encuentra la receta perfecta con los ingredientes que tienes en casa
      </p>
      <div className="w-1/4 my-2 flex items-center relative">
        <input
          className="border border-black rounded-md p-1.5 w-full text-negro"
          value={recipeName}
          onChange={(e) => setRecipeName(e.target.value)}
          onKeyDown={handleSearchKeyDown}
        />
        <HiMagnifyingGlass
          className="absolute left-[92%] cursor-pointer"
          onClick={handleSearch}
        />
      </div>
    </>
  );
};

export default Header;
