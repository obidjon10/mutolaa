export interface IBookDetail {
  id: number;
  title: string;
  slug: string;
  image: string;
  is_premium: boolean;
  only_on_mutolaa: boolean;
  avg_rating: number;
  authors: IAuthor[];
  has_audiobook: boolean;
  has_ebook: boolean;
  description: string;
  categories: ICategory[];
  dubber: IDubber[];
  age: IAge;
  discussion_url: any;
  reviews_count: number;
  all_duration: number;
  plan_to_read_count: number;
  reading_now_count: number;
  ebook_fragment: any;
  audiobook_fragment: any;
  ebook: IEbook;
  audiobook: IAudiobook;
  price: IPriceTotal;
  has_saved: boolean;
  user_book_rights: IUserBookRights;
}

export interface IEbook {
  id: number;
  price: IPrice;
  file: any;
  encrypted_file: any;
  finished_percentage: any;
  file_size: number;
}

export interface IPrice {
  original_price: number;
  sale_price: number;
  sale_percentage: number;
}

export interface IPriceTotal {
  total_price: number;
  total_sale_price: number;
  sale_percentage: number;
}

export interface IAudiobook {
  id: number
  price: IPrice
  duration: number
  files: IFile[]
  has_sound_effect: boolean
  use_background_music: boolean
  finished_percentage: any
}

export interface IAuthor {
  id: number;
  name: string;
  image: string;
}

export interface ICategory {
  id: number;
  title: string;
  icon: string;
}

export interface IDubber {
  id: number;
  name: string;
  image: any;
}

export interface IAge {
  id: number;
  minimum_allowed_age: number;
}

export interface IReview {
  id: number;
  user: IUser;
  rating: number;
  comment: string;
  moderation_status: string;
  has_user_commented: boolean;
  is_mine: boolean;
  created_at: string;
}

interface IUser {
  id: number;
  avatar: string;
  full_name: string;
}
export interface IUserBookRights {
  has_ebook_access: boolean;
  has_audiobook_access: boolean;
  is_ebook_purchased: boolean;
  is_audiobook_purchased: boolean;
}

export interface IFile {
  id: number
  title: string
  duration: number
  file: string
  encrypted_file: string
  encrypted_file_with_sound_effect: string
  file_with_sound_effect: string
  hls_playlist_file: string
  hls_playlist_file_with_sound_effect: string
  finished_percentage: number
  file_size: number
  file_with_sound_effect_size: number
  order: number
}