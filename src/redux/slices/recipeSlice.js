import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  description: '',
  img: 'https://semantic-ui.com/images/wireframe/image.png',
  dificultad: '',
  porcion: '',
  time: '',
  date: '',
  id: '',
  listIngredientOfRecipe: [],
  listStepOfRecipe: [],
  imgUpload: 'https://semantic-ui.com/images/wireframe/image.png',
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, description, img, dificultad, porcion, time, date } = action.payload;
      state.name = name;
      state.description = description;
      state.img = img;
      state.dificultad = dificultad;
      state.porcion = porcion;
      state.time = time;
      state.date = date;
      state.id = id;
    },

    addAllListIngredient: (state, action) => {
      state.listIngredientOfRecipe = action.payload;
    },
    addAllListStep: (state, action) => {
      state.listStepOfRecipe = action.payload;
    },

    clearState: (state) => {
      state.name = '';
      state.description = '';
      state.img = 'https://semantic-ui.com/images/wireframe/image.png';
      state.dificultad = '';
      state.porcion = '';
      state.time = '';
      state.date = '';
    },

    changeImg: (state, action) => {
      state.imgUpload = action.payload;
    },
  },
});

export const { addItem, changeImg, clearState, addAllListIngredient, addAllListStep } =
  recipeSlice.actions;
export default recipeSlice.reducer;
