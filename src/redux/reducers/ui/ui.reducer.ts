import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  isNewBoardModalOpen: false,
  isOptionsModalOpen: false,
  isNewBoardModalEditMode: false,
};

export const uiReducer = createSlice({
  name: "ui-reducer",
  initialState,
  reducers: {
    setIsNewBoardModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isNewBoardModalOpen = action.payload;
    },
    setIsOptionsModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOptionsModalOpen = action.payload;
    },
    setIsNewBoardModalEditMode: (state, action: PayloadAction<boolean>) => {
      state.isNewBoardModalEditMode = action.payload;
    },
  },
});

export const {
  setIsOptionsModalOpen,
  setIsNewBoardModalOpen,
  setIsNewBoardModalEditMode,
} = uiReducer.actions;
