import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { FormCrearIngrediente } from '../components/forms';
import { FormCrearPaso } from '../components/forms';
import { ImageUploaderRecipe } from '../components/uploadImage';
import { useRecipe } from '../hooks/recipeHook';
import { useMessage } from '../hooks/messageHook';
import { useIngredient } from '../hooks/ingredientHook';
import { useStep } from '../hooks/stepHook';
import { TbSquareChevronsRightFilled } from 'react-icons/tb';
import { MdFamilyRestroom } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
import stepService from '../apis/step';
import recipeService from '../apis/recipe';
import ingredientRecipeService from '../apis/ingredientRecipe';
import { useNavigate } from 'react-router-dom';

const CreateRecipe = () => {
  const { listIngredientRecipe, deleteIngredientRecipeOfList, addIngredienteRecipe } =
    useIngredient();
  const { addStepHook, listStep, deleteStepOfList } = useStep();
  const { img } = useRecipe();
  const { showNewMessage } = useMessage();
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  const [inputValues, setInputValues] = useState({
    name: '',
    dificultad: '',
    porcion: '',
    time: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues({
      ...inputValues,
      [name]: value,
    });
  };

  const getTodayDate = () => {
    const today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    const year = today.getFullYear();

    if (day < 10) day = '0' + day;

    if (month < 10) month = '0' + month;

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  };

  const PushDataSteps = async (step, id_receta, num) => {
    try {
      //poner la imagen del paso si hay --
      await stepService.create(num, step.name, step.description, 'ss', id_receta);
    } catch (error) {
      showNewMessage('error', 'Error al crear un paso' + error);
    }
  };

  const PushDataIngredientRecipe = async (ing, id_receta) => {
    try {
      console.log(ing);
      await ingredientRecipeService.create(
        ing.cantidad,
        ing.medicion,
        ing.especificacion,
        ing.id_ingrediente,
        id_receta
      );
    } catch (error) {
      showNewMessage('error', 'Error al asignar un ingrediente a la receta' + error);
    }
  };

  const pushDataRecipe = async (name, time, dificultad, porcion) => {
    try {
      const resReceta = await recipeService.create(
        name,
        'No hay desc',
        img,
        dificultad,
        time,
        porcion,
        getTodayDate()
      );

      if (resReceta?.success === true) {
        listStep.map((step, index) => {
          PushDataSteps(step, resReceta.data.id, index + 1);
        });

        listIngredientRecipe.map((ing) => {
          PushDataIngredientRecipe(ing, resReceta.data.id);
        });
      }

      showNewMessage('success', 'Receta creada con exito');
      navigate(name_proyect + '/home/' + resReceta.data.id);
    } catch (error) {
      showNewMessage('error', 'Error al crear la receta ' + error);
    }
  };

  const handleSubmit = () => {
    if (img === 'https://semantic-ui.com/images/wireframe/image.png') {
      showNewMessage('warning', 'Por favor ingrese una imagen de la receta');
      return;
    }

    if (!inputValues.name) {
      showNewMessage('warning', 'Por favor rellene el campo: Nombre de la receta');
      return;
    }

    if (listIngredientRecipe.length === 0) {
      showNewMessage('warning', 'Por favor ingrese al como minimo 1 un ingrediente');
      return;
    }

    if (listStep.length === 0) {
      showNewMessage('warning', 'Por favor ingrese al como minimo 1 un paso');
      return;
    }

    if (!inputValues.dificultad) {
      showNewMessage('warning', 'Por favor rellene el campo: Dificultad de la receta');
      return;
    }
    if (!inputValues.porcion) {
      showNewMessage(
        'warning',
        'Por favor rellene el campo: Cantidad de porciones de la receta'
      );
      return;
    }

    if (!parseInt(inputValues.porcion) || parseInt(inputValues.porcion) < 0) {
      showNewMessage('warning', 'Porcion ingresado no valida');
      return;
    }

    if (!inputValues.time) {
      showNewMessage('warning', 'Por favor rellene el campo: Tiempo Promedio de la receta');
      return;
    }

    if (!parseInt(inputValues.time) || parseInt(inputValues.time) < 0) {
      showNewMessage('warning', 'Tiempo en minutos ingresado no valida');
      return;
    }
    try {
      pushDataRecipe(
        inputValues.name,
        parseInt(inputValues.time),
        inputValues.dificultad,
        parseInt(inputValues.porcion)
      );
    } catch (error) {
      showNewMessage('error', error);
    }
  };

  return (
    <div className="flex flex-col h-auto w-screen overflow-x-hidden overflow-y-auto">
      <NavBar />
      <div className="w-screen h-[80%] flex flex-col items-center gap-1">
        <section className="w-[60%]">
          <ImageUploaderRecipe />
          <figure className="w-full h-[300px] overflow-hidden relative rounded-md mt-5">
            <img src={img} className="w-full h-full object-cover object-center" />
          </figure>
        </section>
        <section className="w-[60%] flex gap-4 items-center">
          <p className="font-belleza text-[20px] ">Nombre de la receta:</p>
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
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
          <div className="flex justify-center items-center mt-5">
            <div className=" flex flex-col items-center justify-center  gap-1">
              <div className="flex items-center gap-1">
                <TbSquareChevronsRightFilled
                  className="text-lime-400 bg-white"
                  size={'25px'}
                />
                <TbSquareChevronsRightFilled
                  className="bg-white text-yellow-600"
                  size={'25px'}
                />
                <TbSquareChevronsRightFilled className="text-red-600 bg-white" size={'25px'} />
              </div>
              <p className="font-bold font-belleza text-[15px]">DIFICULTAD</p>

              <select
                name="dificultad"
                value={inputValues.dificultad}
                onChange={handleChange}
                className="border border-black  rounded-lg flex items-center  py-2 px-4 font-belleza outline-none"
              >
                <option value="" disabled>
                  Selecciona dificultad
                </option>
                <option value="facil">Fácil</option>
                <option value="medio">Medio</option>
                <option value="dificil">Difícil</option>
              </select>
            </div>

            <div className=" flex flex-col items-center justify-center gap-1 ">
              <div>
                <MdFamilyRestroom className="text-yellow-600" size={'30px'} />
              </div>
              <p className="font-bold font-belleza text-[15px]">PORCIÓN</p>

              <input
                type="number"
                min="0"
                name="porcion"
                value={inputValues.porcion || ''}
                onChange={handleChange}
                placeholder="Porción"
                className="border border-black  rounded-lg flex items-center  py-2 px-4 font-belleza outline-none w-1/2 "
              />
            </div>
            <div className=" flex flex-col items-center justify-center gap-1">
              <MdAccessTimeFilled className="text-yellow-600" size={'30px'} />

              <p className="font-bold font-belleza text-[15px]">TIEMPO (min)</p>
              <input
                type="number"
                name="time"
                min="0"
                max="1440"
                value={inputValues.time}
                onChange={handleChange}
                className="border border-black   rounded-lg flex items-center  py-2 px-4 font-belleza outline-none  "
              />
            </div>
          </div>
        </section>

        <button
          className="bg-naranja py-3 px-32 rounded-2xl text-white mt-10 hover:bg-red-500 mr-10"
          onClick={handleSubmit}
        >
          Crear Receta
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CreateRecipe;
