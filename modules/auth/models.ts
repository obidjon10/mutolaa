export interface ISendCodeResponse {
  session: string;
}

export interface ILoginRequest {
  phone?: string;
  email?: string;
  device_id: string;
  code: string;
  session: string;
}

export interface IUser {
  id: number;
  full_name: string;
  avatar: string;
  phone: string;
  email: string;
  push_notifications: boolean;
  is_premium: boolean;
  coin_amount: number;
}

export interface ICountry {
  id: number;
  name: string;
}

export interface IRegion {
  id: number;
  name: string;
  soato: string;
  level: number;
  parent: IRegionParent;
}

export interface IRegionParent {
  id: number;
  name: string;
  soato: string;
  level: number;
  parent: IRegionParent | null;
}

export interface IUsingOfflineModeValidDates {
  start: string;
  end: string;
}

export interface IBestPremiumTariffSuggestion {
  name: string;
  price: number;
  price_with_monthly_tariff_in_year: number;
  buy_premium_title: string;
  premium_book_cover_cart_title: string;
}

export interface ILoginResponse {
  refresh: string;
  access: string;
  user: IUser;
  user_accesses: unknown[];
  created: boolean;
}
