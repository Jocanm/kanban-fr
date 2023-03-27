import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ActiveBoardColumn } from "../components/active-board-column/ActiveBoardColumn";
import { NewColumnButton } from "../components/active-board-column/NewColumnButton";
import { DeleteTaskModal } from "../components/delete-task-modal/DeleteTaskModal";
import { NewTaskForm } from "../components/new-task-form/NewTaskForm";
import { TaskDetails } from "../components/task-details/TaskDetails";
import { NoBoardAlert } from "../components/ui/no-board-alert/NoBoardAlert";
import { For } from "../components/utils/For";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../redux/reducers/ui/ui.reducer";
import { useAppDispatch } from "../redux/store/store";
import { CustomScrollBarObject } from "../shared/css/css.global";
import { useActiveBoardSelector } from "../shared/hooks/useActiveBoardSelector";
import { selectShowNewTaskModal } from "../redux/reducers/ui/ui.selector";
import { If } from "../components/utils";

const ColumnsContainer = styled(Stack)(({ theme }) => ({
  height: "100%",
  flexDirection: "row",
  overflow: "auto",
  gap: theme.spacing(6),
  ...CustomScrollBarObject({ theme }),
}));

export const ActiveBoardPage = () => {
  const isOpen = useSelector(selectShowNewTaskModal);
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
      <TaskDetails />
      <DeleteTaskModal />
      <If condition={isOpen}>
        <NewTaskForm />
      </If>
    </ColumnsContainer>
  );
};
