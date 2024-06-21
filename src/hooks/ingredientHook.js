import { useDispatch, useSelector } from "react-redux";
import {
  addIngredient,
  addIngredientRecipe,
  addListIngredient,
  addListIngredientRecipe,
  removeListIngredient,
  removeListIngredientRecipe,
  clearIngredientRecipe,
  clearIngredient,
  addAllListIngredient,
  addAllListIngredientRecipe,
  clearAllListIngredientRecipe,
  toggleIngredientSelection,
} from "../redux/slices/ingredientSlice";

export const useIngredient = () => {
  const {
    ingrediente,
    listIngredient,
    listIngredientRecipe,
    ingredienteRecipe,
    selectedIngredients,
  } = useSelector((state) => state.ingredient);

  const dispatch = useDispatch();

  const addIngredienteRecipe = (ing) => {
    dispatch(addIngredientRecipe(ing));
  };

  const toggleIngredientSelected = (ing) => {
    dispatch(toggleIngredientSelection(ing));
  };

  const addAllListIngredientHook = (ing) => {
    dispatch(addAllListIngredient(ing));
  };

  const clearIngredientRecipeHook = () => {
    dispatch(clearIngredientRecipe());
  };

  const addIngredientRecipeToList = (ing) => {
    dispatch(addListIngredientRecipe(ing));
  };

  const deleteIngredientRecipeOfList = (id) => {
    dispatch(removeListIngredientRecipe({ id }));
  };

  const addIngredienteHook = (ing) => {
    dispatch(addIngredient(ing));
  };

  const clearIngredientHook = () => {
    dispatch(clearIngredient());
  };

  const addIngredientToList = (ing) => {
    dispatch(addListIngredient(ing));
  };

  const deleteIngredientOfList = (id) => {
    dispatch(removeListIngredient({ id }));
  };
  const addAllListIngredientRecipeHook = (ing) => {
    dispatch(addAllListIngredientRecipe(ing));
  };
  const clearAllListIngredientRecipeHook = () => {
    dispatch(clearAllListIngredientRecipe());
  };

  return {
    //properties
    ingrediente,
    listIngredient,
    listIngredientRecipe,
    ingredienteRecipe,
    selectedIngredients,
    //functions
    addIngredientRecipeToList,
    deleteIngredientRecipeOfList,
    addIngredienteRecipe,
    clearIngredientRecipeHook,
    addIngredienteHook,
    deleteIngredientOfList,
    addIngredientToList,
    clearIngredientHook,
    addAllListIngredientHook,
    addAllListIngredientRecipeHook,
    clearAllListIngredientRecipeHook,
    toggleIngredientSelected,
  };
};
