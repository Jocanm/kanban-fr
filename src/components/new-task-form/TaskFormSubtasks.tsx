import { KeyboardArrowDown, Close } from "@mui/icons-material";
import { Stack, Typography, Button, Box } from "@mui/material";
import { UseFormReturn } from "react-hook-form";
import { NewTaskFormSchema } from "../../shared/hooks/useNewTaskForm";
import { MyInput } from "../my-input/MyInput";
import { For } from "../utils/For";

interface Props {
  fields: Record<"id", string>[];
  remove: (index: number) => void;
  append: (value: NewTaskFormSchema["subtasks"][number]) => void;
  methods: UseFormReturn<NewTaskFormSchema>;
}

export const TaskFormSubtasks = ({
  fields,
  methods,
  append,
  remove,
}: Props) => {
  return (
    <Stack spacing={2}>
      <Typography variant="subtitle2" fontWeight={700}>
        Subtasks
      </Typography>
      <For
        each={fields}
        render={(field, index) => {
          const hasError = !!methods.formState.errors.subtasks?.[index];
          const iconSx = {
            cursor: "pointer",
            mb: hasError ? "23px" : 0,
            color: "customGrey.main",
          };
          return (
            <Stack
              key={field.id}
              spacing={2}
              direction="row"
              alignItems="center"
            >
              <MyInput
                error={hasError}
                name={`subtasks.${index}.title`}
                placeholder="e.g. Take a break"
                sx={{ flexGrow: 1 }}
              />
              <Close sx={iconSx} onClick={() => remove(index)} />
            </Stack>
          );
        }}
      />
      <Box>
        <Button
          fullWidth
          color="secondary"
          variant="contained"
          onClick={() => append({ title: "" })}
          sx={{ mt: 2 }}
        >
          Add New Subtask
        </Button>
      </Box>
    </Stack>
  );
};
