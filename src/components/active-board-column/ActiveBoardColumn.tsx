import { Stack } from "@mui/material";
import { Column } from "../../config/interfaces/board.interface";

interface Props {
  column: Column;
}

export const ActiveBoardColumn = ({ column }: Props) => {
  return (
    <Stack>
      <div>{column?.id}</div>
    </Stack>
  );
};
