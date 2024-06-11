import { useDispatch, useSelector } from 'react-redux';
import {
  addIngredient,
  addIngredientRecipe,
  addListIngredient,
  addListIngredientRecipe,
  ingredientSlice,
  removeListIngredient,
  removeListIngredientRecipe,
  clearIngredientRecipe,
} from '../redux/slices/ingredientSlice';

export const useIngredient = () => {
  const { ingrediente, listIngredient, listIngredientRecipe, ingredienteRecipe } = useSelector(
    (state) => state.ingredient
  );

  const dispatch = useDispatch();

  const addIngredienteRecipe = (ing) => {
    dispatch(addIngredientRecipe(ing));
  };

  const clearIngredientRecipe = () => {
    dispatch(addIngredientRecipe());
  };

  const addIngredientRecipeToList = (ing) => {
    dispatch(addListIngredientRecipe(ing));
  };

  const deleteIngredientRecipeOfList = (id) => {
    dispatch(removeListIngredientRecipe({ id }));
  };

  return {
    //properties
    ingrediente,
    listIngredient,
    listIngredientRecipe,
    ingredienteRecipe,
    //functions
    addIngredientRecipeToList,
    deleteIngredientRecipeOfList,
    addIngredienteRecipe,
    clearIngredientRecipe,
  };
};
