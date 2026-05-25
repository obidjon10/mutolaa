import type { TransactionContentType } from "./constants";

export interface ITransactionHistory {
  id: number;
  content_type: TransactionContentType;
  paid_at: string;
  order: IOrder | null;
}

export interface IOrder {
  amount: string;
  provider: string;
  book?: IOrderBook;
  wallet_amount?: string;
  provider_amount?: string;
  tariff_name?: string;
  card?: ICard;
}

export interface IOrderBook {
  id: number;
  title: string;
  is_ebook_purchased: boolean;
  is_audiobook_purchased: boolean;
}

export interface ICard {
  id: number;
  card_number: string;
  card_type: string;
}
