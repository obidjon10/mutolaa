export interface IBook {
  id: number;
  title: string;
  slug: string;
  image: string;
  authors: IAuthor[];
  has_audiobook: boolean;
  has_ebook: boolean;
  is_premium: boolean;
  only_on_mutolaa: boolean;
  sale_percentage: number;
}

export interface IAuthor {
  id: number;
  name: string;
  image: string;
  book_count?: number;
}
