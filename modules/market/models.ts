export interface IMarketHeader {
  banners: IMarketBanner[];
  book_topics: IMarketBookTopic[];
}

export interface IMarketBanner {
  id: number;
  title: string;
  image: string;
  type: string;
  book?: number;
  publisher?: IPublisher;
  collection?: number;
  slug?: string;
}

export interface IPublisher {
  id: number;
  name: string;
  logo: string;
}

export interface IMarketBookTopic {
  id: number;
  title: string;
  icon: string;
  icon_color: string;
}

export interface IMarketMainSectionList {
  id: number;
  title: string;
  content_type: string;
  card_type: string;
  has_order_number: boolean;
  books: IMarketBook[];
}

export interface IMarketBook {
  id: number;
  title: string;
  slug: string;
  image: string;
  avg_rating: number;
  authors: IMarketAuthor[];
  has_audiobook: boolean;
  has_ebook: boolean;
  is_premium: boolean;
  only_on_mutolaa: boolean;
  sale_percentage?: number;
}

export interface IMarketAuthor {
  id: number;
  name: string;
  image?: string;
}
