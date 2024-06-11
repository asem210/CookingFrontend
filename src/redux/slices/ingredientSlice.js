import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  ingrediente: {},

  listIngredient: [],

  ingredienteRecipe: {},

  listIngredientRecipe: [],
};

export const ingredientSlice = createSlice({
  name: 'ingredient',
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingrediente = action.payload;
    },

    addIngredientRecipe: (state, action) => {
      state.ingredienteRecipe = action.payload;
    },

    clearIngredientRecipe: (state) => {
      state.ingredienteRecipe = {};
    },

    removeListIngredient: (state, action) => {
      const { id } = action.payload;
      state.listIngredient = state.listIngredient.filter((ingredient) => ingredient.id !== id);
    },
    removeListIngredientRecipe: (state, action) => {
      const { id } = action.payload;
      state.listIngredientRecipe = state.listIngredientRecipe.filter(
        (ingredientRecipe) => ingredientRecipe.id !== id
      );
    },

    addListIngredient: (state, action) => {
      const index = state.listIngredient.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      if (index !== -1) {
        state.listIngredient[index] = action.payload;
      } else {
        state.listIngredient.push(action.payload);
      }
    },

    addListIngredientRecipe: (state, action) => {
      console.log(action.payload);
      const index = state.listIngredientRecipe.findIndex(
        (ingredientRecipe) => ingredientRecipe.id === action.payload.id
      );

      if (index !== -1) {
        state.listIngredientRecipe[index] = action.payload;
      } else {
        state.listIngredientRecipe.push(action.payload);
      }
    },
  },
});

export const {
  addIngredient,
  addIngredientRecipe,
  addListIngredient,
  addListIngredientRecipe,
  removeListIngredient,
  removeListIngredientRecipe,
  clearIngredientRecipe,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
