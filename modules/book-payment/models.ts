export type BookPaymentTabType = "card" | "provider";

export type BookSelectionType = "ebook" | "audio" | "both" | "none";

export interface ICoinSale {
  id: number;
  coin_amount: string;
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

export interface IPurchaseBookPayload {
  book: number;
  audiobook?: number | null;
  ebook?: number | null;
  coin_sale?: number | null;
  card: number;
}

export interface IBookOrderCreatePayload {
  book: number;
  audiobook?: number | null;
  ebook?: number | null;
  provider: string;
}

export interface IBookOrderResponse {
  id: number;
  payment_url: string;
}
