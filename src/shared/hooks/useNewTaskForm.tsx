import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, useFieldArray } from "react-hook-form";
import * as yup from "yup";
import { Task } from "../../config/interfaces/board.interface";
import {
  addNewTask,
  changeTaskStatus,
  updateTask,
} from "../../redux/reducers/boards/boards.reducer";
import { UpdateTaskBody } from "../../redux/reducers/boards/request.interfaces";
import { useAppDispatch } from "../../redux/store/store";
import {
  stringRequired,
  stringOptional,
  booleanOptional,
} from "../schemas/schemas";

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
        isCompleted: booleanOptional,
      })
    )
    .required()
    .min(0),
});

export type NewTaskFormSchema = yup.InferType<typeof formSchema>;

interface Props {
  activeTask: Task | null;
}

export const useNewTaskForm = ({ activeTask }: Props) => {
  const dispatch = useAppDispatch();

  const methods = useForm<NewTaskFormSchema>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      subtasks: activeTask
        ? activeTask.subtasks.map((item) => ({
            id: item.id,
            title: item.title,
            isCompleted: item.isCompleted,
          }))
        : [],
      columnId: activeTask ? activeTask.status : undefined,
      title: activeTask ? activeTask.title : "",
      description: activeTask ? activeTask.description : "",
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "subtasks",
  });

  const onCreateTask = (data: NewTaskFormSchema) => {
    dispatch(
      addNewTask({
        title: data.title,
        columnId: data.columnId,
        description: data.description,
        subtasks: data.subtasks.map((subtask) => subtask.title),
      })
    );
  };

  const onUpdateTask = (data: NewTaskFormSchema) => {
    if (!activeTask) return;

    const subtasks: UpdateTaskBody["subtasks"] = data.subtasks.map(
      (subtask) => ({
        id: subtask.id,
        title: subtask.title,
        isCompleted: subtask.isCompleted || false,
      })
    );

    dispatch(
      updateTask({
        subtasks,
        id: activeTask.id,
        columnId: data.columnId,
        title: data.title,
        description: data.description,
      })
    );

    dispatch(changeTaskStatus(data.columnId));
  };

  const onSubmit = (data: NewTaskFormSchema) =>
    activeTask ? onUpdateTask(data) : onCreateTask(data);

  return { methods, fields, append, remove, onSubmit };
};
