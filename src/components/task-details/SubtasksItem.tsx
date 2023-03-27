import { Checkbox, Stack, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Subtask } from "../../config/interfaces/board.interface";
import { completeSubtask } from "../../redux/reducers/boards/boards.reducer";
import { useAppDispatch } from "../../redux/store/store";

interface ContainerProps {
  isCompleted: boolean;
}

const ItemContainer = styled(Stack)<ContainerProps>(
  ({ theme, isCompleted }) => ({
    cursor: "pointer",
    transition: "all 0.1s linear",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
    backgroundColor:
      theme.palette.mode === "dark"
        ? theme.palette.customGrey.darker
        : theme.palette.customGrey.light,
    "&:hover": {
      backgroundColor: `${theme.palette.primary.main}20`,
    },
    ...(isCompleted && {
      "& .subtask-title": {
        color: theme.palette.customGrey.main,
        textDecoration: "line-through",
      },
    }),
  })
);

interface Props {
  subtask: Subtask;
}

export const SubtasksItem = ({ subtask }: Props) => {
  const dispatch = useAppDispatch();

  const handleCompleteSubTask = () => {
    dispatch(completeSubtask(subtask.id));
  };

  return (
    <ItemContainer
      p={2.5}
      onClick={handleCompleteSubTask}
      isCompleted={subtask.isCompleted}
    >
      <Checkbox checked={subtask.isCompleted} />
      <Typography
        ml={4}
        variant="body2"
        fontWeight={700}
        className="subtask-title"
      >
        {subtask.title}
      </Typography>
    </ItemContainer>
  );
};
