import { Add, KeyboardArrowDown } from "@mui/icons-material";
import { AppBar, Box, Button, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { LogoDark, LogoLight, LogoMobile } from "../../../assets";
import { useThemeContext } from "../../../config/theme/ThemeContext";
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

export const ImageLogoContainer = styled("div")(({ theme }) => ({
  display: "none",
  alignItems: "center",
  minWidth: "16.3rem",
  paddingLeft: theme.spacing(6),
  [theme.breakpoints.up("md")]: {
    display: "flex",
    height: 96,
  },
  [theme.breakpoints.up("lg")]: {
    minWidth: "18.75rem",
  },
}));

export const Navbar = () => {
  const { mode } = useThemeContext();
  const activeBoard = useSelector(selectActiveBoard);
  const showOptions = useSelector(selectIsOptionsModalOpen);

  const logoSrc = mode === "light" ? LogoDark : LogoLight;

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
      <Toolbar
        sx={({ palette }) => ({
          px: 4,
          pl: { md: 0 },
          height: {
            xs: "8vh",
            md: "10vh",
            borderBottom: `1px solid ${
              palette.mode === "dark" ? "#fff2" : palette.lines.light
            }`,
          },
        })}
        disableGutters
      >
        <ImageLogoContainer>
          <img src={logoSrc} alt="logo" />
        </ImageLogoContainer>
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
                  textOverflow="ellipsis"
                  overflow="hidden"
                  width="100%"
                  maxWidth={{
                    xs: "8rem",
                    sm: "16rem",
                    md: "30rem",
                    lg: "40rem",
                    xl: "60rem",
                  }}
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
