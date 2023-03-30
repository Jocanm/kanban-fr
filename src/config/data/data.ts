import { nanoid } from "@reduxjs/toolkit";
import { getColorByIndex } from "../../helpers/getColumnColor";
import { Board } from "../interfaces/board.interface";

const pendingId = nanoid();
const inProgressId = nanoid();
const completedId = nanoid();

export const data: Board[] = [
  {
    id: nanoid(),
    name: "Kanban Project",
    columns: [
      {
        id: pendingId,
        name: "Pending",
        color: getColorByIndex(0),
        tasks: Array.from({ length: 3 }, (_, i) => ({
          title: `Task pending ${i + 1}`,
          id: nanoid(),
          description: "Task title",
          status: pendingId,
          subtasks: [],
        })),
      },
      {
        id: inProgressId,
        name: "In Progress",
        color: getColorByIndex(1),
        tasks: Array.from({ length: 6 }, (_, i) => ({
          title: `Task in progress ${i + 1}`,
          id: nanoid(),
          description: "Task title",
          status: inProgressId,
          subtasks: [],
        })),
      },
      {
        id: completedId,
        name: "Completed",
        color: getColorByIndex(2),
        tasks: Array.from({ length: 8 }, (_, i) => ({
          title: `Task completed ${i + 1}`,
          id: nanoid(),
          description: "Task title",
          status: completedId,
          subtasks: [],
        })),
      },
    ],
  },
];
