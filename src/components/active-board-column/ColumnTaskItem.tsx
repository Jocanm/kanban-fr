import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useMemo } from "react";
import { Task } from "../../config/interfaces/board.interface";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import { useAppDispatch } from "../../redux/store/store";

interface Props {
  task: Task;
}

const CustomPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  cursor: "pointer",
  "&:hover .task-title": {
    color: theme.palette.primary.main,
  },
}));

export const ColumnTaskItem = ({ task }: Props) => {
  const dispatch = useAppDispatch();

  const handleTaskClick = () => {
    dispatch(setActiveTask(task));
  };

  const subtasksCompleted = useMemo(
    () => task.subtasks.filter((subtask) => subtask.isCompleted).length,
    [task.subtasks]
  );

  return (
    <CustomPaper
      key={task.id}
      sx={{ cursor: "pointer" }}
      onClick={handleTaskClick}
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
      <Typography variant="caption" fontWeight={700} color="customGrey.main">
        {`${subtasksCompleted} of ${task.subtasks.length} subtasks`}
      </Typography>
    </CustomPaper>
  );
};
