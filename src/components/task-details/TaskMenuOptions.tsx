import React, { useState } from "react";
import { IconButton, Menu, MenuItem, Typography } from "@mui/material";
import { MoreVert } from "@mui/icons-material";

export const TaskMenuOptions = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
        <MenuItem>
          <Typography variant="body2" color="customGrey.main">
            Edit Task
          </Typography>
        </MenuItem>
        <MenuItem>
          <Typography variant="body2" color="error">
            Delete Task
          </Typography>
        </MenuItem>
      </Menu>
    </>
  );
};
