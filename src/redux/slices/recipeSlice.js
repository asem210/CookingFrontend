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
  creatorName: '',
  listIngredientOfRecipe: [],
  listStepOfRecipe: [],
  imgUpload: 'https://semantic-ui.com/images/wireframe/image.png',

  editDataRecipe: {
    id: '',
    name: '',
    dificultad: '',
    porcion: '',
    time: '',
    date: '',
  },
  searchedRecipes: [],
};

export const recipeSlice = createSlice({
  name: 'recipe',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { id, name, description, img, dificultad, porcion, time, date, creatorName } =
        action.payload;
      state.name = name;
      state.description = description;
      state.img = img;
      state.dificultad = dificultad;
      state.porcion = porcion;
      state.time = time;
      state.date = date;
      state.id = id;
      state.creatorName = creatorName;
    },

    addDataEdit: (state, action) => {
      state.editDataRecipe = action.payload;
    },
    clearDataEdit: (state) => {
      state.editDataRecipe = initialState.editDataRecipe;
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
      state.imgUpload = 'https://semantic-ui.com/images/wireframe/image.png';
      state.listIngredientOfRecipe = [];
      state.listStepOfRecipe = [];
    },

    changeImg: (state, action) => {
      state.imgUpload = action.payload;
    },

    searchRecipesByIngredient: (state, action) => {
      state.searchedRecipes = action.payload;
    },

    clearSearchResults: (state) => {
      state.searchedRecipes = [];
    },
  },
});

export const {
  addItem,
  changeImg,
  clearState,
  addAllListIngredient,
  addAllListStep,
  addDataEdit,
  clearDataEdit,
  searchRecipesByIngredient,
  clearSearchResults,
} = recipeSlice.actions;
export default recipeSlice.reducer;
