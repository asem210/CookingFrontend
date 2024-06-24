import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import { useRecipe } from "../hooks/recipeHook";
import { useMessage } from "../hooks/messageHook";
import Loading from "../components/Loading";
import { ExistPanelRecip } from "../components/ExistPanel";
import { useIngredient } from "../hooks/ingredientHook";
import Header from "../components/Header";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoOptionsOutline } from "react-icons/io5";

const SearchRecipes = () => {
  const { selectedIngredients, toggleIngredientSelected } = useIngredient();
  const { searchedRecipes, saveSearchedRecipes, clearSearch } = useRecipe();
  const [recipeCount, setRecipeCount] = useState(0);

  useEffect(() => {
    if (searchedRecipes) {
      const totalRecipes = searchedRecipes.reduce((count, response) => {
        return count + (response.data ? response.data.length : 0);
      }, 0);
      setRecipeCount(totalRecipes);
      console.log(`Número de recetas encontradas: ${totalRecipes}`);

      // Realiza alguna acción basada en la cantidad de recetas
      if (totalRecipes === 0) {
        console.log("No se encontraron recetas.");
        // Aquí puedes mostrar un mensaje al usuario o realizar alguna otra acción
      } else {
        console.log(`Se encontraron ${totalRecipes} recetas.`);
        // Aquí puedes realizar alguna acción basada en el número de recetas encontradas
      }
    }
  }, [searchedRecipes]);
  return (
    <div className="flex flex-col h-auto w-screen overflow-x-hidden overflow-y-auto">
      <NavBar />
      <div className="w-full h-[80%] flex flex-col items-center">
        <Header />
        <div className="flex flex-row mt-8 items-center w-screen">
          <div className="flex flex-row items-center flex-shrink-0 w-1/2">
            <IoIosArrowRoundBack size={25} />
            <p className="font-belleza text-[16px] text-negro ml-2">
              Realizar una nueva búsqueda
            </p>
          </div>
          <div className="justify-center w-1/2">
            <p className="font-belleza text-[24px] text-negro">
              Resultados: {recipeCount}
            </p>
          </div>
          <div className="flex-shrink-0 w-1/3"></div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const SearchByName = async () => {
  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className=" w-screen h-[80%] flex flex-col items-center">
        <Header />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default SearchRecipes;
