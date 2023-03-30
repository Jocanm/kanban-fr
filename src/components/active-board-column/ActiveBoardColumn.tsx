import { Stack } from "@mui/material";
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { Column } from "../../config/interfaces/board.interface";
import { CustomScrollBarObject } from "../../shared/css/css.global";
import { For } from "../utils/For";
import { ColumnName } from "./ColumnName";
import { ColumnTaskItem } from "./ColumnTaskItem";
import { DragType } from "../../pages/ActiveBoardPage";

interface Props {
  column: Column;
  index: number;
}

export const ActiveBoardColumn = ({ column, index }: Props) => {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided, snapshot) => (
        <Stack
          minWidth="17.5rem"
          maxWidth="17.5rem"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <ColumnName
            name={column.name}
            color={column.color}
            isDragging={snapshot.isDragging}
            tasksLength={column.tasks.length}
            dragHandleProps={provided.dragHandleProps}
          />
          <Droppable droppableId={column.id} type={DragType.TASK}>
            {(dropProvided) => (
              <Stack
                height="100%"
                overflow="auto"
                ref={dropProvided.innerRef}
                {...dropProvided.droppableProps}
                sx={(theme) => CustomScrollBarObject({ theme, hidden: true })}
              >
                <For
                  each={column.tasks}
                  render={(task, taskIndex) => (
                    <ColumnTaskItem
                      task={task}
                      key={task.id}
                      index={taskIndex}
                    />
                  )}
                />
                {dropProvided.placeholder}
              </Stack>
            )}
          </Droppable>
        </Stack>
      )}
    </Draggable>
  );
};
