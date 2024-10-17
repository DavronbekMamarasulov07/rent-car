import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import authSlice from "../slices/auth-slice";
import likeSlice from "../slices/like-slice";
import formSlice from "../slices/form-slice";
import modalSlice from "../slices/modal-slice";

const store = configureStore({
  reducer: {
    auth : authSlice,
    like: likeSlice,
    form: formSlice,
    modal : modalSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware)
});

export default store