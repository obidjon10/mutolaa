import { configureStore, createSlice } from "@reduxjs/toolkit";

import { authSlice } from "@/modules/auth";
import { bookPaymentSlice } from "@/modules/book-payment";
import { commonSlice } from "@/modules/common/store";
import { paymentSlice } from "@/modules/payment";

const appSlice = createSlice({
  name: "app",
  initialState: {},
  reducers: {},
});

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    auth: authSlice.reducer,
    payment: paymentSlice.reducer,
    bookPayment: bookPaymentSlice.reducer,
    common: commonSlice.reducer,
  },
});

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatchType = typeof store.dispatch;
