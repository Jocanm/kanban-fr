import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ActiveBoardColumn } from "../components/active-board-column/ActiveBoardColumn";
import { NewColumnButton } from "../components/active-board-column/NewColumnButton";
import { NoBoardAlert } from "../components/ui/no-board-alert/NoBoardAlert";
import { For } from "../components/utils/For";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../redux/reducers/ui/ui.reducer";
import { useAppDispatch } from "../redux/store/store";
import { CustomScrollBarObject } from "../shared/css/css.global";
import { useActiveBoardSelector } from "../shared/hooks/useActiveBoardSelector";

const ColumnsContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  flexDirection: "row",
  overflow: "auto",
  gap: theme.spacing(6),
  ...CustomScrollBarObject({ theme }),
}));

export const ActiveBoardPage = () => {
  const { activeBoard, boards } = useActiveBoardSelector();

  const dispatch = useAppDispatch();

  const openNewBoardModal = () => {
    dispatch(setIsNewBoardModalOpen(true));
  };

  const handleOpenEditBoardModal = () => {
    openNewBoardModal();
    dispatch(setIsNewBoardModalEditMode(true));
  };

  if (boards.length === 0) {
    return <NoBoardAlert type="no-boards" onAction={openNewBoardModal} />;
  }

  if (!activeBoard) return null;

  if (activeBoard.columns.length === 0) {
    return (
      <NoBoardAlert type="board-empty" onAction={handleOpenEditBoardModal} />
    );
  }

  return (
    <ColumnsContainer py={4} px={{ xs: 4, md: 6, lg: 8 }}>
      <For
        each={activeBoard.columns}
        render={(col, i) => (
          <ActiveBoardColumn key={col.id} column={col} index={i} />
        )}
      />
      <NewColumnButton />
    </ColumnsContainer>
  );
};
