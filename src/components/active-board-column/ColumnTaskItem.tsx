import { Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Task } from "../../config/interfaces/board.interface";

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
  return (
    <CustomPaper key={task.id} sx={{ cursor: "pointer" }} elevation={4}>
      <Typography variant="body2" fontWeight={600} className="task-title">
        {task.title}
        {task.title}
      </Typography>
      <Typography variant="caption" fontWeight={700} color="customGrey.main">
        {`0 of ${task.subtasks.length} subtasks`}
      </Typography>
    </CustomPaper>
  );
};
