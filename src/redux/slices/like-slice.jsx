import { createSlice  } from "@reduxjs/toolkit";
import { saveToLocalStorage } from "../../helpers/index";

const initialState = {
  likedCars: localStorage.getItem("likedCars") ? JSON.parse(localStorage.getItem("likedCars")) : [],
};


const likeSlice = createSlice({
  name: "like",
  initialState,
  reducers: {
    addToLiked: (state, action) => {
      const existingCarIndex = state.likedCars.findIndex(
        (car) => car._id === action.payload._id
      );

      if (existingCarIndex === -1) {
        state.likedCars.push(action.payload);
      } else {
        state.likedCars = state.likedCars.filter(
          (car) => car._id !== action.payload._id
        );
      }

      saveToLocalStorage("likedCars", state.likedCars);
    },
    removeFromLiked: (state, action) => {
      state.likedCars = state.likedCars.filter(
        (car) => car.id !== action.payload
      );
      saveToLocalStorage("likedCars", state.likedCars);
    },
  },
});

export default likeSlice.reducer;
export const { addToLiked, removeFromLiked } = likeSlice.actions;
