import { RootState } from "../../store/store";

export const selectTotalBoards = (state: RootState) =>
  state.boards.boards.length;

export const selectBoards = (state: RootState) => state.boards.boards;

export const selectActiveBoard = (state: RootState) => state.boards.activeBoard;

export const selectActiveTask = (state: RootState) => state.boards.activeTask;

export const selectActiveBoardColumns = (state: RootState) =>
  state.boards.activeBoard?.columns.map((column) => ({
    key: column.id,
    value: column.name,
  })) || [];
