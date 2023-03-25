import { Stack } from "@mui/material";
import { Column } from "../../config/interfaces/board.interface";
import { CustomScrollBarObject } from "../../shared/css/css.global";
import { For } from "../utils/For";
import { ColumnName } from "./ColumnName";
import { ColumnTaskItem } from "./ColumnTaskItem";

interface Props {
  column: Column;
  index: number;
}

export const ActiveBoardColumn = ({ column, index }: Props) => {
  return (
    <Stack minWidth="17.5rem" maxWidth="17.5rem">
      <ColumnName
        index={index}
        name={column.name}
        tasksLength={column.tasks.length}
      />
      <Stack
        spacing={6}
        overflow="auto"
        height="100%"
        sx={(theme) => CustomScrollBarObject({ theme, hidden: true })}
      >
        <For
          each={column.tasks}
          render={(task) => <ColumnTaskItem task={task} />}
        />
      </Stack>
    </Stack>
  );
};
