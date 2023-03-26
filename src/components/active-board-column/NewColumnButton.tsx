import { Add } from "@mui/icons-material";
import { Box, CardActionArea, Stack, Typography } from "@mui/material";
import {
  setIsNewBoardModalEditMode,
  setIsNewBoardModalOpen,
} from "../../redux/reducers/ui/ui.reducer";
import { useAppDispatch } from "../../redux/store/store";

export const NewColumnButton = () => {
  const dispatch = useAppDispatch();

  const handleOpenEditBoardModal = () => {
    dispatch(setIsNewBoardModalOpen(true));
    dispatch(setIsNewBoardModalEditMode(true));
  };

  return (
    <Box
      top="3rem"
      display="flex"
      alignItems="center"
      justifyContent="center"
      minWidth={{ xs: "13rem", md: "17.5rem" }}
      position="relative"
      borderRadius=".375rem"
      height="calc(100% - 3rem)"
      color="customGrey.main"
      sx={(theme) => ({
        cursor: "pointer",
        background:
          theme.palette.mode === "dark"
            ? "linear-gradient(180deg, rgba(43, 44, 55, 0.25) 0%, rgba(43, 44, 55, 0.125) 100%);"
            : "linear-gradient(180deg, #E9EFFA 0%, rgba(233, 239, 250, 0.5) 100%)",
        "&:hover .new-column-button": {
          color: theme.palette.primary.main,
        },
      })}
      onClick={handleOpenEditBoardModal}
    >
      <CardActionArea sx={{ height: "100%", borderRadius: ".375rem" }}>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          justifyContent="center"
          className="new-column-button"
          sx={{ transition: "color .2s ease-in-out" }}
        >
          <Add
            sx={{
              fontSize: {
                xs: "2.5rem",
                md: "2rem",
              },
            }}
          />
          <Typography
            variant="h5"
            component="h2"
            fontWeight={600}
            letterSpacing={2}
            color="inherit"
            display={{ xs: "none", md: "block" }}
          >
            New Column
          </Typography>
        </Stack>
      </CardActionArea>
    </Box>
  );
};
