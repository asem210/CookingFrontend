import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import CardRecipe from '../components/CardRecipe';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Loading from '../components/Loading';
import { useUser } from '../hooks/userHook';
import recipeService from '../apis/recipe';
import { ExistPanelRecip } from '../components/ExistPanel';
import saveRecipeService from '../apis/saveRecipe';

const UserFavoriteRecipe = () => {
  const { userId } = useUser();
  const [showPanelExist, setshowPanelExist] = useState(false);
  const [recetasSaveUser, setRecetasSaveUser] = useState([]);

  useEffect(() => {
    const callRecipes = async () => {
      try {
        const resSaveRecipe = await saveRecipeService.getSaveRecipe();
        if (resSaveRecipe.success === true) {
          setRecetasSaveUser(resSaveRecipe.data);
        }
        if (resSaveRecipe.data.length === 0) {
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
      {recetasSaveUser.length !== 0 ? (
        <div className="w-screen h-[80%]  min-h-[78vh] flex flex-col items-center gap-5">
          <section className="w-3/5   items-center justify-center flex flex-col mt-10">
            <p className="font-belleza text-[18px] ">Encuentra la receta</p>
            <div className="w-1/2  my-2 flex items-center relative">
              <input className="border border-black rounded-md  p-1.5 w-full  "></input>
              <HiMagnifyingGlass className="absolute left-[92%]" />
            </div>
          </section>
          <section className="w-4/5 ">
            <div className="grid grid-cols-4 grid-flow-row gap-5">
              {recetasSaveUser.map((item, index) => {
                return (
                  <CardRecipe
                    img={item.receta.img}
                    time={item.receta.time}
                    porcion={item.receta.porcion}
                    dificulty={item.receta.dificultad}
                    fitStep="Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada"
                    name={item.receta.name}
                    key={index}
                    idReceta={item.receta.id}
                    date={item.receta.date}
                    saveRecipe={true}
                    editable={false}
                    SavebookMark={true}
                  ></CardRecipe>
                );
              })}
            </div>
          </section>
        </div>
      ) : (
        <div className="min-h-[77vh] items-center flex justify-center">
          {showPanelExist ? (
            <div className="flex flex-col items-center">
              <ExistPanelRecip title="No tiene recetas creadas"></ExistPanelRecip>
              <button
                className="bg-naranja py-3 px-8 rounded-2xl text-white mt-4 hover:bg-red-500 mr-10"
                onClick={() => {
                  navigate(name_proyect + '/recipe/create');
                }}
              >
                No tiene asignado ninguna receta en favoritos
              </button>
            </div>
          ) : (
            <Loading size={90}></Loading>
          )}
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};

export default UserFavoriteRecipe;
