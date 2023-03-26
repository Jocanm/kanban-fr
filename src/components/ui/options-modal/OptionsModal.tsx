import { Dialog, Slide, useMediaQuery, useTheme, Theme } from "@mui/material";
import React, { useEffect } from "react";
import { TransitionProps } from "@mui/material/transitions";
import { Sidebar } from "../sidebar/Sidebar";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const paperSxProps = (theme: Theme) => ({
  top: 70,
  position: "fixed",
  boxShadow: `0 10px 20px ${theme.palette.primary.main}25`,
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown, string>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="down" ref={ref} {...props} />;
});

export const OptionsModal = ({ isOpen, onClose }: Props) => {
  const theme = useTheme();
  const downMd = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    if (downMd) return;
    onClose();
  }, [downMd, onClose]);

  return (
    <Dialog
      onClose={onClose}
      open={isOpen && downMd}
      TransitionComponent={Transition}
      PaperProps={{ sx: paperSxProps }}
    >
      <Sidebar />
    </Dialog>
  );
};
