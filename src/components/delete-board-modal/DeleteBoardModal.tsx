import { Button, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { deleteBoard } from "../../redux/reducers/boards/boards.reducer";
import { selectActiveBoard } from "../../redux/reducers/boards/boards.selector";
import { useAppDispatch } from "../../redux/store/store";
import { BaseModal } from "../base-modal/BaseModal";
import { Toast } from "../ui/toast/Toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const DeleteBoardModal = ({ isOpen, onClose }: Props) => {
  const [showSnack, setShowSnack] = useState(false);
  const activeBoard = useSelector(selectActiveBoard);

  const dispatch = useAppDispatch();

  const onDeleteBoard = () => {
    if (!activeBoard) return;
    dispatch(deleteBoard(activeBoard.id));
    onClose();
    setShowSnack(true);
  };

  if (!activeBoard) return null;

  return (
    <>
      <BaseModal open={isOpen} onClose={onClose} contentSpacing={6}>
        <Typography variant="h6" fontWeight={700} color="error">
          Delete this board?
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            wordBreak: "break-word",
          }}
        >
          Are you sure you want to delete the {`"${activeBoard.name}"`} board?
          This action will remove all columns and tasks and cannot be reversed.
        </Typography>
        <Stack direction="row" spacing={4}>
          <Button
            fullWidth
            color="error"
            variant="contained"
            onClick={onDeleteBoard}
          >
            Delete
          </Button>
          <Button
            fullWidth
            color="secondary"
            variant="contained"
            onClick={onClose}
          >
            Cancel
          </Button>
        </Stack>
      </BaseModal>
      <Toast
        isOpen={showSnack}
        message="Board deleted successfully"
        onClose={() => setShowSnack(false)}
      />
    </>
  );
};
