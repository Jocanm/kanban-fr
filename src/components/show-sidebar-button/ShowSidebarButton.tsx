import React from "react";
import { RemoveRedEyeRounded } from "@mui/icons-material";
import { Button } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useAppDispatch } from "../../redux/store/store";
import { setShowSidebar } from "../../redux/reducers/ui/ui.reducer";

interface Props {
  showSidebar: boolean;
}

export const ShowSidebarButton = ({ showSidebar }: Props) => {
  const dispatch = useAppDispatch();

  const handleShowSidebar = () => {
    dispatch(setShowSidebar(true));
  };

  return (
    <AnimatePresence>
      {!showSidebar && (
        <Button
          size="large"
          variant="contained"
          onClick={handleShowSidebar}
          component={motion.button}
          sx={{
            zIndex: 2,
            position: "absolute",
            bottom: "1.45rem",
            width: "2.875rem",
            height: "3rem",
            borderRadius: "0 6.25rem 6.25rem 0",
            display: { xs: "none", md: "block" },
          }}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.2 }}
        >
          <RemoveRedEyeRounded fontSize="small" />
        </Button>
      )}
    </AnimatePresence>
  );
};
