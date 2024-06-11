import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  surname: "",
  email: "",
  phone: "",
  image: "",
  password: "",
  username: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action) => {
      const { name, surname, email, phone, image, password, username } =
        action.payload;
      state.name = name;
      state.surname = surname;
      state.email = email;
      (state.phone = phone), (state.image = image);
      state.password = password;
      state.username = username;
    },

    changeEmail: (state, action) => {
      state.email = action.payload;
    },
    clearState: (state) => {
      state.email = "";
      state.name = "";
      state.surname = "";
      state.password = "";
      state.image = "";
      state.phone = "";
      state.username = "";
    },
  },
});

export const { addUser, changeEmail, clearState } = userSlice.actions;
export default userSlice.reducer;
