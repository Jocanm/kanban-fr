import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { useSelector } from "react-redux";
import { useState } from "react";
import { selectActiveBoardColumns } from "../../redux/reducers/boards/boards.selector";
import { setShowNewTaskModal } from "../../redux/reducers/ui/ui.reducer";
import { selectShowNewTaskModal } from "../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../redux/store/store";
import {
  useNewTaskForm,
  NewTaskFormSchema,
} from "../../shared/hooks/useNewTaskForm";
import { BaseModal } from "../base-modal/BaseModal";
import { MyInput } from "../my-input/MyInput";
import { StatusValues } from "./StatusValues";
import { TaskFormSubtasks } from "./TaskFormSubtasks";
import { Toast } from "../ui/toast/Toast";

interface Props {
  isEditMode?: boolean;
}

export const NewTaskForm = ({ isEditMode }: Props) => {
  const [showSnack, setShowSnack] = useState(false);
  const isOpen = useSelector(selectShowNewTaskModal);
  const status = useSelector(selectActiveBoardColumns);
  const title = isEditMode ? "Edit Task" : "Add New Task";

  const dispatch = useAppDispatch();

  const { append, fields, methods, onSubmit, remove } = useNewTaskForm();

  const closeModal = () => {
    dispatch(setShowNewTaskModal(false));
    setTimeout(() => {
      fields.forEach((_, index) => remove(fields.length - index - 1));
      methods.reset();
    }, 300);
  };

  const createTask = (data: NewTaskFormSchema) => {
    onSubmit(data);
    setShowSnack(true);
    closeModal();
  };

  return (
    <>
      <BaseModal
        open={isOpen}
        methods={methods}
        onClose={closeModal}
        onSubmit={methods.handleSubmit(createTask)}
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
        <StatusValues status={status} name="columnId" />
        <Button variant="contained" type="submit">
          Create Task
        </Button>
      </BaseModal>
      <Toast
        isOpen={showSnack}
        message="Task created successfully"
        onClose={() => setShowSnack(false)}
      />
    </>
  );
};
