import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  step: {},

  listStep: [],

  stepRecipe: {},

  listStepRecipe: [],
};

export const stepSlice = createSlice({
  name: 'step',
  initialState,
  reducers: {
    addStep: (state, action) => {
      state.step = action.payload;
    },

    addStepRecipe: (state, action) => {
      state.stepRecipe = action.payload;
    },

    clearStep: (state) => {
      state.step = {};
    },

    clearStepRecipe: (state) => {
      state.stepRecipe = {};
    },

    removeListStep: (state, action) => {
      const { id } = action.payload;
      state.listStep = state.listStep.filter((step) => step.id !== id);
    },

    removeListStepRecipe: (state, action) => {
      const { id } = action.payload;
      state.listStepRecipe = state.listStepRecipe.filter((stepRecipe) => stepRecipe.id !== id);
    },

    addListStep: (state, action) => {
      const index = state.listStep.findIndex((step) => step.id === action.payload.id);

      if (index !== -1) {
        state.listStep[index] = action.payload;
      } else {
        state.listStep.push(action.payload);
      }
    },

    addAllListStep: (state, action) => {
      state.listStep = action.payload;
    },

    clearAllListStep: (state) => {
      state.listStep = [];
    },

    addListStepRecipe: (state, action) => {
      const index = state.listStepRecipe.findIndex(
        (stepRecipe) => stepRecipe.id === action.payload.id
      );

      if (index !== -1) {
        state.listStepRecipe[index] = action.payload;
      } else {
        state.listStepRecipe.push(action.payload);
      }
    },
  },
});

export const {
  addListStep,
  addListStepRecipe,
  addStep,
  addStepRecipe,
  clearStep,
  clearStepRecipe,
  removeListStep,
  removeListStepRecipe,
  addAllListStep,
  clearAllListStep,
} = stepSlice.actions;
export default stepSlice.reducer;
