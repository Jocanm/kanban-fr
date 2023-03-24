import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ActiveBoardColumn } from "../components/active-board-column/ActiveBoardColumn";
import { NoBoardAlert } from "../components/ui/no-board-alert/NoBoardAlert";
import { For } from "../components/utils/For";
import { useActiveBoardSelector } from "../shared/hooks/useActiveBoardSelector";

const ColumnsContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  overflow: "auto",
  flexDirection: "row",
  gap: theme.spacing(4),
  "&::-webkit-scrollbar": {
    width: "0.5rem",
    height: "0.5rem",
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: theme.palette.lines.main,
    borderRadius: "1.25rem",
    width: ".625rem",
    height: "1.25rem",
  },
}));

export const ActiveBoardPage = () => {
  const { activeBoard, boards } = useActiveBoardSelector();

  if (boards.length === 0) {
    return <NoBoardAlert type="no-boards" onAction={() => {}} />;
  }

  if (!activeBoard) return null;

  if (activeBoard?.columns.length === 0) {
    return <NoBoardAlert type="board-empty" onAction={() => {}} />;
  }

  return (
    <ColumnsContainer>
      <For
        each={activeBoard.columns}
        render={(col) => <ActiveBoardColumn key={col.id} column={col} />}
      />
    </ColumnsContainer>
  );
};
