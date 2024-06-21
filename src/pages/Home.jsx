import React, { useState, useEffect } from "react";
import images from "../constants/images";
import CardCollectionIngredients from "../components/CardCollectionIngredients";
import { HiMagnifyingGlass } from "react-icons/hi2";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useIngredient } from "../hooks/ingredientHook";
import ingredientService from "../apis/ingredient";
import recipeService from "../apis/recipe";
import { useRecipe } from "../hooks/recipeHook";

const Home = () => {
  const { listIngredient, addAllListIngredientHook } = useIngredient();
  const [categories, setCategories] = useState([]);
  const { selectedIngredients, toggleIngredientSelected } = useIngredient();
  const { searchedRecipes, saveSearchedRecipes, clearSearch } = useRecipe();
  const [ingredientNames, setIngredientNames] = useState([]);

  // UseEffect para actualizar los nombres de los ingredientes seleccionados
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      const names = selectedIngredients.map((ingredient) => ingredient.name);
      setIngredientNames(names);
    } else {
      setIngredientNames([]); // Limpia el estado si no hay ingredientes seleccionados
    }
  }, [selectedIngredients]);

  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const step1 = getObjectById(4);
  const step2 = getObjectById(1);
  const step3 = getObjectById(2);
  const gif = getObjectById(5);

  useEffect(() => {
    const callIngredient = async () => {
      try {
        const res = await ingredientService.getAll();
        console.log(res);
        if (res) {
          addAllListIngredientHook(res.data);
          const uniqueCategories = [
            ...new Set(res.data.map((ingredient) => ingredient.category)),
          ];
          setCategories(uniqueCategories);
          console.log(uniqueCategories);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    callIngredient();
  }, []);

  const searchRecipeByIngredients = async () => {
    try {
      if (selectedIngredients.length > 0) {
        const searchResponse = await recipeService.getByIng(ingredientNames);
        console.log(searchResponse);
      } else {
        alert("Seleccione como minimo un ingrediente");
      }
    } catch (error) {
      console.log(error.message);
    }
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
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className=" w-screen h-[80%] flex flex-col items-center">
        <h2 className="font-belleza text-[30px] ">Bienvenido a </h2>
        <figure className="overflow-y-hidden  items-center justify-center flex h-20 w-full mt-[-10px]">
          <img src={gif.link} alt="Loading..." className="h-[400%] " />
        </figure>

        <p className="font-belleza text-[18px] ">
          Encuentra la receta perfecta con los ingredientes que tienes en casa
        </p>
        <div className="w-1/4  my-2 flex items-center relative">
          <input className="border border-black rounded-md  p-1.5 w-full  "></input>
          <HiMagnifyingGlass className="absolute left-[92%]" />
        </div>

        <p className="font-belleza text-[18px] ">
          es fácil , solo tienes que seguir tres sencillos pasos
        </p>
        <div className="w-[60%] flex justify-evenly  items-center text-center  ">
          <div className="w-1/4 h-full flex flex-col  justify-end  items-center">
            <img src={step1.link} className="w-[180px] h-3/4 " />
            <p className="h-1/4  font-belleza  text-[18px]">
              Seleccionar los ingredientes que tengas en tu hogar
            </p>
          </div>
          <div className="w-1/4 h-full flex flex-col  justify-end  items-center mt-14">
            <img src={step2.link} className="w-[180px] h-3/4 " />
            <p className=" h-1/4 font-belleza  text-[18px] ">
              Elegir la receta que más te guste
            </p>
          </div>
          <div className="w-1/4 font-belleza h-full flex flex-col  justify-end  items-center">
            <img src={step3.link} className="w-[180px]  h-3/4 " />
            <p className=" h-1/4  font-belleza text-[18px]">
              Disfrutar de tu comida
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-flow-row w-[70%] gap-4 mt-4">
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
          onClick={searchRecipeByIngredients}
        >
          Seleccionar ingredientes
        </button>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Home;
