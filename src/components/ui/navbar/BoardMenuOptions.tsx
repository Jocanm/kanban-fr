import { MoreVert } from "@mui/icons-material";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import React, { useState } from "react";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../../../redux/reducers/ui/ui.reducer";
import { useAppDispatch } from "../../../redux/store/store";
import { DeleteBoardModal } from "../../delete-board-modal/DeleteBoardModal";

export const BoardMenuOptions = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenEditBoardModal = () => {
    dispatch(setIsNewBoardModalOpen(true));
    dispatch(setIsNewBoardModalEditMode(true));
    handleClose();
  };

  const handleOpenDeleteModal = () => {
    handleClose();
    setIsDeleteModalOpen(true);
  };

  const handleCloseModal = () => setIsDeleteModalOpen(false);

  return (
    <>
      <IconButton size="small" onClick={handleClick}>
        <MoreVert />
      </IconButton>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{ sx: { width: "10rem", mt: 4 } }}
      >
        <MenuItem onClick={handleOpenEditBoardModal}>
          <Typography variant="body2" color="customGrey.main">
            Edit Board
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteModal}>
          <Typography variant="body2" color="error">
            Delete Board
          </Typography>
        </MenuItem>
      </Menu>
      <DeleteBoardModal isOpen={isDeleteModalOpen} onClose={handleCloseModal} />
    </>
  );
};
