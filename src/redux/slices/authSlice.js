import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLogin: (state) => {
      // const { token } = action.payload;
      state.status = true;
      // state.token = token;
    },

    onChange: (state, action) => {
      state.token = action.payload();
    },

    onLogout: (state) => {
      state.status = false;
      if (localStorage.getItem("token") !== null) {
        localStorage.removeItem("token");
      }
    },
  },
});

export const { onLogin, onLogout, onChange } = authSlice.actions;
export default authSlice.reducer;
