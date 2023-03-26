import { Add } from "@mui/icons-material";
import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectActiveBoard } from "../../redux/reducers/boards/boards.selector";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../../redux/reducers/ui/ui.reducer";
import {
  selectIsNewBoardModalEditMode,
  selectIsNewBoardModalOpen,
} from "../../redux/reducers/ui/ui.selector";
import { modalsPadding, modalsWidth } from "../../shared/css/css.global";
import {
  NewBoardFormSchema,
  useNewBoardForm,
} from "../../shared/hooks/useNewBoardForm";
import { Form } from "../form/Form";
import { MyInput } from "../my-input/MyInput";
import { If } from "../utils";
import { BoardColumns } from "./BoardFormColumns";

export const NewBoardForm = () => {
  const dispatch = useDispatch();

  const activeBoard = useSelector(selectActiveBoard);
  const isOpen = useSelector(selectIsNewBoardModalOpen);
  const isEditMode = useSelector(selectIsNewBoardModalEditMode);

  const boardTitle = isEditMode ? "Edit Board" : "Add New Board";
  const buttonTitle = isEditMode ? "Save Changes" : "Create New Board";

  const { append, fields, methods, onSubmitForm, remove } = useNewBoardForm({
    isEditMode,
    activeBoard,
  });

  const closeModal = () => {
    dispatch(setIsNewBoardModalOpen(false));
    setTimeout(() => {
      fields.forEach((_, index) => remove(fields.length - index - 1));
      methods.reset();
    }, 300);
  };

  const onSubmitted = (data: NewBoardFormSchema) => {
    onSubmitForm(data);
    closeModal();
  };

  useEffect(() => {
    if (isOpen) return;
    setTimeout(() => {
      dispatch(setIsNewBoardModalEditMode(false));
    }, 300);
  }, [isOpen, dispatch]);

  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <Form methods={methods} onSubmit={methods.handleSubmit(onSubmitted)}>
        <Stack width={modalsWidth} p={modalsPadding} spacing={8}>
          <Typography variant="h6" fontWeight={700}>
            {boardTitle}
          </Typography>
          <Stack spacing={4}>
            <Stack spacing={2}>
              <Typography variant="subtitle2" fontWeight={700}>
                Board Name
              </Typography>
              <MyInput name="boardName" />
            </Stack>
            <If condition={fields.length > 0}>
              <BoardColumns
                fields={fields}
                methods={methods}
                onRemove={remove}
              />
            </If>
          </Stack>
          <Stack spacing={4}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<Add />}
              onClick={() => append({ columnName: "" })}
            >
              Add New Column
            </Button>
            <Button variant="contained" type="submit">
              {buttonTitle}
            </Button>
          </Stack>
        </Stack>
      </Form>
    </Dialog>
  );
};
