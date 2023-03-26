export interface CreateBoardBody {
  name: string;
  columns: string[];
}

export interface UpdateBoardBody extends CreateBoardBody {
  id: string;
}
