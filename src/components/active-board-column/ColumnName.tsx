import { Box, Stack, Typography } from "@mui/material";
import { getColorByIndex } from "../../helpers/getColumnColor";

interface Props {
  name: string;
  tasksLength: number;
  index: number;
}

export const ColumnName = ({ index, name, tasksLength }: Props) => {
  return (
    <Stack
      mb={6}
      spacing={2}
      direction="row"
      minHeight="1.25rem"
      alignItems="center"
    >
      <Box
        borderRadius="50%"
        minWidth=".9375rem"
        minHeight=".9375rem"
        bgcolor={getColorByIndex(index)}
      />
      <Typography
        variant="body2"
        fontWeight={600}
        letterSpacing={2}
        color="customGrey.main"
      >
        {`${name} (${tasksLength})`}
      </Typography>
    </Stack>
  );
};
