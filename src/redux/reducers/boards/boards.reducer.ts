// import { current } from "@reduxjs/toolkit";
import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { data } from "../../../config/data/data";
import {
  Board,
  Column,
  Task,
} from "../../../config/interfaces/board.interface";
import { arrayInsert } from "../../../helpers/arrayInsert";
import { getColorByIndex } from "../../../helpers/getColumnColor";
import {
  CreateBoardBody,
  CreateTaskBody,
  UpdateBoardBody,
  UpdateTaskBody,
} from "./request.interfaces";

interface InitialState {
  boards: Board[];
  activeBoard: Board | null;
  activeTask: Task | null;
}

const initialState: InitialState = {
  boards: data,
  activeTask: null,
  activeBoard: null,
};

export const boardsReducer = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setActiveBoard: (state, action: PayloadAction<Board | null>) => {
      state.activeBoard = action.payload;
    },
    setActiveTask: (state, action: PayloadAction<Task | null>) => {
      state.activeTask = action.payload;
    },
    addNewBoard: (state, { payload }: PayloadAction<CreateBoardBody>) => {
      const columns: Board["columns"] = payload.columns.map(
        (column, index) => ({
          tasks: [],
          id: nanoid(),
          name: column,
          color: getColorByIndex(index),
        })
      );

      const board: Board = {
        columns,
        id: nanoid(),
        name: payload.name,
      };

      state.boards.unshift(board);
      state.activeBoard = board;
    },
    deleteBoard: (state, { payload }: PayloadAction<string>) => {
      state.boards = state.boards.filter((board) => board.id !== payload);

      const [firstBoard] = state.boards;
      firstBoard
        ? (state.activeBoard = firstBoard)
        : (state.activeBoard = null);
    },
    updateBoard: (state, { payload }: PayloadAction<UpdateBoardBody>) => {
      const board = state.boards.find(
        (boardItem) => boardItem.id === payload.id
      );
      if (!board) return;
      const columnsTasks: Record<string, Task[]> = {};

      board.columns.forEach((column) => {
        columnsTasks[column.id] = column.tasks;
      });

      const newColumns: Column[] = payload.columns.map((column, index) => ({
        id: column.columnId ?? nanoid(),
        name: column.columnName,
        tasks: column.columnId ? columnsTasks[column.columnId] || [] : [],
        color: getColorByIndex(index),
      }));

      board.name = payload.name;
      board.columns = newColumns;
      state.activeBoard = board;
    },
    addNewTask: (state, { payload }: PayloadAction<CreateTaskBody>) => {
      if (!state.activeBoard) return;

      const column = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.columnId
      );

      if (!column) return;

      const subtasks: Task["subtasks"] = payload.subtasks.map((subtask) => ({
        id: nanoid(),
        title: subtask,
        isCompleted: false,
      }));

      const task: Task = {
        subtasks,
        id: nanoid(),
        status: column.id,
        title: payload.title,
        description: payload.description || "",
      };

      column.tasks.push(task);

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    updateTask: (state, { payload }: PayloadAction<UpdateTaskBody>) => {
      if (!state.activeBoard) return;

      const allTasks = state.activeBoard.columns.reduce<Task[]>(
        (acc, column) => [...acc, ...column.tasks],
        []
      );

      const task = allTasks.find((taskItem) => taskItem.id === payload.id);

      if (!task) return;

      const subtasks: Task["subtasks"] = payload.subtasks.map((subtask) => ({
        title: subtask.title,
        id: subtask.id ?? nanoid(),
        isCompleted: subtask.isCompleted,
      }));

      task.title = payload.title;
      task.description = payload.description || "";
      task.subtasks = subtasks;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    completeSubtask: (state, { payload }: PayloadAction<string>) => {
      if (!state.activeTask || !state.activeBoard) return;

      const activeTaskColumn = state.activeBoard.columns.find(
        (column) => column.id === state.activeTask?.status
      );

      const subtask = state.activeTask.subtasks.find(
        (subtaskItem) => subtaskItem.id === payload
      );

      if (!subtask || !activeTaskColumn) return;

      subtask.isCompleted = !subtask.isCompleted;
      activeTaskColumn.tasks.forEach((task) => {
        if (task.id !== state.activeTask?.id) return;
        task.subtasks = state.activeTask.subtasks;
      });

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    changeTaskStatus: (state, { payload }: PayloadAction<string>) => {
      if (!state.activeTask || !state.activeBoard) return;

      if (state.activeTask.status === payload) return;

      const columnSelected = state.activeBoard.columns.find(
        (column) => column.id === payload
      );

      const columnActiveTask = state.activeBoard.columns.find(
        (column) => column.id === state.activeTask?.status
      );

      if (!columnSelected || !columnActiveTask) return;

      columnActiveTask.tasks = columnActiveTask.tasks.filter(
        (task) => task.id !== state.activeTask?.id
      );

      columnSelected.tasks.push(state.activeTask);
      state.activeTask.status = columnSelected.id;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    deleteTask: (state, { payload }: PayloadAction<Task>) => {
      if (!state.activeBoard) return;

      const column = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.status
      );

      if (!column) return;

      column.tasks = column.tasks.filter((task) => task.id !== payload.id);

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    setColumnsOder: (state, { payload }: PayloadAction<Column[]>) => {
      if (!state.activeBoard) return;

      state.activeBoard.columns = payload;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    setTasksOrder: (state, { payload }: PayloadAction<Task[]>) => {
      if (!state.activeBoard || !state.activeBoard) return;
      const columnId = payload[0]?.status;

      const column = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === columnId
      );

      if (!column) return;

      column.tasks = payload;

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
    setTaskStatusWithDrag: (
      state,
      {
        payload,
      }: PayloadAction<{
        taskId: string;
        oldColumnId: string;
        newColumnId: string;
        newPosition: number;
      }>
    ) => {
      if (!state.activeBoard) return;

      const oldColumn = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.oldColumnId
      );

      const newColumn = state.activeBoard.columns.find(
        (columnItem) => columnItem.id === payload.newColumnId
      );

      if (!oldColumn || !newColumn) return;

      const task = oldColumn.tasks.find(
        (taskItem) => taskItem.id === payload.taskId
      );

      if (!task) return;

      task.status = newColumn.id;

      oldColumn.tasks = oldColumn.tasks.filter(
        (taskItem) => taskItem.id !== payload.taskId
      );

      newColumn.tasks = arrayInsert(newColumn.tasks, task, payload.newPosition);

      state.boards.forEach((board) => {
        if (board.id !== state.activeBoard?.id) return;
        board.columns = state.activeBoard.columns;
      });
    },
  },
});

export const {
  addNewTask,
  deleteTask,
  updateTask,
  addNewBoard,
  deleteBoard,
  updateBoard,
  setTasksOrder,
  setActiveTask,
  setColumnsOder,
  setActiveBoard,
  completeSubtask,
  changeTaskStatus,
  setTaskStatusWithDrag,
} = boardsReducer.actions;
