import { IAuthor, IBook } from "../common";
import { IStreak } from "../streak";

export enum ContentTypeEnum {
  BookBucket = "book_bucket",
  Collection = "collection",
  Author = "author",
  Banner = "banner",
  TopBooks = "top_books",
}

export interface IHomeBook {
  id: number;
  title: string;
  image: string;
  slug: string;
  authors?: IAuthor[];
  has_ebook?: boolean;
  is_premium?: boolean;
  has_audiobook?: boolean;
  discount_percentage?: number;
}

export interface IHomeBanner {
  id: number;
  title: string;
  image: string;
  type: string;
  object_id: number;
  external_link: string;
}

export interface IHomeCollection {
  id: number;
  title: string;
  image: string;
  cover_image: string;
  color_code: string;
}

export interface IHomeAuthor {
  id: number;
  name: string;
  image: string;
  book_count: number;
}

export interface IHomeTopBooks {
  title: string;
  books: IHomeBook[];
}

interface IHomeSectionBase {
  id: number;
  title: string;
  list_url?: string;
  book_bucket_id?: number;
}

export interface IHomeSectionTopBooks extends IHomeSectionBase {
  content_type: ContentTypeEnum.TopBooks;
  content: IHomeTopBooks[];
}

export interface IHomeSectionBookBucket extends IHomeSectionBase {
  content_type: ContentTypeEnum.BookBucket;
  content: IHomeBook[];
}

export interface IHomeSectionBanner extends IHomeSectionBase {
  content_type: ContentTypeEnum.Banner;
  content: IHomeBanner[];
}

export interface IHomeSectionCollection extends IHomeSectionBase {
  content_type: ContentTypeEnum.Collection;
  content: IHomeCollection[];
}

export interface IHomeSectionAuthor extends IHomeSectionBase {
  content_type: ContentTypeEnum.Author;
  content: IHomeAuthor[];
}

export type HomeSectionType =
  | IHomeSectionTopBooks
  | IHomeSectionBookBucket
  | IHomeSectionBanner
  | IHomeSectionCollection
  | IHomeSectionAuthor;

export interface IDiscoverSectionListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: HomeSectionType[];
}

export interface ICategory {
  id: number;
  title: string;
  icon: string;
}

export interface IFeaturedBooks {
  id: number;
  title: string;
  slug: string;
  image: string;
}

export interface IHeader {
  last_read_book: ILastReadBook | null;
  streak: IStreak | null;
  categories: ICategory[];
}

export interface ILastReadBook {
  book: IBook;
  finished_percentage: number;
}
