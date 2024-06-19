import { useDispatch, useSelector } from 'react-redux';
import {
  changeImg,
  clearState,
  addItem,
  addAllListIngredient,
  addAllListStep,
  addDataEdit,
  clearDataEdit,
} from '../redux/slices/recipeSlice';

export const useRecipe = () => {
  const {
    name,
    description,
    img,
    dificultad,
    porcion,
    time,
    date,
    listIngredientOfRecipe,
    listStepOfRecipe,
    id,
    imgUpload,
    editDataRecipe,
  } = useSelector((state) => state.recipe);

  const dispatch = useDispatch();

  const addItemRecipe = (name, description, img, dificultad, porcion, time, date, id) => {
    dispatch(addItem({ name, description, img, dificultad, porcion, time, date, id }));
  };

  const addItemDataEdit = (id, name, dificultad, porcion, time, date) => {
    dispatch(addDataEdit({ id, name, dificultad, porcion, time, date }));
  };

  const addAllListIngredientRecipeHook = (ing) => {
    dispatch(addAllListIngredient(ing));
  };
  const addAllListStepRecipeHook = (step) => {
    dispatch(addAllListStep(step));
  };

  const changeImgRecipe = (img) => {
    dispatch(changeImg(img));
  };

  const clearStateRecipe = () => {
    dispatch(clearState());
  };

  const clearStateDataEdit = () => {
    dispatch(clearDataEdit());
  };

  return {
    //properties
    id,
    name,
    description,
    img,
    imgUpload,
    dificultad,
    porcion,
    time,
    date,
    listIngredientOfRecipe,
    listStepOfRecipe,
    editDataRecipe,
    // functions
    addItemRecipe,
    clearStateRecipe,
    changeImgRecipe,
    addAllListIngredientRecipeHook,
    addAllListStepRecipeHook,
    addItemDataEdit,
    clearStateDataEdit,
  };
};
