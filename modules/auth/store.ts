import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthStepType = "input" | "otp" | "profile";
export type AuthMethodType = "phone" | "email";

interface ITokensPayload {
  access: string;
  refresh: string;
}

interface IAuthState {
  phone: string;
  email: string;
  session: string;
  step: AuthStepType;
  method: AuthMethodType;
  accessToken: string | null;
  refreshToken: string | null;
  isHydrated: boolean;
  incomingPage?: string;
}

const initialState: IAuthState = {
  phone: "",
  email: "",
  session: "",
  step: "input",
  method: "phone",
  accessToken: null,
  refreshToken: null,
  isHydrated: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setPhone(state, action: PayloadAction<string>) {
      state.phone = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    setSession(state, action: PayloadAction<string>) {
      state.session = action.payload;
    },
    setStep(state, action: PayloadAction<AuthStepType>) {
      state.step = action.payload;
    },
    setMethod(state, action: PayloadAction<AuthMethodType>) {
      state.method = action.payload;
    },
    setTokens(state, action: PayloadAction<ITokensPayload>) {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
    clearTokens(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
    setHydrated(state, action: PayloadAction<boolean>) {
      state.isHydrated = action.payload;
    },
    setIncomingPage(state, action: PayloadAction<string>) {
      state.incomingPage = action.payload;
    },
    resetAuth(state) {
      const { accessToken, refreshToken, isHydrated } = state;
      return {
        ...initialState,
        accessToken,
        refreshToken,
        isHydrated,
      };
    },
  },
});

export const {
  setPhone,
  setEmail,
  setSession,
  setStep,
  setMethod,
  setTokens,
  clearTokens,
  setHydrated,
  resetAuth,
  setIncomingPage,
} = authSlice.actions;
