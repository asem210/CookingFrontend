import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { MdOutlineDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { FormCrearIngrediente } from '../components/forms';
// import { useMessage } from '../hooks/messageHook';
import { useIngredient } from '../hooks/ingredientHook';
import { FormCrearPaso } from '../components/forms';
import { useStep } from '../hooks/stepHook';
const CreateRecipe = () => {
  const [imagen, setImagen] = useState('https://semantic-ui.com/images/wireframe/image.png');
  const { listIngredientRecipe, deleteIngredientRecipeOfList, addIngredienteRecipe } =
    useIngredient();
  const { addStepHook, listStep, deleteStepOfList } = useStep();
  return (
    <div className="flex flex-col h-auto w-screen overflow-x-hidden overflow-y-auto">
      <NavBar />
      <div className="w-screen h-[80%] flex flex-col items-center gap-1">
        <section className="w-[60%]">
          <div className="flex gap-5 items-center mb-2">
            <p className="font-belleza">Previsualización de la receta:</p>
            <button className="font-belleza bg-gray-600 text-white rounded-md py-1 px-3 hover:bg-gray-500">
              Subir Imagen
            </button>
          </div>
          <figure className="w-full h-[300px] overflow-hidden relative rounded-md">
            <img src={imagen} className="w-full h-full object-cover object-center" />
          </figure>
        </section>
        <section className="w-[60%] flex gap-4 items-center">
          <p className="font-belleza text-[20px]">Nombre de la receta:</p>
          <input
            placeholder="Ingrese el nombre de la receta"
            className="py-1 px-3 w-1/2 font-bold font-belleza text-[24px]"
          />
        </section>
        <section className="w-[60%] flex flex-col">
          <p className="font-belleza text-[20px]">Ingredientes:</p>
          <FormCrearIngrediente />
          <div className="flex w-full justify-center ">
            <ul className="w-3/4 grid  grid-flow-row grid-cols-2  mt-5 p-4  gap-y-1  font-belleza">
              {listIngredientRecipe.map((ingrediente, index) => (
                <li key={index} className="flex gap-2 justify-around hover:text-gray-600">
                  {`${ingrediente.cantidad} ${ingrediente.medicion} de ${ingrediente.name} ${ingrediente.especificacion}`}
                  <div className="flex">
                    <BiEditAlt
                      size={'20px'}
                      className="text-orange-400 cursor-pointer hover:text-orange-600"
                      onClick={() => {
                        addIngredienteRecipe({
                          id: ingrediente.id,
                          cantidad: ingrediente.cantidad,
                          medicion: ingrediente.medicion,
                          especificacion: ingrediente.especificacion,
                          name: ingrediente.name,
                          id_ingrediente: 1,
                        });
                      }}
                    />
                    <MdOutlineDeleteForever
                      size={'20px'}
                      className="text-red-700 cursor-pointer hover:text-red-600"
                      onClick={() => deleteIngredientRecipeOfList(ingrediente.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <section className="w-[60%] flex flex-col">
          <p className="font-belleza text-[20px]">Pasos:</p>

          <FormCrearPaso />
          <div className="flex w-full justify-center  mt-5 ">
            <ul className="w-5/6 grid grid-flow-row ">
              {listStep.map((step, index) => (
                <li
                  key={index}
                  className="flex  justify-around hover:text-gray-600 font-belleza p-3 "
                >
                  <div className="flex items-center  w-full  ">
                    <p className="flex flex-col font-semibold h-full w-1/4  justify-center text-[18px]">{`Paso ${
                      index + 1
                    }: ${step.name} `}</p>

                    <p className="w-3/4  text-sm ml-2">{step.description}</p>
                  </div>

                  <div className="flex items-center  h-full gap-2 ml-2">
                    <BiEditAlt
                      size={'30px'}
                      className="text-orange-400 cursor-pointer hover:text-orange-600"
                      onClick={() => {
                        addStepHook({
                          id: step.id,
                          name: step.name,
                          description: step.description,
                          number: index + 1,
                        });
                      }}
                    />
                    <MdOutlineDeleteForever
                      size={'30px'}
                      className="text-red-700 cursor-pointer hover:text-red-600 "
                      onClick={() => deleteStepOfList(step.id)}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="w-[60%] flex flex-col">
          <p className="font-belleza text-[20px]">Extras:</p>
          <div className="flex">
            <input
              placeholder="Ingrese el nombre de la receta"
              className="py-1 px-3 w-1/2 font-bold font-belleza text-[20px]"
            />
            <input
              placeholder="Ingrese el nombre de la receta"
              className="py-1 px-3 w-1/2 font-bold font-belleza text-[20px]"
            />
            <input
              placeholder="Ingrese el nombre de la receta"
              className="py-1 px-3 w-1/2 font-bold font-belleza text-[20px]"
            />
          </div>
        </section>

        <button className="bg-naranja py-3 px-32 rounded-2xl text-white mt-10 hover:bg-red-500 mr-10">
          Crear Receta
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CreateRecipe;
