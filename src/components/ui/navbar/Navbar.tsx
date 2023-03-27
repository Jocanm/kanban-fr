import { Add, KeyboardArrowDown } from "@mui/icons-material";
import { AppBar, Box, Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LogoDark, LogoLight, LogoMobile } from "../../../assets";
import { useThemeContext } from "../../../config/theme/ThemeContext";
import { selectActiveBoard } from "../../../redux/reducers/boards/boards.selector";
import {
  setIsOptionsModalOpen,
  setShowNewTaskModal,
} from "../../../redux/reducers/ui/ui.reducer";
import {
  selectIsOptionsModalOpen,
  selectShowSidebar,
} from "../../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../../redux/store/store";
import { If } from "../../utils";
import { OptionsModal } from "../options-modal/OptionsModal";
import { BoardMenuOptions } from "./BoardMenuOptions";
import {
  ActiveBoardTitle,
  BaseNavContainer,
  CustomImg,
  CustomToolbar,
  ImageLogoContainer,
} from "./Navbar.styles";

const titleStackSx = {
  cursor: {
    xs: "pointer",
    md: "default",
  },
};

export const Navbar = () => {
  const { mode } = useThemeContext();
  const activeBoard = useSelector(selectActiveBoard);
  const showSidebar = useSelector(selectShowSidebar);
  const showOptions = useSelector(selectIsOptionsModalOpen);

  const logoSrc = mode === "light" ? LogoDark : LogoLight;

  const dispatch = useAppDispatch();

  const openOptions = () => dispatch(setIsOptionsModalOpen(true));
  const closeOptions = () => dispatch(setIsOptionsModalOpen(false));

  const disableNewTaskButton = () => {
    if (!activeBoard) return true;
    return activeBoard.columns.length === 0;
  };

  const openNewTaskModal = () => {
    dispatch(setShowNewTaskModal(true));
  };

  useEffect(() => {
    if (!activeBoard) return;
    closeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBoard]);

  return (
    <AppBar position="static">
      <CustomToolbar showSidebar={showSidebar}>
        <ImageLogoContainer showSidebar={showSidebar}>
          <img src={logoSrc} alt="logo" />
        </ImageLogoContainer>
        <BaseNavContainer showSidebar={showSidebar}>
          <Box display="flex" alignItems="center" gap={4}>
            <CustomImg src={LogoMobile} alt="logo" />
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              onClick={openOptions}
              sx={titleStackSx}
            >
              <If condition={activeBoard}>
                <ActiveBoardTitle variant="h6">
                  {activeBoard?.name}
                </ActiveBoardTitle>
              </If>
              <KeyboardArrowDown
                color="primary"
                sx={{
                  transform: showOptions ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease-in-out",
                  display: { md: "none" },
                }}
              />
            </Stack>
          </Box>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Button
              size="small"
              variant="contained"
              onClick={openNewTaskModal}
              disabled={disableNewTaskButton()}
            >
              <Add />
              <Box ml={1} display={{ xs: "none", md: "block" }}>
                Add New Task
              </Box>
            </Button>
            <If condition={activeBoard}>
              <BoardMenuOptions />
            </If>
          </Stack>
        </BaseNavContainer>
      </CustomToolbar>
      <OptionsModal isOpen={showOptions} onClose={closeOptions} />
    </AppBar>
  );
};
