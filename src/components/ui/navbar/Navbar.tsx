import { Add, KeyboardArrowDown, MoreVert } from "@mui/icons-material";
import { AppBar, Box, Button, IconButton, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { LogoMobile } from "../../../assets";
import { selectActiveBoard } from "../../../redux/reducers/boards.selector";
import { If } from "../../utils";
import { OptionsModal } from "../options-modal/OptionsModal";

const CustomImg = styled("img")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    display: "none",
  },
}));

export const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const activeBoard = useSelector(selectActiveBoard);

  const openOptions = () => setShowOptions(true);
  const closeOptions = () => setShowOptions(false);

  const disableNewTaskButton = () => {
    if (!activeBoard) return true;
    return activeBoard.columns.length === 0;
  };

  useEffect(() => {
    if (!activeBoard) return;
    closeOptions();
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
              variant="contained"
              disabled={disableNewTaskButton()}
              size="small"
            >
              <Add />
              <Box
                ml={1}
                textTransform="capitalize"
                display={{ xs: "none", md: "block" }}
              >
                Add New Task
              </Box>
            </Button>
            <If condition={activeBoard}>
              <IconButton size="small">
                <MoreVert />
              </IconButton>
            </If>
          </Stack>
        </Stack>
      </Toolbar>
      <OptionsModal isOpen={showOptions} onClose={closeOptions} />
    </AppBar>
  );
};
