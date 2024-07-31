import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { IoIosArrowRoundBack, IoIosOptions } from 'react-icons/io';
import { useRecipe } from '../hooks/recipeHook';
import { useIngredient } from '../hooks/ingredientHook';
import CardRecipe from '../components/CardRecipe';
import { useUser } from '../hooks/userHook';
import { useNavigate } from 'react-router-dom';
import BackToHomeButton from '../components/ReturnTo';

const SearchRecipes = () => {
  const { userId } = useUser();
  const { searchedRecipes } = useRecipe();
  const [recipeCount, setRecipeCount] = useState(0);
  const { selectedIngredients, toggleIngredientSelected } = useIngredient();
  const [recetasSaveUser, setRecetasSaveUser] = useState([]);
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  useEffect(() => {
    if (searchedRecipes) {
      const totalRecipes = searchedRecipes.reduce((count, response) => {
        return count + (response.data ? response.data.length : 0);
      }, 0);
      setRecipeCount(totalRecipes);

      // if (totalRecipes === 0) {
      //   console.log("No se encontraron recetas.");
      // } else {
      //   console.log(`Se encontraron ${totalRecipes} recetas.`);
      //   console.log(searchedRecipes);
      // }
    }
  }, [searchedRecipes]);

  const findBookMark = (id) => {
    if (recetasSaveUser.length !== 0) {
      const r = recetasSaveUser.find((item) => item.receta_id === id);
      return !!r;
    }
    return false;
  };
  // Filtrar las recetas por tipo
  const exactRecipes =
    searchedRecipes.find((response) => response.tipo === 'Exacto')?.data || [];
  // console.log(exactRecipes);
  const eqRecipes = searchedRecipes.find((response) => response.tipo === 'Eq')?.data || [];

  return (
    <div className="flex flex-col min-h-screen w-screen overflow-x-hidden">
      <NavBar />
      <div className="flex flex-col flex-grow items-center">
        <Header />
        <div className="w-[90%] flex flex-row items-center mt-10    ">
          <BackToHomeButton text={'Realizar una nueva búsqueda'} navigateTo={'home'} />

          <div className="w-1/3 flex justify-center max-md:w-1/2  ">
            <p className="font-belleza text-[24px] max-md:text-[20px]  text-negro ">
              Resultados: {recipeCount}
            </p>
          </div>
        </div>
        <div className="w-[90%] flex flex-col items-center mt-10">
          {/* Renderizar la lista de recetas exactas */}
          <h2 className="font-belleza text-[20px] text-negro text-left w-full mb-5 ">
            Recetas Exactas
          </h2>
          <section className="w-full flex justify-center">
            {exactRecipes.length !== 0 ? (
              <div className="pb-4 grid grid-cols-4 max-lg:grid-cols-3 grid-flow-row gap-5  overflow-auto   max-md:grid-flow-col  max-md:grid-rows-none max-md:grid-cols-none w-fit mx-auto ">
                {exactRecipes.map((item, index) => (
                  <CardRecipe
                    img={
                      item.img ||
                      'https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg'
                    }
                    time={item.time || 'xx'}
                    porcion={item.porcion || 'x'}
                    dificulty={item.dificultad || 'medio'}
                    fitStep="Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada"
                    name={item.name || 'plato xx'}
                    key={index}
                    idReceta={item.id}
                    date={item.date || 'dd/mm/yyyy'}
                    saveRecipe={userId !== item.user_id}
                    editable={false}
                    SavebookMark={() => findBookMark(item.id)}
                  />
                ))}
              </div>
            ) : (
              <p>No se encontraron recetas exactas.</p>
            )}
          </section>

          {/* Renderizar la lista de recetas similares */}
          <h2 className="font-belleza text-[20px] text-negro text-left w-full  my-5 ">
            Recetas Similares
          </h2>
          <section className="w-full flex justify-center">
            {eqRecipes.length !== 0 ? (
              <div className=" grid grid-cols-4 max-lg:grid-cols-3 max-md:grid-cols-2  grid-flow-row gap-5  overflow-auto   max-sm:grid-flow-col  max-sm:grid-rows-none max-sm:grid-cols-none ">
                {eqRecipes.map((item, index) => (
                  <CardRecipe
                    img={
                      item.img ||
                      'https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg'
                    }
                    time={item.time || 'xx'}
                    porcion={item.porcion || 'x'}
                    dificulty={item.dificultad || 'medio'}
                    fitStep="Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada"
                    name={item.name || 'plato xx'}
                    key={index}
                    idReceta={item.id}
                    date={item.date || 'dd/mm/yyyy'}
                    saveRecipe={userId !== item.user_id}
                    editable={false}
                    SavebookMark={() => findBookMark(item.id)}
                  />
                ))}
              </div>
            ) : (
              <p>No se encontraron recetas similares.</p>
            )}
          </section>
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
