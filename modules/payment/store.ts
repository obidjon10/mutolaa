import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { IPremiumPlans } from "../premium";

export type AuthStepType = "input" | "otp" | "profile";
export type AuthMethodType = "phone" | "email";

export type PaymentTabType = "subscribe" | "one_time_payment";

interface IState {
  plan?: IPremiumPlans | null;
  provider: string | null;
  activeTab: PaymentTabType;
  activeCardId: number | null;
}

const initialState: IState = {
  plan: null,
  provider: null,
  activeTab: "subscribe",
  activeCardId: null,
};

export const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    setPlan(state, action: PayloadAction<IPremiumPlans | undefined>) {
      state.plan = action.payload;
    },
    setProvider(state, action: PayloadAction<string>) {
      state.provider = action.payload;
    },
    setActiveTab(state, action: PayloadAction<PaymentTabType>) {
      state.activeTab = action.payload;
    },
    setActiveCardId(state, action: PayloadAction<number | null>) {
      state.activeCardId = action.payload;
    },
  },
});

export const { setPlan, setProvider, setActiveTab, setActiveCardId } =
  paymentSlice.actions;
