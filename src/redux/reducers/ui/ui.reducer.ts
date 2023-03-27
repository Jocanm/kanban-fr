import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  showSidebar: true,
  showNewTaskModal: false,
  showDeleteTaskModal: false,
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
    setShowSidebar: (state, action: PayloadAction<boolean>) => {
      state.showSidebar = action.payload;
    },
    setShowNewTaskModal: (state, action: PayloadAction<boolean>) => {
      state.showNewTaskModal = action.payload;
    },
    setShowDeleteTaskModal: (state, action: PayloadAction<boolean>) => {
      state.showDeleteTaskModal = action.payload;
    },
  },
});

export const {
  setShowSidebar,
  setShowNewTaskModal,
  setIsOptionsModalOpen,
  setIsNewBoardModalOpen,
  setShowDeleteTaskModal,
  setIsNewBoardModalEditMode,
} = uiReducer.actions;
