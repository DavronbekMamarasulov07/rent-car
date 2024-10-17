import { createSlice } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../../helpers/index";
const initialState = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
  formValues: {},
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signOut: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    signIn: (state, action) => {
      const user = JSON.parse(atob(action.payload.token.split('.')[1]));
      state.user = user;
      state.token = action.payload.token;
      saveToLocalStorage("user", JSON.stringify(user));
      saveToLocalStorage("token", action.payload.token);
    },
    setFormValues: (state, action) => {
      state.formValues = action.payload;
    }
  },
});

export const {
  signOut,
  signIn,
  setFormValues,
} = authSlice.actions;
export default authSlice.reducer;
