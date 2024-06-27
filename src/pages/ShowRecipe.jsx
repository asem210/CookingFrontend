import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
//import components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import { ExistPanelRecip } from '../components/ExistPanel';
//import react icons
import { TbSquareChevronsRightFilled } from 'react-icons/tb';
import { MdFamilyRestroom } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import { HiMiniArrowLongLeft } from 'react-icons/hi2';
//import hooks
import { useRecipe } from '../hooks/recipeHook';
import { useMessage } from '../hooks/messageHook';
//import utils and helpers
import { callRecipe } from '../helpers/stateHelper';

const ShowRecipe = () => {
  const { id } = useParams();
  const [existRecipe, setexistRecipe] = useState(false);
  const [showPanelExist, setshowPanelExist] = useState(false);
  const {
    name,
    description,
    img,
    time,
    porcion,
    dificultad,
    date,
    creatorName,
    listIngredientOfRecipe,
    listStepOfRecipe,
    addItemRecipe,
    addAllListIngredientRecipeHook,
    addAllListStepRecipeHook,
  } = useRecipe();

  const { showNewMessage } = useMessage();
  useEffect(() => {
    callRecipe(
      id,
      showNewMessage,
      addItemRecipe,
      addAllListIngredientRecipeHook,
      addAllListStepRecipeHook,
      setexistRecipe,
      setshowPanelExist
    );
  }, []);

  return (
    <div className="container-page">
      <NavBar></NavBar>
      {existRecipe ? (
        <div className="w-screen h-[80%] flex flex-col items-center gap-3">
          <section className="w-[80%] max-lg:w-4/5 mt-5 ">
            <div
              className="flex  items-center gap-2 hover:text-gray-700 cursor-pointer"
              onClick={() => {
                window.history.back();
              }}
            >
              <HiMiniArrowLongLeft size={'30px'} />
              <p className="font-belleza font-semibold max-md:text-[12px]">Regresar</p>
            </div>
          </section>

          <section className="w-[60%] max-md:w-4/5 ">
            <figure className="w-full h-[300px] overflow-hidden relative rounded-xl mt-5 max-md:h-[250px]   max-sm:h-[180px] ">
              <img src={img} className="w-full h-full object-cover object-center" />
            </figure>
            <div className="font-belleza text-sm mt-2 font-medium flex justify-between max-md:text-[10px]">
              <p>{'Creado por: ' + creatorName}</p>
              <p className="mr-5">{'Fecha de creación: ' + date}</p>
            </div>
          </section>
          <section className="w-[60%] items-center  text-center">
            <p className="font-bold font-belleza text-4xl ">{name}</p>
          </section>
          <section className="w-[40%] items-center  text-start ">
            <p className=" font-belleza text-2xl ">{description || ''}</p>
          </section>
          <section className="w-[60%] flex flex-col max-md:w-4/5  max-sm:w-full">
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
                <p className="font-bold font-belleza text-sm">DIFICULTAD</p>

                <p>{dificultad}</p>
              </div>

              <div className=" flex flex-col items-center justify-center ">
                <div>
                  <MdFamilyRestroom className="text-yellow-600" size={'30px'} />
                </div>
                <p className="font-bold font-belleza text-sm">PORCIÓN</p>

                <p>{porcion}</p>
              </div>
              <div className=" flex flex-col items-center justify-center ">
                <MdAccessTimeFilled className="text-yellow-600" size={'30px'} />

                <p className="font-bold font-belleza text-sm">TIEMPO (min)</p>
                <p>{time}</p>
              </div>
            </div>
          </section>
          <section className="w-[60%] flex flex-col  text-center justify-center items-center max-lg:w-3/4 max-md:w-4/5  ">
            <p className="font-belleza text-3xl">Ingredientes:</p>
            <div className="min-h-32 w-full  flex items-center justify-center align-top   ">
              <ul className=" max-xl:gap-x-5 p-5  grid  grid-flow-row grid-cols-2    font-belleza w-[70%]  max-lg:grid-cols-1 max-lg:w-1/2 max-lg:mx-auto   max-sm:w-full ">
                {listIngredientOfRecipe &&
                  listIngredientOfRecipe.map((ingrediente, index) => (
                    <li key={index} className="flex gap-2 text-left text-sm   max-lg:w-full">
                      {` ● ${ingrediente.cantidad} ${ingrediente.medicion} de ${ingrediente.ingrediente.name} ${ingrediente.especificacion}`}
                      {ingrediente.priority === true && ' (escencial)'}
                    </li>
                  ))}
              </ul>
            </div>
          </section>
          <section className="w-[70%] flex flex-col  text-center justify-center items-center max-md:w-4/5">
            <p className="font-belleza text-3xl">Preparación</p>
            <ul className="w-5/6 grid grid-cols-3 grid-flow-row gap-2 max-lg:grid-cols-1 max-sm:w-[95%] ">
              {listStepOfRecipe &&
                listStepOfRecipe.map((step, index) => (
                  <li key={index} className="flex  justify-around  font-belleza p-3 ">
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
