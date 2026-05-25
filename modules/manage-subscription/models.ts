import type {
  SubscriptionStateType,
  SubscriptionStatusType,
} from "./constants";

export interface ISubscriptionTariff {
  id: number;
  name: string;
  price: string;
  duration: number;
  is_active: boolean;
}

export interface ISubscriptionCardBank {
  id: number;
  name: string;
}

export interface ISubscriptionCard {
  id: number;
  card_number: string;
  card_type: string;
  bank: ISubscriptionCardBank;
  insufficient_balance: boolean;
}

export interface ISubscriptionPeriod {
  status: string;
  date_time: string;
  total_days: number | null;
  passed_days: number | null;
}

export interface ISubscriptionPeriods {
  next_payment_period: ISubscriptionPeriod | null;
  subscription_cancel_period: ISubscriptionPeriod | null;
  subscription_validity_period: ISubscriptionPeriod | null;
}

export interface ISubscriptionDetail {
  id: number;
  status: SubscriptionStatusType;
  subscription_state: SubscriptionStateType;
  tariff: ISubscriptionTariff;
  card: ISubscriptionCard | null;
  start_time: string;
  end_time: string;
  cancel_remaining_day: number | null;
  periods: ISubscriptionPeriods;
}

export interface ICancelReason {
  id: number;
  content: string;
}

export interface ICancelSubscriptionPayload {
  subscription_id: number;
  cancel_reason?: number;
  cancel_reason_text?: string;
}

export interface IChangeSubscriptionPayload {
  tariff?: number;
  card?: number;
}
