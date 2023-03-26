import { Add, KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LogoMobile } from "../../../assets";
import { selectActiveBoard } from "../../../redux/reducers/boards/boards.selector";
import { setIsOptionsModalOpen } from "../../../redux/reducers/ui/ui.reducer";
import { selectIsOptionsModalOpen } from "../../../redux/reducers/ui/ui.selector";
import { useAppDispatch } from "../../../redux/store/store";
import { If } from "../../utils";
import { OptionsModal } from "../options-modal/OptionsModal";
import { BoardMenuOptions } from "./BoardMenuOptions";

const CustomImg = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  const activeBoard = useSelector(selectActiveBoard);
  const showOptions = useSelector(selectIsOptionsModalOpen);

  const dispatch = useAppDispatch();

  const openOptions = () => dispatch(setIsOptionsModalOpen(true));
  const closeOptions = () => dispatch(setIsOptionsModalOpen(false));

  const disableNewTaskButton = () => {
    if (!activeBoard) return true;
    return activeBoard.columns.length === 0;
  };

  useEffect(() => {
    if (!activeBoard) return;
    closeOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeBoard]);

  return (
    <AppBar position="static">
      <Toolbar sx={{ px: 4, py: { sm: 4, md: 6 } }} disableGutters>
        <Stack
          width="100%"
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center" gap={4}>
            <CustomImg src={LogoMobile} alt="logo" />
            <Stack
              spacing={1}
              direction="row"
              alignItems="center"
              onClick={openOptions}
              sx={{
                cursor: {
                  xs: "pointer",
                  md: "default",
                },
              }}
            >
              <If condition={activeBoard}>
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  fontSize={{
                    xs: "1rem",
                    sm: "1.25rem",
                  }}
                >
                  {activeBoard?.name}
                </Typography>
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
        </Stack>
      </Toolbar>
      <OptionsModal isOpen={showOptions} onClose={closeOptions} />
    </AppBar>
  );
};
