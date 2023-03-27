import { Stack, Typography } from "@mui/material";
import { useMemo } from "react";
import { Subtask } from "../../config/interfaces/board.interface";
import { For } from "../utils/For";
import { SubtasksItem } from "./SubtasksItem";

interface Props {
  subtasks: Subtask[];
}

export const SubtasksList = ({ subtasks }: Props) => {
  const tasksCompleted = useMemo(
    () => subtasks.filter((subtask) => subtask.isCompleted).length,
    [subtasks]
  );

  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={700} mb={2}>
        Subtasks ({tasksCompleted} of {subtasks.length})
      </Typography>
      <For
        each={subtasks}
        render={(subtask) => <SubtasksItem subtask={subtask} />}
      />
    </Stack>
  );
};
