import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { BookPaymentTabType } from "./models";

interface IState {
  activeTab: BookPaymentTabType;
  provider: string | null;
  activeCardId: number | null;
  isCoinSaleOn: boolean;
  selectedCoinSaleId: number | null;
}

const initialState: IState = {
  activeTab: "card",
  provider: null,
  activeCardId: null,
  isCoinSaleOn: false,
  selectedCoinSaleId: null,
};

export const bookPaymentSlice = createSlice({
  name: "bookPayment",
  initialState,
  reducers: {
    setBookPaymentActiveTab(state, action: PayloadAction<BookPaymentTabType>) {
      state.activeTab = action.payload;
    },
    setBookPaymentProvider(state, action: PayloadAction<string | null>) {
      state.provider = action.payload;
    },
    setBookPaymentActiveCardId(state, action: PayloadAction<number | null>) {
      state.activeCardId = action.payload;
    },
    setIsCoinSaleOn(state, action: PayloadAction<boolean>) {
      state.isCoinSaleOn = action.payload;
      if (!action.payload) state.selectedCoinSaleId = null;
    },
    setSelectedCoinSaleId(state, action: PayloadAction<number | null>) {
      state.selectedCoinSaleId = action.payload;
    },
    resetBookPayment: () => initialState,
  },
});

export const {
  setBookPaymentActiveTab,
  setBookPaymentProvider,
  setBookPaymentActiveCardId,
  setIsCoinSaleOn,
  setSelectedCoinSaleId,
  resetBookPayment,
} = bookPaymentSlice.actions;
