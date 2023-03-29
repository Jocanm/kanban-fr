import { Box, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectActiveBoard,
  selectBoards,
} from "../../../redux/reducers/boards/boards.selector";
import { BoardItem, CreateBoardItem } from "./BoardsList.styles";
import { IconBoard } from "../../../assets/react-svg";
import { useAppDispatch } from "../../../redux/store/store";
import { setActiveBoard } from "../../../redux/reducers/boards/boards.reducer";
import { Board } from "../../../config/interfaces/board.interface";
import {
  setIsNewBoardModalOpen,
  setIsOptionsModalOpen,
} from "../../../redux/reducers/ui/ui.reducer";

export const BoardsList = () => {
  const boards = useSelector(selectBoards);
  const activeBoard = useSelector(selectActiveBoard);

  const dispatch = useAppDispatch();

  const handleBoardClick = (board: Board) => {
    dispatch(setActiveBoard(board));
  };

  const openNewBoardModal = () => {
    dispatch(setIsOptionsModalOpen(false));
    dispatch(setIsNewBoardModalOpen(true));
  };

  return (
    <Stack spacing={5} maxHeight="60%">
      <Typography
        pl={6}
        fontSize="14px"
        fontWeight={600}
        letterSpacing="2.4px"
        color="customGrey.main"
      >
        ALL BOARDS ({boards.length})
      </Typography>
      <Stack spacing={1} height="100%">
        {boards.map((board) => (
          <BoardItem
            key={board.id}
            className="sidebar-custom-item"
            isActive={board.id === activeBoard?.id}
            onClick={() => handleBoardClick(board)}
          >
            <IconBoard />
            <span>{board.name}</span>
          </BoardItem>
        ))}
        <CreateBoardItem
          onClick={openNewBoardModal}
          className="sidebar-custom-item"
        >
          <IconBoard />+ Create New Board
        </CreateBoardItem>
      </Stack>
    </Stack>
  );
};
