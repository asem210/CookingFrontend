import React, { useState, useEffect } from 'react';
import images from '../constants/images';
import CardCollectionIngredients from '../components/CardCollectionIngredients';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useIngredient } from '../hooks/ingredientHook';
import ingredientService from '../apis/ingredient';
import recipeService from '../apis/recipe';
import { useRecipe } from '../hooks/recipeHook';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '../hooks/messageHook';
import Header from '../components/Header';

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

  // UseEffect para actualizar los nombres de los ingredientes seleccionados
  useEffect(() => {
    if (selectedIngredients.length > 0) {
      const names = selectedIngredients.map((ingredient) => ingredient.name);
      setIngredientNames(names);
    } else {
      setIngredientNames([]); // Limpia el estado si no hay ingredientes seleccionados
    }
  }, [selectedIngredients]);

  //remplazar por el helper callIngredient
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
        const specificSearch = await recipeService.getByIng(ingredientNames);
        const eqOrLess = await recipeService.getEqOrLess(ingredientNames);

        if (specificSearch && eqOrLess) {
          const updatedResponse = {
            ...specificSearch,
            tipo: 'Exacto',
          };

          const responseEq = {
            ...eqOrLess,
            tipo: 'Eq',
          };

          // Crear un array con ambos resultados
          const combinedResponses = [updatedResponse, responseEq];

          console.log(combinedResponses);

          // Guarda el array combinado en el estado
          saveSearchedRecipes(combinedResponses);

          // Navega a la página de búsqueda de recetas
          navigate(name_proyect + '/recipe/search');
        } else {
          showNewMessage('warning', 'No se pudieron obtener las recetas.');
        }
      } else {
        showNewMessage('warning', 'Por favor seleccione como mínimo 1 ingrediente');
      }
    } catch (error) {
      console.log(error.message);
      showNewMessage('error', 'Error en la llamada a la API');
    }
  };

  // Organizar los ingredientes por categoría
  const ingredientsByCategory = categories.map((category) => {
    return {
      category,
      ingredients: listIngredient.filter((ingredient) => ingredient.category === category),
    };
  });

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className=" w-screen h-[80%] flex flex-col items-center">
        <Header />

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
            <p className=" h-1/4  font-belleza text-[18px]">Disfrutar de tu comida</p>
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
