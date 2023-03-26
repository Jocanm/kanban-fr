export interface CreateBoardBody {
  name: string;
  columns: string[];
}

export interface UpdateBoardBody {
  id: string;
  name: string;
  columns: {
    columnId?: string;
    columnName: string;
  }[];
}
