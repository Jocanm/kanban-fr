import { Close } from "@mui/icons-material";
import { Stack, Typography, Box } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { NewBoardFormSchema } from "../../shared/hooks/useNewBoardForm";
import { MyInput } from "../my-input/MyInput";
import { For } from "../utils/For";

interface BoardColumnsProps {
  fields: Record<"id", string>[];
  methods: UseFormReturn<NewBoardFormSchema>;
  onRemove: (index: number) => void;
}

export const BoardColumns = ({
  fields,
  methods,
  onRemove,
}: BoardColumnsProps) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={700}>
        Board Columns
      </Typography>
      <For
        each={fields}
        render={(field, index) => {
          const hasError = !!methods.formState.errors.boardColumns?.[index];
          const iconSx = {
            cursor: "pointer",
            mb: hasError ? "23px" : 0,
            color: "customGrey.main",
            "&:hover": {
              color: "error.main",
            },
          };
          return (
            <Box gap={3} key={field.id} display="flex" alignItems="center">
              <MyInput
                fullWidth
                error={hasError}
                name={`boardColumns.${index}.columnName` as never}
              />
              <Close sx={iconSx} onClick={() => onRemove(index)} />
            </Box>
          );
        }}
      />
    </Stack>
  );
};
