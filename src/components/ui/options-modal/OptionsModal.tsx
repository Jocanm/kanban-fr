import { Dialog, SxProps, Theme, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { Sidebar } from "../sidebar/Sidebar";
import { ModalContainer } from "./OptionsModal.styles";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const paperSxProps: SxProps<Theme> = ({ palette }) => ({
  top: 70,
  borderRadius: 2,
  position: "fixed",
  boxShadow: `0 10px 20px ${palette.primary.main}25`,
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
      PaperProps={{ sx: paperSxProps }}
    >
      <ModalContainer>
        <Sidebar />
      </ModalContainer>
    </Dialog>
  );
};
