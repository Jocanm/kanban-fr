import {
  DragDropContext,
  Droppable,
  DropResult,
  OnDragEndResponder,
} from "@hello-pangea/dnd";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { ActiveBoardColumn } from "../components/active-board-column/ActiveBoardColumn";
import { NewColumnButton } from "../components/active-board-column/NewColumnButton";
import { DeleteTaskModal } from "../components/delete-task-modal/DeleteTaskModal";
import { NewTaskForm } from "../components/new-task-form/NewTaskForm";
import { TaskDetails } from "../components/task-details/TaskDetails";
import { NoBoardAlert } from "../components/ui/no-board-alert/NoBoardAlert";
import { If } from "../components/utils";
import { For } from "../components/utils/For";
import { arrayMove } from "../helpers/arrayMove";
import {
  setColumnsOder,
  setTasksOrder,
  setTaskStatusWithDrag,
} from "../redux/reducers/boards/boards.reducer";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../redux/reducers/ui/ui.reducer";
import { selectShowNewTaskModal } from "../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../redux/store/store";
import { CustomScrollBarObject } from "../shared/css/css.global";
import { useActiveBoardSelector } from "../shared/hooks/useActiveBoardSelector";

const ColumnsContainer = styled(Box)(({ theme }) => ({
  height: "100%",
  overflow: "auto",
  display: "inline-flex",
  padding: theme.spacing(4, 0),
  "& > *": {
    margin: theme.spacing(0, 4),
  },
  ...CustomScrollBarObject({ theme }),
}));

export const DragType = {
  COLUMN: "COLUMN",
  TASK: "TASK",
};

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

  const onDragColumn = ({ destination, source }: DropResult) => {
    if (!destination || !activeBoard) return;
    if (destination.index === source.index) return;
    const newColumns = arrayMove(
      activeBoard.columns,
      source.index,
      destination.index
    );
    dispatch(setColumnsOder(newColumns));
  };

  const onDragTask = ({ destination, source, draggableId }: DropResult) => {
    if (!destination || !activeBoard) return;
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    if (destination.droppableId === source.droppableId) {
      const column = activeBoard.columns.find(
        (col) => col.id === source.droppableId
      );

      if (!column) return;

      const newTasks = arrayMove(column.tasks, source.index, destination.index);
      dispatch(setTasksOrder(newTasks));
    } else {
      dispatch(
        setTaskStatusWithDrag({
          taskId: draggableId,
          newPosition: destination.index,
          oldColumnId: source.droppableId,
          newColumnId: destination.droppableId,
        })
      );
    }
  };

  const onDragEnd: OnDragEndResponder = (result) => {
    if (result.type === DragType.TASK) return onDragTask(result);
    if (result.type === DragType.COLUMN) return onDragColumn(result);
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
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        type={DragType.COLUMN}
        direction="horizontal"
        droppableId="active-board"
      >
        {(provided) => (
          <ColumnsContainer
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <For
              each={activeBoard.columns}
              render={(col, i) => (
                <ActiveBoardColumn key={col.id} column={col} index={i} />
              )}
            />
            {provided.placeholder}
            <NewColumnButton />
            <TaskDetails />
            <DeleteTaskModal />
            <If condition={isOpen}>
              <NewTaskForm />
            </If>
          </ColumnsContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
};
