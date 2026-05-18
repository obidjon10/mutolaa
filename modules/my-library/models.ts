export interface IListCount {
  bookshelf_count: number;
  read_book_count: number;
  finished_book_count: number;
  plan_to_read_count: number;
}

export interface IShelf {
  id: number;
  name: string;
  wallpaper: string[];
}
