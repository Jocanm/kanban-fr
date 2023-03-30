import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Task } from "../../config/interfaces/board.interface";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import { useAppDispatch } from "../../redux/store/store";

interface Props {
  task: Task;
  index: number;
}

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  cursor: "pointer",
  "&:hover .task-title": {
    color: theme.palette.primary.main,
  },
}));

export const ColumnTaskItem = ({ task, index }: Props) => {
  const subtasksCompleted = useMemo(
    () => task.subtasks.filter((subtask) => subtask.isCompleted).length,
    [task.subtasks]
  );

  const dispatch = useAppDispatch();

  const handleTaskClick = () => {
    dispatch(setActiveTask(task));
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <CustomPaper
          key={task.id}
          sx={{ cursor: "pointer", my: 3 }}
          onClick={handleTaskClick}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Typography
            width="100%"
            fontSize="15px"
            overflow="hidden"
            fontWeight={600}
            className="task-title"
            textOverflow="ellipsis"
          >
            {task.title}
          </Typography>
          <Typography
            variant="caption"
            fontWeight={700}
            color="customGrey.main"
          >
            {`${subtasksCompleted} of ${task.subtasks.length} subtasks`}
          </Typography>
        </CustomPaper>
      )}
    </Draggable>
  );
};
