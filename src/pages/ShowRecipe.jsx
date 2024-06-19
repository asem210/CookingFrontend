import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useParams } from 'react-router-dom';
import { useRecipe } from '../hooks/recipeHook';
import recipeService from '../apis/recipe';
import { useMessage } from '../hooks/messageHook';
import { TbSquareChevronsRightFilled } from 'react-icons/tb';
import { MdFamilyRestroom } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import Loading from '../components/Loading';
import { ExistPanelRecip } from '../components/ExistPanel';
import ingredientRecipeService from '../apis/ingredientRecipe';
import stepService from '../apis/step';

const ShowRecipe = () => {
  const { id } = useParams();
  const {
    name,
    img,
    time,
    porcion,
    dificultad,
    date,
    listIngredientOfRecipe,
    listStepOfRecipe,
    addItemRecipe,
    addAllListIngredientRecipeHook,
    addAllListStepRecipeHook,
  } = useRecipe();
  const [existRecipe, setexistRecipe] = useState(false);
  const [showPanelExist, setshowPanelExist] = useState(false);

  const { showNewMessage } = useMessage();
  useEffect(() => {
    const callRecipe = async () => {
      try {
        const res = await recipeService.getOne(id);
        if (res && res?.success === true) {
          const recipe = res.data;
          addItemRecipe(
            recipe.name,
            recipe.description,
            recipe.img,
            recipe.dificultad,
            recipe.porcion,
            recipe.time,
            recipe.date,
            recipe.id
          );

          const resIngredient = await ingredientRecipeService.getOfRecipe(id);

          if (resIngredient) {
            addAllListIngredientRecipeHook(resIngredient.data);
          }

          const resStep = await stepService.getOfRecipe(id);
          if (resStep) {
            addAllListStepRecipeHook(resStep.data);
          }

          setexistRecipe(true);
        } else {
          setTimeout(() => {
            setshowPanelExist(true);
          }, 2000);
        }
      } catch (error) {
        showNewMessage('error', error);
      }
    };
    callRecipe();
  }, []);

  return (
    <div className="flex flex-col  h-auto w-screen overflow-x-hidden overflow-y-auto ">
      <NavBar></NavBar>
      {existRecipe ? (
        <div className="w-screen h-[80%] flex flex-col items-center gap-5">
          <section className="w-[60%]">
            <figure className="w-full h-[300px] overflow-hidden relative rounded-xl mt-5">
              <img src={img} className="w-full h-full object-cover object-center" />
            </figure>
          </section>
          <section className="w-[60%] items-center  text-center">
            <p className="font-bold font-belleza text-[30px] ">{name}</p>
          </section>

          <section className="w-[60%] flex flex-col ">
            <div className="flex justify-evenly items-center mt-5 ">
              <div className=" flex flex-col items-center justify-center  ">
                <div className="flex items-center gap-1">
                  <TbSquareChevronsRightFilled
                    className="text-lime-400 bg-white"
                    size={'25px'}
                  />
                  <TbSquareChevronsRightFilled
                    className="bg-white text-yellow-600"
                    size={'25px'}
                  />
                  <TbSquareChevronsRightFilled
                    className="text-red-600 bg-white"
                    size={'25px'}
                  />
                </div>
                <p className="font-bold font-belleza text-[15px]">DIFICULTAD</p>

                <p>{dificultad}</p>
              </div>

              <div className=" flex flex-col items-center justify-center ">
                <div>
                  <MdFamilyRestroom className="text-yellow-600" size={'30px'} />
                </div>
                <p className="font-bold font-belleza text-[15px]">PORCIÓN</p>

                <p>{porcion}</p>
              </div>
              <div className=" flex flex-col items-center justify-center ">
                <MdAccessTimeFilled className="text-yellow-600" size={'30px'} />

                <p className="font-bold font-belleza text-[15px]">TIEMPO (min)</p>
                <p>{time}</p>
              </div>
            </div>
          </section>
          <section className="w-[60%] flex flex-col  text-center justify-center items-center">
            <p className="font-belleza text-[25px]">Ingredientes:</p>
            <ul className="grid  grid-flow-row grid-cols-2  mt-5 p-4  gap-y-1 font-belleza w-[70%] ">
              {listIngredientOfRecipe &&
                listIngredientOfRecipe.map((ingrediente, index) => (
                  <li key={index} className="flex gap-2 justify-normal ">
                    {` ● ${ingrediente.cantidad} ${ingrediente.medicion} de ${ingrediente.ingrediente.name} ${ingrediente.especificacion}`}
                    {ingrediente.priority === true && ' (escencial)'}
                  </li>
                ))}
            </ul>
          </section>
          <section className="w-[60%] flex flex-col  text-center justify-center items-center">
            <p className="font-belleza text-[25px]">Preparación</p>
            <ul className="w-5/6 grid grid-cols-3 grid-flow-row ">
              {listStepOfRecipe &&
                listStepOfRecipe.map((step, index) => (
                  <li key={index} className="flex  justify-around  font-belleza p-3">
                    <div className="flex  w-full flex-col  text-start ">
                      <p className=" font-semibold  text-[18px]">{`Paso ${step.number}: ${step.name} `}</p>
                      <p className="text-sm  font-belleza">{step.description}</p>
                    </div>
                  </li>
                ))}
            </ul>
          </section>
        </div>
      ) : (
        <div className="min-h-[77vh] items-center flex justify-center">
          {showPanelExist ? (
            <ExistPanelRecip></ExistPanelRecip>
          ) : (
            <Loading size={90}></Loading>
          )}
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};

export default ShowRecipe;
