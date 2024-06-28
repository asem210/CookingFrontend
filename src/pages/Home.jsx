import React, { useState, useEffect } from "react";
import images from "../constants/images";
import CardCollectionIngredients from "../components/CardCollectionIngredients";
import { HiMagnifyingGlass } from "react-icons/hi2";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useIngredient } from "../hooks/ingredientHook";
import { useRecipe } from "../hooks/recipeHook";
import { useNavigate } from "react-router-dom";
import { useMessage } from "../hooks/messageHook";
import Header from "../components/Header";
import {
  getObjectById,
  fetchAllIngredients,
  searchRecipeByIngredients,
} from "../helpers/homeHelpers";

const Home = () => {
  //hooks
  const { listIngredient, addAllListIngredientHook } = useIngredient();
  const [categories, setCategories] = useState([]);
  const { selectedIngredients, toggleIngredientSelected } = useIngredient();
  const { searchedRecipes, saveSearchedRecipes, clearSearch } = useRecipe();
  const [ingredientNames, setIngredientNames] = useState([]);
  const { showNewMessage } = useMessage();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const navigate = useNavigate();

  const step1 = getObjectById(4, images);
  const step2 = getObjectById(1, images);
  const step3 = getObjectById(2, images);

  // UseEffect para actualizar los nombres de los ingredientes seleccionados
  useEffect(() => {
    clearSearch();
    if (selectedIngredients.length > 0) {
      const names = selectedIngredients.map((ingredient) => ingredient.name);
      setIngredientNames(names);
    } else {
      setIngredientNames([]); // Limpia el estado si no hay ingredientes seleccionados
    }
  }, [selectedIngredients]);

  // Llamar a la función fetchAllIngredients al cargar la página
  useEffect(() => {
    fetchAllIngredients(addAllListIngredientHook, setCategories);
  }, []);

  // Función de búsqueda de recetas por ingredientes
  const handleSearchRecipeByIngredients = () => {
    searchRecipeByIngredients(
      selectedIngredients,
      ingredientNames,
      saveSearchedRecipes,
      navigate,
      name_proyect,
      showNewMessage
    );
  };

  // Organizar los ingredientes por categoría
  const ingredientsByCategory = categories.map((category) => {
    return {
      category,
      ingredients: listIngredient.filter(
        (ingredient) => ingredient.category === category
      ),
    };
  });

  return (
    <div className="flex flex-col h-auto w-screen overflow-x-hidden overflow-y-auto">
      <NavBar />
      <div className="w-screen h-auto flex flex-col items-center">
        <Header />

        <p className="font-belleza text-[18px] text-center sm:text-left">
          Es fácil, solo tienes que seguir tres sencillos pasos
        </p>
        <div className="w-[90%] md:w-[60%] flex flex-col md:flex-row justify-evenly items-center text-center">
          <div className="w-full md:w-1/4 h-full flex flex-col justify-end items-center my-4">
            <img src={step1.link} className="w-[180px] h-3/4 " />
            <p className="h-1/4 font-belleza text-[18px]">
              Seleccionar los ingredientes que tengas en tu hogar
            </p>
          </div>
          <div className="w-full md:w-1/4 h-full flex flex-col justify-end items-center my-4">
            <img src={step2.link} className="w-[180px] h-3/4 " />
            <p className=" h-1/4 font-belleza text-[18px]">
              Elegir la receta que más te guste
            </p>
          </div>
          <div className="w-full md:w-1/4 font-belleza h-full flex flex-col justify-end items-center my-4">
            <img src={step3.link} className="w-[180px] h-3/4 " />
            <p className=" h-1/4 font-belleza text-[18px]">
              Disfrutar de tu comida
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-[90%] md:w-[70%] mt-4">
          {ingredientsByCategory.map(({ category, ingredients }) => (
            <CardCollectionIngredients
              key={category}
              title={category}
              ingredientes={ingredients}
            />
          ))}
        </div>
        <button
          className="bg-naranja py-3 px-10 rounded-2xl text-white mt-4 hover:bg-red-500"
          onClick={handleSearchRecipeByIngredients}
        >
          Seleccionar ingredientes
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
