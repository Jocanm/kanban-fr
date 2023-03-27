import { Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import {
  changeTaskStatus,
  setActiveTask,
} from "../../redux/reducers/boards/boards.reducer";
import {
  selectActiveBoardColumns,
  selectActiveTask,
} from "../../redux/reducers/boards/boards.selector";
import {
  selectShowDeleteTaskModal,
  selectShowNewTaskModal,
} from "../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../redux/store/store";
import { BaseModal } from "../base-modal/BaseModal";
import { Form } from "../form/Form";
import { StatusValues } from "../new-task-form/StatusValues";
import { If } from "../utils";
import { SubtasksList } from "./SubtasksList";
import { TaskMenuOptions } from "./TaskMenuOptions";

interface FormProps {
  columnId: string;
}

export const TaskDetails = () => {
  const activeTask = useSelector(selectActiveTask);
  const status = useSelector(selectActiveBoardColumns);
  const isNewTaskModalOpen = useSelector(selectShowNewTaskModal);
  const isDeleteTaskModalOpen = useSelector(selectShowDeleteTaskModal);

  const dispatch = useAppDispatch();
  const methods = useForm<FormProps>({});

  const columnId = methods.watch("columnId");

  const closeModal = () => {
    dispatch(setActiveTask(null));
    methods.reset();
  };

  useEffect(() => {
    dispatch(changeTaskStatus(columnId));
  }, [columnId, dispatch]);

  return (
    <BaseModal
      onClose={closeModal}
      transitionDuration={0}
      open={!!activeTask && !isDeleteTaskModalOpen && !isNewTaskModalOpen}
    >
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
        <TaskMenuOptions />
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
      <If condition={!!activeTask}>
        <Form methods={methods}>
          <StatusValues
            name="columnId"
            status={status}
            defaultValue={activeTask?.status}
          />
        </Form>
      </If>
    </BaseModal>
  );
};
