import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import react icons
import { MdOutlineDeleteForever } from 'react-icons/md';
import { BiEditAlt } from 'react-icons/bi';
import { TbSquareChevronsRightFilled } from 'react-icons/tb';
import { MdFamilyRestroom } from 'react-icons/md';
import { MdAccessTimeFilled } from 'react-icons/md';
// import components
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { FormCrearIngrediente } from '../components/forms';
import { FormCrearPaso } from '../components/forms';
import { ImageUploaderRecipe } from '../components/uploadImage';
//import hooks
import { useRecipe } from '../hooks/recipeHook';
import { useMessage } from '../hooks/messageHook';
import { useIngredient } from '../hooks/ingredientHook';
import { useStep } from '../hooks/stepHook';
//import helpers and utils
import { pushDataRecipeComplete } from '../helpers/stateHelper';
import { capitalize, lowerText } from '../utils/othersUtils';
const CreateRecipe = () => {
  //hooks
  const {
    listIngredientRecipe,
    deleteIngredientRecipeOfList,
    addIngredienteRecipe,
    clearAllListIngredientRecipeHook,
  } = useIngredient();
  const { addStepHook, listStep, deleteStepOfList, clearAllListStepHook } = useStep();
  const { imgUpload, clearStateRecipe } = useRecipe();
  const { showNewMessage } = useMessage();
  //variables
  const navigate = useNavigate();
  const name_proyect = import.meta.env.VITE_NAME_PAGE;

  const [inputValues, setInputValues] = useState({
    name: '',
    description: '',
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

  const handleBeforeUnload = (event) => {
    const message = 'hello unsaved changes. Are you sure you want to leave?';
    event.returnValue = message;
    return message;
  };

  const saveCreateRecipe = async () => {
    const idRecipe = await pushDataRecipeComplete(
      showNewMessage,
      capitalize(inputValues.name),
      capitalize(inputValues.description),
      parseInt(inputValues.time),
      capitalize(inputValues.dificultad),
      parseInt(inputValues.porcion),
      imgUpload,
      listStep,
      listIngredientRecipe
    );

    if (idRecipe !== -1) {
      showNewMessage('success', 'Receta creada con exito');
      navigate(name_proyect + '/home/' + idRecipe);
    }
  };

  const handleSubmit = () => {
    if (imgUpload === 'https://semantic-ui.com/images/wireframe/image.png') {
      showNewMessage('warning', 'Por favor ingrese una imagen de la receta');
      return;
    }

    if (!inputValues.name) {
      showNewMessage('warning', 'Por favor rellene el campo: Nombre de la receta');
      return;
    }

    if (!inputValues.description) {
      showNewMessage('warning', 'Por favor rellene el campo: Decripción de la receta');
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

    saveCreateRecipe();
  };

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);
    clearStateRecipe();
    clearAllListIngredientRecipeHook();
    clearAllListStepHook();

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div className="container-page">
      <NavBar />
      <div className="w-screen h-[80%] flex flex-col items-center gap-1">
        <section className="w-[60%] max-lg:w-4/5 mt-5">
          <ImageUploaderRecipe />
          <figure className="w-full h-[300px] overflow-hidden relative rounded-md mt-5 max-md:h-[200px]">
            <img src={imgUpload} className="w-full h-full object-cover object-center" />
          </figure>
        </section>
        <section className="w-[60%] flex gap-4 items-center mt-3 max-lg:w-4/5 ">
          <p className="font-belleza text-[20px] max-md:text-[15px] ">Nombre de la receta:</p>
          <input
            type="text"
            name="name"
            value={inputValues.name}
            onChange={handleChange}
            placeholder="Ingrese el nombre de la receta"
            className="border border-black  rounded-lg  py-1 px-3 w-2/3 font-bold font-belleza text-[24px] max-md:w-full max-md:text-[20px]"
          />
        </section>
        <section className="w-[60%] flex gap-4 items-center mt-3 max-lg:w-4/5 ">
          <p className="font-belleza text-[17px] max-md:text-[15px] ">
            Descripción de la receta:
          </p>
          <textarea
            type="text"
            name="description"
            value={inputValues.description}
            onChange={handleChange}
            placeholder="Ingrese la descripción de la receta"
            className="border border-black  rounded-lg  py-3 px-3 w-2/3 font-belleza text-[14px] max-md:w-full max-md:text-[12px] min-h-18 content-center "
          />
        </section>

        <section className="w-[60%] flex flex-col  max-lg:w-4/5">
          <p className="font-belleza text-[20px]">Ingredientes:</p>
          <FormCrearIngrediente />
          <div className="flex w-full justify-center ">
            <ul className="w-3/4 grid  grid-flow-row grid-cols-2  mt-5 p-4  gap-y-1  font-belleza max-lg:text-[14px] max-lg:grid-cols-1 max-lg:w-1/2 max-lg:mx-auto   max-sm:w-full ">
              {listIngredientRecipe.map((ingrediente, index) => (
                <li key={index} className="flex gap-2 justify-normal hover:text-gray-600">
                  {`${ingrediente.cantidad} ${ingrediente.medicion} de ${lowerText(
                    ingrediente.name
                  )} ${lowerText(ingrediente.especificacion)} `}
                  {ingrediente.priority === true && '(escencial)'}
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
                          ingrediente_id: 1,
                          priority: ingrediente.priority,
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
        <section className="w-[60%] flex flex-col  max-lg:w-4/5">
          <p className="font-belleza text-[20px]">Pasos:</p>

          <FormCrearPaso />
          <div className="flex w-full justify-center  mt-5 ">
            <ul className="w-5/6 grid grid-flow-row  max-sm:w-full">
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

        <section className="w-[60%] flex flex-col  max-lg:w-4/5 ">
          <p className="font-belleza text-[20px]">Extras:</p>
          <div className="flex justify-center items-center mt-5  max-sm:flex-col  max-sm:gap-y-4 max-sm:items-start  max-sm:mx-auto">
            <div className=" flex flex-col items-center justify-center  gap-1 max-sm:flex-row max-sm:gap-5 ">
              <div className="flex flex-col  w-full items-center ">
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
              </div>
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

            <div className=" flex flex-col items-center justify-center gap-1 max-sm:flex-row max-sm:gap-10   ">
              <div className="flex flex-col items-center w-full max-sm:w-1/4  ">
                <MdFamilyRestroom className="text-yellow-600" size={'30px'} />
                <p className="font-bold font-belleza text-[15px]">PORCIÓN</p>
              </div>

              <input
                type="number"
                min="0"
                name="porcion"
                value={inputValues.porcion || ''}
                onChange={handleChange}
                placeholder="Porción"
                className="border border-black  rounded-lg flex items-center  py-2 px-4 font-belleza outline-none w-1/2  max-sm:w-full"
              />
            </div>

            <div className=" flex flex-col items-center justify-center gap-1 max-sm:flex-row max-sm:gap-4 ">
              <div className="flex flex-col  w-full items-center max-sm:items-start">
                <MdAccessTimeFilled className="text-yellow-600" size={'30px'} />
                <p className="font-bold font-belleza text-[15px]">TIEMPO (min)</p>
              </div>

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
          className="bg-naranja py-3 px-32 rounded-2xl text-white mt-10 hover:bg-red-500 mx-auto"
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
