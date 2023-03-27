import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";
import { useAppDispatch } from "../../redux/store/store";
import {
  setShowDeleteTaskModal,
  setShowNewTaskModal,
} from "../../redux/reducers/ui/ui.reducer";

export const TaskMenuOptions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const dispatch = useAppDispatch();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditTask = () => {
    dispatch(setShowNewTaskModal(true));
  };

  const handleDeleteTask = () => {
    dispatch(setShowDeleteTaskModal(true));
  };

  return (
    <>
      <IconButton
        size="small"
        onClick={handleClick}
        sx={{ color: "customGrey.main" }}
      >
        <MoreVert />
      </IconButton>
      <Menu
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: ({ palette }) => ({
            width: "10rem",
            mt: 4,
            backgroundColor:
              palette.mode === "dark" ? "customGrey.darker" : "#fff",
          }),
        }}
      >
        <MenuItem onClick={handleEditTask}>
          <Typography variant="body2" color="customGrey.main">
            Edit Task
          </Typography>
        </MenuItem>
        <MenuItem onClick={handleDeleteTask}>
          <Typography variant="body2" color="error">
            Delete Task
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
