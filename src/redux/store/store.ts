import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { TypedUseSelectorHook } from "react-redux/es/types";
import { persistReducer } from "redux-persist";
import { boardsReducer } from "../reducers/boards/boards.reducer";
import { uiReducer } from "../reducers/ui/ui.reducer";

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const reducer = combineReducers({
  ui: uiReducer.reducer,
  boards: boardsReducer.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
