import { Paper, Typography } from "@mui/material";
import { Task } from "../../config/interfaces/board.interface";

interface Props {
  task: Task;
}

export const ColumnTaskItem = ({ task }: Props) => {
  return (
    <Paper key={task.id} sx={{ p: 5, cursor: "pointer" }} elevation={4}>
      <Typography variant="body2" fontWeight={600}>
        {task.title}
        {task.title}
      </Typography>
      <Typography variant="caption" fontWeight={700} color="customGrey.main">
        {`0 of ${task.subtasks.length} subtasks`}
      </Typography>
    </Paper>
  );
};
