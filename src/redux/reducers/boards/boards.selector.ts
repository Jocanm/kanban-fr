import { RootState } from "../../store/store";

export const selectTotalBoards = (state: RootState) =>
  state.boards.boards.length;
export const selectBoards = (state: RootState) => state.boards.boards;
export const selectActiveBoard = (state: RootState) => state.boards.activeBoard;
