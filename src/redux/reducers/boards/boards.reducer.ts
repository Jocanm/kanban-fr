import { createSlice, PayloadAction, nanoid } from "@reduxjs/toolkit";
import { data } from "../../../config/data/data";
import { Board } from "../../../config/interfaces/board.interface";
import { CreateBoardBody, UpdateBoardBody } from "./request.interfaces";

interface InitialState {
  boards: Board[];
  activeBoard: Board | null;
}

const initialState: InitialState = {
  boards: data,
  activeBoard: null,
};

export const boardsReducer = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<Board | null>) => {
      state.activeBoard = action.payload;
    },
    addNewBoard: (state, { payload }: PayloadAction<CreateBoardBody>) => {
      const columns: Board["columns"] = payload.columns.map((column) => ({
        tasks: [],
        id: nanoid(),
        name: column,
      }));

      const board: Board = {
        columns,
        id: nanoid(),
        name: payload.name,
      };

      state.boards.unshift(board);
      state.activeBoard = board;
    },
    deleteBoard: (state, { payload }: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== payload);

      const [firstBoard] = state.boards;
      firstBoard
        ? (state.activeBoard = firstBoard)
        : (state.activeBoard = null);
    },
    updateBoard: (state, { payload }: PayloadAction<UpdateBoardBody>) => {
      const board = state.boards.find((board2) => board2.id === payload.id);
      if (!board) return;

      const newColumns = payload.columns.map((column, index) => ({
        tasks: board.columns[index]?.tasks || [],
        id: nanoid(),
        name: column,
      }));

      board.name = payload.name;
      board.columns = newColumns;
    },
  },
});

export const { setActiveBoard, addNewBoard, deleteBoard, updateBoard } =
  boardsReducer.actions;
