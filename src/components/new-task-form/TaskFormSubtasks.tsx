import { KeyboardArrowDown } from "@mui/icons-material";
import { Stack, Typography, Button } from "@mui/material";
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
              direction="row"
              alignItems="center"
              spacing={2}
            >
              <MyInput
                error={hasError}
                name={`subtasks.${index}.title`}
                placeholder="e.g. Take a break"
                sx={{ flexGrow: 1 }}
              />
              <KeyboardArrowDown sx={iconSx} onClick={() => remove(index)} />
            </Stack>
          );
        }}
      />
      <Button
        color="secondary"
        variant="contained"
        onClick={() => append({ title: "" })}
      >
        Add New Subtask
      </Button>
    </Stack>
  );
};
