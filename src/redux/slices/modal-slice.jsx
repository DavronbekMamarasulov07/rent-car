import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modalVisibilable: false,
  createCarModal: false,
  updateCarModal: false,
  editProfModal: false,
  updateCategoryModal: false,
  editBalanceModal: false
}

const modalSlice = createSlice({
  name: "modal",
  initialState, 
  reducers: {
    setModal: (state, action) => {
      state.modalVisibilable = action.payload;
    },
    setCreateCarModal: (state, action) => {
      state.createCarModal = action.payload;
    },
    setUpdateCarModal: (state, action) => {
      state.updateCarModal = action.payload;
    },
    setEditProfModal: (state, action) => {
      state.editProfModal = action.payload;
    },
    setUpdateCategoryModal: (state, action) => {
      state.updateCategoryModal = action.payload;
    },
    setEditBalanceModal: (state, action) => {
      state.editBalanceModal = action.payload;
    }
  }
});

export const {
  setModal,
  setCreateCarModal,
  setUpdateCarModal,
  setEditProfModal,
  setUpdateCategoryModal,
  setEditBalanceModal
} = modalSlice.actions;
export default modalSlice.reducer;