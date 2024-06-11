import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  show: false,
  type: undefined,
  message: 'undefined',
};

export const messageSlice = createSlice({
  name: 'message',
  initialState,

  reducers: {
    openMessage: (state, action) => {
      const { type, message } = action.payload;
      state.show = true;
      state.type = type;
      state.message = message;
    },

    closeMessage: (state) => {
      state.message = undefined;
      state.type = undefined;
      state.show = false;
    },
  },
});

export const { closeMessage, openMessage } = messageSlice.actions;
export default messageSlice.reducer;
