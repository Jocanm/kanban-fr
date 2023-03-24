import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { data } from "../../config/data/data";
import { Board } from "../../config/interfaces/board.interface";

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
  },
});

export const { setActiveBoard } = boardsReducer.actions;
