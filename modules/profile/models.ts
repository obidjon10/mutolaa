import type { ICountry, IRegion } from "@/modules/common";

export interface IUserDetail {
  id: number;
  full_name: string;
  avatar: string;
  phone: string;
  email: string;
  birth_date: string;
  push_notifications: boolean;
  is_premium: boolean;
  coin_amount: number;
  country: ICountry;
  region: IRegion;
  gender: string;
  job_key: string;
  job: string;
  premium_end_days: number;
  premium_expires_at: string;
  has_subscription: boolean;
  show_manage_subscription: boolean;
}
