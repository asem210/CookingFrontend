import { useDispatch, useSelector } from 'react-redux';
import {
  changeImg,
  clearState,
  addItem,
  addAllListIngredient,
  addAllListStep,
  addDataEdit,
  clearDataEdit,
  searchRecipesByIngredient,
  clearSearchResults,
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
    creatorName,
    imgUpload,
    editDataRecipe,
    searchedRecipes,
  } = useSelector((state) => state.recipe);

  const dispatch = useDispatch();

  const addItemRecipe = (
    name,
    description,
    img,
    dificultad,
    porcion,
    time,
    date,
    id,
    creatorName
  ) => {
    dispatch(
      addItem({ name, description, img, dificultad, porcion, time, date, id, creatorName })
    );
  };

  const addItemDataEdit = (id, name, dificultad, porcion, time, date) => {
    dispatch(addDataEdit({ id, name, dificultad, porcion, time, date }));
  };

  const saveSearchedRecipes = (recipe) => {
    dispatch(searchRecipesByIngredient(recipe));
  };

  const clearSearch = () => {
    dispatch(clearSearchResults());
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
    creatorName,
    listIngredientOfRecipe,
    listStepOfRecipe,
    editDataRecipe,
    searchedRecipes,
    // functions
    addItemRecipe,
    clearStateRecipe,
    changeImgRecipe,
    addAllListIngredientRecipeHook,
    addAllListStepRecipeHook,
    addItemDataEdit,
    clearStateDataEdit,
    saveSearchedRecipes,
    clearSearch,
  };
};
