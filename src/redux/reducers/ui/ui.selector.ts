import { RootState } from "../../store/store";

export const selectIsOptionsModalOpen = (state: RootState) =>
  state.ui.isOptionsModalOpen;

export const selectIsNewBoardModalOpen = (state: RootState) =>
  state.ui.isNewBoardModalOpen;

export const selectIsNewBoardModalEditMode = (state: RootState) =>
  state.ui.isNewBoardModalEditMode;

export const selectShowSidebar = (state: RootState) => state.ui.showSidebar;

export const selectShowNewTaskModal = (state: RootState) =>
  state.ui.showNewTaskModal;

export const selectShowDeleteTaskModal = (state: RootState) =>
  state.ui.showDeleteTaskModal;
