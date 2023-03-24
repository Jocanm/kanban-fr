import { Box, Typography, Stack } from "@mui/material";
import { useSelector } from "react-redux";
import {
  selectActiveBoard,
  selectBoards,
} from "../../../redux/reducers/boards.selector";
import { BoardItem, CreateBoardItem } from "./BoardsList.styles";
import { IconBoard } from "../../../assets/react-svg";
import { useAppDispatch } from "../../../redux/store/store";
import { setActiveBoard } from "../../../redux/reducers/boards.reducer";
import { Board } from "../../../config/interfaces/board.interface";

export const BoardsList = () => {
  const boards = useSelector(selectBoards);
  const activeBoard = useSelector(selectActiveBoard);

  const dispatch = useAppDispatch();

  const handleBoardClick = (board: Board) => {
    dispatch(setActiveBoard(board));
  };

  return (
    <Stack spacing={5}>
      <Typography
        pl={6}
        fontSize="14px"
        fontWeight={600}
        letterSpacing="2.4px"
        color="customGrey.main"
      >
        ALL BOARDS ({boards.length})
      </Typography>
      <Box>
        {boards.map((board) => (
          <BoardItem
            key={board.id}
            className="sidebar-custom-item"
            active={board.id === activeBoard?.id}
            onClick={() => handleBoardClick(board)}
          >
            <IconBoard />
            {board.name}
          </BoardItem>
        ))}
        <CreateBoardItem className="sidebar-custom-item">
          <IconBoard />+ Create New Board
        </CreateBoardItem>
      </Box>
    </Stack>
  );
};
