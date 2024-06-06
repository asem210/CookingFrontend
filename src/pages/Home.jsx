import React, { useState } from 'react';
import images from '../constants/images';
import CardCollectionIngredients from '../components/CardCollectionIngredients';
const Home = () => {
  const getObjectById = (id) => {
    return images.find((item) => item.id === id);
  };

  const logo = getObjectById(3);
  const step1 = getObjectById(4);
  const step2 = getObjectById(1);
  const step3 = getObjectById(2);

  const ingredientes = [
    { name: 'Tomate', img: 'https://freesvg.org/img/tomate-2010.png', id: 1 },
    {
      name: 'Lechuga',
      img: 'https://i0.wp.com/procamp.cl/wp-content/uploads/2020/07/lechuga-espanola.png',
      id: 2,
    },
    {
      name: 'Queso789',
      img: 'https://covica.es/wp-content/uploads/2022/11/QUESOS_36-removebg-preview.png',
      id: 3,
    },
    {
      name: 'Queso456',
      img: 'https://covica.es/wp-content/uploads/2022/11/QUESOS_36-removebg-preview.png',
      id: 4,
    },
    {
      name: 'Queso123',
      img: 'https://covica.es/wp-content/uploads/2022/11/QUESOS_36-removebg-preview.png',
      id: 4,
    },
    {
      name: 'Queaaso',
      img: 'https://covica.es/wp-content/uploads/2022/11/QUESOS_36-removebg-preview.png',
      id: 5,
    },
    {
      name: 'Quesoaa',
      img: 'https://covica.es/wp-content/uploads/2022/11/QUESOS_36-removebg-preview.png',
      id: 6,
    },
  ];

  return (
    <div className="flex flex-col h-screen w-screen overflow-x-hidden">
      <div className="nav w-screen  bg-red-200 h-[10%]">NAV</div>
      <div className=" w-screen h-[80%] flex flex-col items-center">
        <h2 className="font-belleza text-[30px] ">Bienvenido a </h2>
        <p className="font-belleza text-[18px] ">
          Encuentra la receta perfecta con los ingredientes que tienes en casa
        </p>
        <input className="border border-black rounded-md  p-1.5  w-1/4 my-2 "></input>

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
          <div className="w-1/4 h-full flex flex-col  justify-end  items-center">
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
        <div className="grid grid-cols-2 grid-flow-row   w-[70%] gap-4 mt-2">
          <CardCollectionIngredients title="Verduras" ingredientes={ingredientes} />
          <CardCollectionIngredients title="Verduras" ingredientes={ingredientes} />
          <CardCollectionIngredients title="Verduras" ingredientes={ingredientes} />
        </div>
      </div>
      {/* <div className="nav w-screen  h-[10%] bg-[#1D3139]"> FOOTER</div> */}
    </div>
  );
};

export default Home;
