import { MoreVert } from "@mui/icons-material";
import { IconButton, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import {
  changeTaskStatus,
  setActiveTask,
} from "../../redux/reducers/boards/boards.reducer";
import {
  selectActiveBoardColumns,
  selectActiveTask,
} from "../../redux/reducers/boards/boards.selector";
import { useAppDispatch } from "../../redux/store/store";
import { BaseModal } from "../base-modal/BaseModal";
import { SubtasksList } from "./SubtasksList";
import { Form } from "../form/Form";
import { StatusValues } from "../new-task-form/StatusValues";

interface FormProps {
  columnId: string;
}

export const TaskDetails = () => {
  const activeTask = useSelector(selectActiveTask);
  const status = useSelector(selectActiveBoardColumns);

  const dispatch = useAppDispatch();
  const methods = useForm<FormProps>();

  const columnId = methods.watch("columnId");

  const closeModal = () => {
    dispatch(setActiveTask(null));
  };

  useEffect(() => {
    dispatch(changeTaskStatus(columnId));
  }, [columnId, dispatch]);

  return (
    <BaseModal open={!!activeTask} onClose={closeModal} transitionDuration={0}>
      <Stack
        spacing={1}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography
          variant="h6"
          fontWeight={700}
          sx={{ wordBreak: "break-word" }}
        >
          {activeTask?.title}
        </Typography>
        <IconButton sx={{ color: "customGrey.main" }}>
          <MoreVert />
        </IconButton>
      </Stack>
      <Typography
        variant="body2"
        lineHeight="23px"
        color="customGrey.main"
        sx={{ wordBreak: "break-word" }}
      >
        {activeTask?.description || "No Description"}
      </Typography>
      <SubtasksList subtasks={activeTask?.subtasks || []} />
      <Form methods={methods}>
        <StatusValues
          name="columnId"
          status={status}
          defaultValue={activeTask?.status}
        />
      </Form>
    </BaseModal>
  );
};
