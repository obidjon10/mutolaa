import type { IPrice } from "@/modules/book-detail";

export type BookPaymentTabType = "card" | "provider";

export type BookSelectionType = "ebook" | "audio" | "both" | "none";

export type BookPurchaseItemType = "ebook" | "audiobook";

export interface ICoinSale {
  id: number;
  coin_amount: string;
  discount_percentage: number;
  is_active: boolean;
  created_at: string;
}

export interface IBookPurchaseSummary {
  id: number;
  slug: string;
  title: string;
  is_coin_sale_available: boolean;
}

export interface IBookPurchaseItem {
  type: BookPurchaseItemType;
  id: number;
  is_purchased: boolean;
  price: IPrice;
}

export interface IBookBundlePrice {
  total_price: number;
  total_sale_price: number;
  sale_percentage: number;
}

export interface IBookPurchaseData {
  book: IBookPurchaseSummary;
  available_payment_methods: string[];
  purchase_detail: IBookPurchaseItem[];
  bundle: IBookBundlePrice;
  coin_sales: ICoinSale[];
}

export const findPurchaseItem = (
  items: IBookPurchaseItem[] | undefined,
  type: BookPurchaseItemType,
): IBookPurchaseItem | undefined =>
  items?.find((item) => item.type === type);

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
