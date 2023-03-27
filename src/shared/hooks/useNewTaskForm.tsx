import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { addNewTask } from "../../redux/reducers/boards/boards.reducer";
import { useAppDispatch } from "../../redux/store/store";
import { stringRequired, stringOptional } from "../schemas/schemas";

const formSchema = yup.object({
  title: stringRequired,
  columnId: stringRequired,
  description: stringOptional,
  subtasks: yup
    .array()
    .of(
      yup.object({
        id: stringOptional,
        title: stringRequired,
      })
    )
    .required()
    .min(0),
});

export type NewTaskFormSchema = yup.InferType<typeof formSchema>;

export const useNewTaskForm = () => {
  const dispatch = useAppDispatch();

  const methods = useForm<NewTaskFormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      subtasks: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "subtasks",
  });

  const onSubmit = (data: NewTaskFormSchema) => {
    dispatch(
      addNewTask({
        title: data.title,
        columnId: data.columnId,
        description: data.description,
        subtasks: data.subtasks.map((subtask) => subtask.title),
      })
    );
  };

  return { methods, fields, append, remove, onSubmit };
};
