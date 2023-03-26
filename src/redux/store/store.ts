import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { boardsReducer } from "../reducers/boards/boards.reducer";
import { uiReducer } from "../reducers/ui/ui.reducer";

export const store = configureStore({
  reducer: {
    ui: uiReducer.reducer,
    boards: boardsReducer.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
