import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import images from '../constants/images';
import { useUser } from '../hooks/userHook';
import recipeService from '../apis/recipe';
import { ExistPanelRecip } from '../components/ExistPanel';
import Loading from '../components/Loading';
import saveRecipeService from '../apis/saveRecipe';

const Results = () => {
  const { userId } = useUser();
  const [recetas, setRecetas] = useState([]);
  const [showPanelExist, setshowPanelExist] = useState(false);
  const [recetasSaveUser, setRecetasSaveUser] = useState([]);

  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };
  const gif = getObjectById(5);

  const findBookMark = (id) => {
    if (recetasSaveUser.length !== 0) {
      const r = recetasSaveUser.find((item) => item.receta_id === id);
      return !!r;
    }
    return false;
  };

  useEffect(() => {
    const callRecipes = async () => {
      try {
        const recipesUser = await recipeService.getAll();
        if (recipesUser.success === true) {
          setRecetas(recipesUser.data);
        }
        const resSaveRecipe = await saveRecipeService.getSaveRecipe();
        console.log(resSaveRecipe);
        if (resSaveRecipe.success === true) {
          setRecetasSaveUser(resSaveRecipe.data);
        }

        if (recipesUser.data.length === 0) {
          setTimeout(() => {
            setshowPanelExist(true);
          }, 1000);
        }
      } catch (error) {
        console.log(error);
      }
    };

    callRecipes();
  }, []);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      <div className="w-screen h-[80%] flex flex-col items-center gap-5">
        <section className="w-3/5   items-center justify-center flex flex-col">
          <h2 className="font-belleza text-[30px] ">Bienvenido a </h2>
          <figure className="overflow-y-hidden  items-center justify-center flex h-20 w-full mt-[-10px]">
            <img src={gif.link} alt="Loading..." className="h-[400%] " />
          </figure>

          <p className="font-belleza text-[18px] ">
            Encuentra la receta perfecta con los ingredientes que tienes en casa
          </p>
          <div className="w-1/2  my-2 flex items-center relative">
            <input className="border border-black rounded-md  p-1.5 w-full  "></input>
            <HiMagnifyingGlass className="absolute left-[92%]" />
          </div>
        </section>
        <section className="w-4/5 min-h-[47vh]">
          {recetas.length !== 0 ? (
            <div className="grid grid-cols-4 grid-flow-row gap-5">
              {recetasSaveUser.length !== 0 &&
                recetas.map((item, index) => {
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
                      saveRecipe={userId !== item.user_id}
                      editable={false}
                      SavebookMark={() => {
                        return findBookMark(item.id);
                      }}
                    ></CardRecipe>
                  );
                })}
            </div>
          ) : (
            <div className="min-h-[47vh] items-center flex justify-center">
              {showPanelExist ? (
                <div className="flex flex-col items-center">
                  <ExistPanelRecip title="No Existen recetes, se el primero en crearlas"></ExistPanelRecip>
                  <button
                    className="bg-naranja py-3 px-8 rounded-2xl text-white mt-4 hover:bg-red-500 mr-10"
                    onClick={() => {
                      navigate(name_proyect + '/recipe/create');
                    }}
                  >
                    Crear una receta
                  </button>
                </div>
              ) : (
                <Loading size={90}></Loading>
              )}
            </div>
          )}
        </section>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default Results;
