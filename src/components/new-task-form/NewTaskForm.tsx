import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { setActiveTask } from "../../redux/reducers/boards/boards.reducer";
import {
  selectActiveBoardColumns,
  selectActiveTask,
} from "../../redux/reducers/boards/boards.selector";
import { setShowNewTaskModal } from "../../redux/reducers/ui/ui.reducer";
import { selectShowNewTaskModal } from "../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../redux/store/store";
import {
  NewTaskFormSchema,
  useNewTaskForm,
} from "../../shared/hooks/useNewTaskForm";
import { BaseModal } from "../base-modal/BaseModal";
import { MyInput } from "../my-input/MyInput";
import { If } from "../utils";
import { StatusValues } from "./StatusValues";
import { TaskFormSubtasks } from "./TaskFormSubtasks";

export const NewTaskForm = () => {
  const activeTask = useSelector(selectActiveTask);
  const isOpen = useSelector(selectShowNewTaskModal);
  const status = useSelector(selectActiveBoardColumns);
  const title = activeTask ? "Edit Task" : "Add New Task";
  const submitButtonText = activeTask ? "Save Changes" : "Create Task";

  const dispatch = useAppDispatch();

  const { append, fields, methods, onSubmit, remove } = useNewTaskForm({
    activeTask,
  });

  const closeModal = () => {
    dispatch(setShowNewTaskModal(false));
    dispatch(setActiveTask(null));
  };

  const onFormSubmitted = (data: NewTaskFormSchema) => {
    onSubmit(data);
    closeModal();
  };

  useEffect(() => {
    if (!activeTask) return;
    methods.setValue("columnId", activeTask.status);
  }, [activeTask, methods]);

  return (
    <BaseModal
      open={isOpen}
      methods={methods}
      onClose={closeModal}
      transitionDuration={0}
      onSubmit={methods.handleSubmit(onFormSubmitted)}
    >
      <Typography variant="h6" fontWeight={700}>
        {title}
      </Typography>
      <MyInput name="title" customLabel="Title" />
      <MyInput
        rows={3}
        multiline
        name="description"
        customLabel="Description"
        placeholder="e.g. It’s always good to take a break. I’ll be back in 5 minutes."
      />
      <TaskFormSubtasks
        append={append}
        remove={remove}
        fields={fields}
        methods={methods}
      />
      <If condition={activeTask}>
        <StatusValues
          status={status}
          name="columnId"
          defaultValue={activeTask?.status}
        />
      </If>
      <If condition={!activeTask}>
        <StatusValues status={status} name="columnId" />
      </If>
      <Button variant="contained" type="submit">
        {submitButtonText}
      </Button>
    </BaseModal>
  );
};
