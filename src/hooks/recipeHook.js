import { useDispatch, useSelector } from 'react-redux';
import {
  changeImg,
  clearState,
  addItem,
  addAllListIngredient,
  addAllListStep,
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
  } = useSelector((state) => state.recipe);

  const dispatch = useDispatch();

  const addItemRecipe = (name, description, img, dificultad, porcion, time, date, id) => {
    dispatch(addItem({ name, description, img, dificultad, porcion, time, date, id }));
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

  return {
    //properties
    id,
    name,
    description,
    img,
    dificultad,
    porcion,
    time,
    date,
    listIngredientOfRecipe,
    listStepOfRecipe,
    // functions
    addItemRecipe,
    clearStateRecipe,
    changeImgRecipe,
    addAllListIngredientRecipeHook,
    addAllListStepRecipeHook,
  };
};
