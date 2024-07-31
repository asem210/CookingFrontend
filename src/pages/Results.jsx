import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import Header from '../components/Header';
import { ExistPanelRecip } from '../components/ExistPanel';
import { useRecipe } from '../hooks/recipeHook';
import { useNavigate } from 'react-router-dom';
const Results = () => {
  const { searchedRecipes } = useRecipe();
  const [recetas, setRecetas] = useState([]);
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const navigate = useNavigate();

  useEffect(() => {
    setRecetas(searchedRecipes);
  }, [searchedRecipes]);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className="w-screen h-[80%] flex flex-col items-center gap-5">
        <Header />
        <section className="w-4/5 min-h-[59vh]">
          {recetas.length !== 0 ? (
            <div className="pb-4 grid grid-cols-4 max-lg:grid-cols-3 grid-flow-row gap-5  overflow-auto   max-md:grid-flow-col  max-md:grid-rows-none max-md:grid-cols-none w-fit mx-auto">
              {recetas.map((item, index) => {
                return (
                  <CardRecipe
                    img={item.img}
                    time={item.time}
                    porcion={item.porcion}
                    dificulty={item.dificultad}
                    fitStep="Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada"
                    name={item.name}
                    key={index}
                    idReceta={item.id}
                    date={item.date}
                    saveRecipe={false}
                    editable={false}
                    SavebookMark={false}
                  ></CardRecipe>
                );
              })}
            </div>
          ) : (
            <div className="min-h-[30vh] items-center flex justify-center">
              <div className="flex flex-col items-center">
                <ExistPanelRecip title="No se encontraron recetas con ese nombre"></ExistPanelRecip>
                <button
                  className="bg-naranja py-3 px-8 rounded-2xl text-white mt-10 hover:bg-red-500 mr-10"
                  onClick={() => {
                    navigate(name_proyect + '/home');
                  }}
                >
                  Ir al Inicio
                </button>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Results;
