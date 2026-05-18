import { ReactNode } from "react";

export interface IPremiumFeatures {
  id: number;
  icon: string | ReactNode;
  color?: string;
  title: string;
  description: string;
}

export interface ICorporateLead {
  full_name: string;
  company_name: string;
  team_size: string;
  phone: string;
  message: string;
}

export interface IPremiumPlans {
  id: number;
  name: string;
  price: string;
  duration: number;
  description_list: string[];
  monthly_price: number;
  saved_money_percentage: number;
}
