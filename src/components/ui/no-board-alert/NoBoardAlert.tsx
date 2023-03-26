import { Add } from "@mui/icons-material";
import { Button, Stack, Typography, Box } from "@mui/material";

interface Props {
  type: "board-empty" | "no-boards";
  onAction: () => void;
}

export const NoBoardAlert = ({ onAction, type }: Props) => {
  const buttonText =
    type === "board-empty" ? "Add New Column" : "Add New Board";

  const message =
    type === "board-empty"
      ? "This board is empty. Create a new column to get started."
      : "You don't have any boards yet. Create a new board to get started.";

  return (
    <Stack
      p={4}
      spacing={6}
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Typography
        variant="h6"
        fontWeight={700}
        textAlign="center"
        color="customGrey.main"
      >
        {message}
      </Typography>
      <Button variant="contained" startIcon={<Add />} onClick={onAction}>
        <Box textTransform="capitalize">{buttonText}</Box>
      </Button>
    </Stack>
  );
};
