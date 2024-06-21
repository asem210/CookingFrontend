import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingrediente: {},

  listIngredient: [],

  ingredienteRecipe: {},

  listIngredientRecipe: [],

  selectedIngredients: [], // Nuevo estado para los ingredientes seleccionados
};

export const ingredientSlice = createSlice({
  name: "ingredient",
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

    clearIngredient: (state) => {
      state.ingrediente = {};
    },

    removeListIngredient: (state, action) => {
      const { id } = action.payload;
      state.listIngredient = state.listIngredient.filter(
        (ingredient) => ingredient.id !== id
      );
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

    toggleIngredientSelection: (state, action) => {
      const index = state.selectedIngredients.findIndex(
        (ingredient) => ingredient.id === action.payload.id
      );

      if (index !== -1) {
        // Si el ingrediente ya está seleccionado, lo eliminamos
        state.selectedIngredients.splice(index, 1);
      } else {
        // Si el ingrediente no está seleccionado, lo agregamos
        state.selectedIngredients.push(action.payload);
      }
    },

    addAllListIngredient: (state, action) => {
      state.listIngredient = action.payload;
    },

    addAllListIngredientRecipe: (state, action) => {
      state.listIngredientRecipe = action.payload;
    },

    clearAllListIngredientRecipe: (state) => {
      state.listIngredientRecipe = [];
    },

    addListIngredientRecipe: (state, action) => {
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
  clearIngredient,
  addAllListIngredient,
  addAllListIngredientRecipe,
  clearAllListIngredientRecipe,
  toggleIngredientSelection,
} = ingredientSlice.actions;
export default ingredientSlice.reducer;
