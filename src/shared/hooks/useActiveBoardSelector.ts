import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setActiveBoard } from "../../redux/reducers/boards/boards.reducer";
import {
  selectBoards,
  selectActiveBoard,
} from "../../redux/reducers/boards/boards.selector";
import { useAppDispatch } from "../../redux/store/store";

export const useActiveBoardSelector = () => {
  const boards = useSelector(selectBoards);
  const activeBoard = useSelector(selectActiveBoard);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const [firstBoard] = boards;
    if (!firstBoard) return;
    dispatch(setActiveBoard(boards[0]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { activeBoard, boards };
};
