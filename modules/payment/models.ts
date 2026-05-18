export interface IPromoCodeResponse {
  id: number;
  code: string;
  discount_percent: number;
  tariff: {
    price: number;
    discount_price: number;
  };
}

export interface ICreateOrderResponse {
  id: number;
  tariff: number;
  provider: string;
  payment_url: string;
}

export interface ISubscribePremiumResponse {
  message: string;
  next_payment_time: string;
}

export interface ITransactionStatusResponse {
  id: number;
  status: string;
}
