import { yupResolver } from "@hookform/resolvers/yup";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { Board } from "../../config/interfaces/board.interface";
import {
  addNewBoard,
  updateBoard,
} from "../../redux/reducers/boards/boards.reducer";
import { stringRequired } from "../schemas/schemas";

interface Props {
  isEditMode: boolean;
  activeBoard: Board | null;
  afterSubmit?: () => void;
}

const formSchema = yup.object({
  boardName: stringRequired,
  boardColumns: yup.array().of(
    yup.object({
      columnName: stringRequired,
      columnId: yup.string().optional(),
    })
  ),
});

export type NewBoardFormSchema = yup.InferType<typeof formSchema>;

export const useNewBoardForm = ({
  isEditMode,
  activeBoard,
  afterSubmit,
}: Props) => {
  const dispatch = useDispatch();

  const methods = useForm<NewBoardFormSchema>({
    resolver: yupResolver(formSchema),
    values: {
      boardName: isEditMode && activeBoard ? activeBoard.name : "",
      boardColumns:
        isEditMode && activeBoard
          ? activeBoard.columns.map((column) => ({
              columnName: column.name,
              columnId: column.id,
            }))
          : [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: methods.control,
    name: "boardColumns" as never,
  });

  const createBoard = (data: NewBoardFormSchema) => {
    const columns = data.boardColumns?.map((column) => column.columnName) ?? [];
    dispatch(
      addNewBoard({
        columns,
        name: data.boardName,
      })
    );
  };

  const onUpdateBoard = (data: NewBoardFormSchema) => {
    if (!activeBoard) return;
    dispatch(
      updateBoard({
        id: activeBoard.id,
        name: data.boardName,
        columns: data.boardColumns ?? [],
      })
    );
  };

  const onSubmitForm = (data: NewBoardFormSchema) => {
    isEditMode ? onUpdateBoard(data) : createBoard(data);
    afterSubmit?.();
  };

  return {
    methods,
    fields,
    append,
    remove,
    onSubmitForm,
  };
};
