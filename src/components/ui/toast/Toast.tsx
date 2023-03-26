import React from "react";
import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";

interface Props extends SnackbarProps {
  isOpen: boolean;
  message: string;
  severity?: AlertProps["severity"];
}

export const Toast = ({
  isOpen,
  message,
  severity = "success",
  ...rest
}: Props) => {
  return (
    <Snackbar open={isOpen} autoHideDuration={3000} {...rest}>
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
