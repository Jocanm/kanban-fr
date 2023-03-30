export interface Board {
  name: string;
  id: string;
  columns: Column[];
}

export interface Column {
  name: string;
  id: string;
  tasks: Task[];
  color: string;
}

export interface Task {
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
  id: string;
}

export interface Subtask {
  title: string;
  id: string;
  isCompleted: boolean;
}
