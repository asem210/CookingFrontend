import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  surname: '',
  email: '',
  phone: '',
  image: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, surname, email, phone, image } = action.payload;
      state.name = name;
      state.surname = surname;
      state.email = email;
      (state.phone = phone), (state.image = image);
    },

    changeEmail: (state, action) => {
      state.email = action.payload;
    },
  },
});

export const { addUser, changeEmail } = userSlice.actions;
export default userSlice.reducer;
