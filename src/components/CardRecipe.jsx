import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import { LuClock4 } from 'react-icons/lu';
import { IoBookmarkOutline } from 'react-icons/io5';
import { FcBookmark } from 'react-icons/fc';
import { TbAntennaBars1 } from 'react-icons/tb';
import { useRecipe } from '../hooks/recipeHook';
import { useIngredient } from '../hooks/ingredientHook';
import stepService from '../apis/step';
import recipeService from '../apis/recipe';
import ingredientRecipeService from '../apis/ingredientRecipe';
import { useStep } from '../hooks/stepHook';
import ModalDelete from './ModalDelete';
import saveRecipeService from '../apis/saveRecipe';
import { useAuth } from '../hooks/authHook';
import { useMessage } from '../hooks/messageHook';

const CardRecipe = ({
  img = 'https://static.vecteezy.com/system/resources/previews/004/639/366/non_2x/error-404-not-found-text-design-vector.jpg',
  time = 'xx',
  porcion = 'x',
  name = 'plato xx',
  date = 'dd/mm/yyyy',
  description = 'Para el pollo, mezcla la sal con ajo, la pimienta, 1 taza de fécula, la harina, los huevos y la Leche Evaporada ',
  dificulty = 'medio',
  idReceta,
  SavebookMark = false,
  saveRecipe = true,
  editable = false,
}) => {
  const [showCard, setShowCard] = useState(true);
  const { changeImgRecipe, addItemDataEdit } = useRecipe();
  const [bookmarkSave, setBookmarkSave] = useState(SavebookMark);
  const navigate = useNavigate();
  const [isdisplayed, setisdisplayed] = useState(false);
  const name_proyect = import.meta.env.VITE_NAME_PAGE;
  const { addAllListIngredientRecipeHook } = useIngredient();
  const { addAllListStepHook } = useStep();
  const [showModal, setShowModal] = useState(false);
  const { status } = useAuth();
  const { showNewMessage } = useMessage();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onhandleClick = (id) => {
    const deleteRecipe = async (id) => {
      try {
        await stepService.deleteStepsOfRecipe(id);
        await ingredientRecipeService.deleteIngsOfRecipe(id);
        await recipeService.deleteRecipe(id);
      } catch (error) {
        console.log(error.message);
      } finally {
        setShowCard(false);
      }
    };
    deleteRecipe(id);
  };

  const toggleIsDisplayed = (event) => {
    event.preventDefault();
    setisdisplayed((prevIsDisplayed) => !prevIsDisplayed);
  };

  const callPartsRecipe = async () => {
    const resIngredient = await ingredientRecipeService.getOfRecipe(idReceta);
    if (resIngredient) {
      resIngredient.data.map((item) => {
        item.name = item.ingrediente.name;
      });
      addAllListIngredientRecipeHook(resIngredient.data ?? []);
    }

    const resStep = await stepService.getOfRecipe(idReceta);
    if (resStep) {
      addAllListStepHook(resStep.data ?? []);
    }
  };

  const handleClickBookMark = (id) => {
    if (!status) {
      showNewMessage('warning', 'Necesita iniciar sesión');
      return;
    }

    const saveRecipe = async (id) => {
      try {
        await saveRecipeService.create(id);
      } catch (error) {
        console.log(error.message);
      } finally {
        setBookmarkSave(true);
      }
    };
    saveRecipe(id);
  };

  const handleClickBookMarkNo = (id) => {
    const unsaveRecipe = async (id) => {
      try {
        await saveRecipeService.delete(id);
      } catch (error) {
        console.log(error.message);
      } finally {
        setBookmarkSave(false);
      }
    };
    unsaveRecipe(id);
  };

  const handleClick = () => {
    try {
      callPartsRecipe();
      addItemDataEdit(idReceta, name, dificulty, porcion, time, date, description);
      changeImgRecipe(img);
    } catch (error) {
      console.log(error);
    } finally {
      navigate(name_proyect + '/recipe/edit');
    }
  };

  if (!showCard) {
    return <></>;
  }
  return (
    <div className="rounded-xl border shadow-md max-h-[300px] overflow-hidden max-md:min-w-[50vw] pb-4">
      <ModalDelete
        show={showModal}
        onClose={toggleModal}
        message={'¿Estas seguro de eliminar esta receta?, no hay vuelta atras'}
        onsubmit={onhandleClick}
        id_delete={idReceta}
      ></ModalDelete>
      <figure className="relative overflow-hidden items-center justify-center flex h-1/2 w-full rounded-t-xl  ">
        <img src={img} className="h-full w-full filter brightness-75  " />

        {saveRecipe &&
          (bookmarkSave ? (
            <FcBookmark
              className="absolute text-naranja top-1 left-1 cursor-pointer"
              size={'30px'}
              onClick={() => {
                handleClickBookMarkNo(idReceta);
              }}
            />
          ) : (
            <IoBookmarkOutline
              className="absolute text-naranja top-1 left-1 cursor-pointer"
              size={'30px'}
              onClick={() => {
                handleClickBookMark(idReceta);
              }}
            />
          ))}

        {editable && (
          <div className="absolute top-[-10%]  left-[80%]">
            <TbAntennaBars1
              className=" text-white  cursor-pointer"
              size={'50px'}
              onClick={toggleIsDisplayed}
            />
            {isdisplayed && (
              <ul className="absolute left-[-75%] rounded-md overflow-hidden">
                <li
                  className="bg-white px-3 py-1 text-center hover:bg-slate-100 cursor-pointer"
                  onClick={handleClick}
                >
                  Editar
                </li>
                <li
                  className="bg-white px-3 py-1 text-center hover:bg-slate-100 cursor-pointer"
                  onClick={toggleModal}
                >
                  Eliminar
                </li>
              </ul>
            )}
          </div>
        )}

        <p className="absolute text-white font-belleza  top-[75%]  left-[5%] text-[17px]">
          {dificulty}
        </p>
        <div className="absolute text-white font-belleza items-center gap-2 flex top-[75%]  left-[65%] ">
          <LuClock4 />
          <p className="text-[18px]"> {time + ' min.'}</p>
        </div>
      </figure>
      <div className="mt-2 h-fit ">
        <div className="font-belleza ">
          <div className="flex justify-around font-belleza items-center">
            <p className="font-semibold text-[16px]  w-1/2  h-5  overflow-hidden"> {name}</p>
            <p className="font-semibold">Porciones: {porcion} </p>
          </div>
          <p className="text-[12px] mx-5 mt-2 max-h-14 overflow-hidden ">{description}</p>
        </div>
        <div
          className="font-belleza text-naranja flex items-center justify-center gap-2 mt-2 hover:text-orange-400 cursor-pointer"
          onClick={() => {
            navigate(name_proyect + '/home/' + idReceta);
          }}
        >
          <p>Ir a la receta</p>
          <FaArrowRight size={'28px'} />
        </div>
      </div>
    </div>
  );
};

export default CardRecipe;
