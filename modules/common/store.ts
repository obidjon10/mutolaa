import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { IUser } from "@/modules/auth";

export type ConfirmModalType = "delete" | "warning" | "info";

export interface IConfirmModalState {
  visible: boolean;
  title?: string | null;
  description?: string | null;
  confirmText?: string | null;
  cancelText?: string | null;
  type?: ConfirmModalType;
}

interface IState {
  user: IUser | null;
  authRequiredModal: {
    visible: boolean;
    title?: string | null;
    incomingPage?: string;
  };
  confirmModal: IConfirmModalState;
}

const initialConfirmModal: IConfirmModalState = {
  visible: false,
  title: null,
  description: null,
  confirmText: null,
  cancelText: null,
  type: "delete",
};

const initialState: IState = {
  user: null,
  authRequiredModal: {
    visible: false,
  },
  confirmModal: initialConfirmModal,
};

export const commonSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser | null>) {
      state.user = action.payload;
    },
    setAuthRequiredModal(
      state,
      {
        payload,
      }: PayloadAction<{
        visible: boolean;
        title?: string | null;
        incomingPage?: string;
      }>,
    ) {
      state.authRequiredModal = payload;
    },
    setConfirmModal(state, { payload }: PayloadAction<IConfirmModalState>) {
      state.confirmModal = { ...initialConfirmModal, ...payload };
    },
    closeConfirmModal(state) {
      // Only flip visibility — keep title/description/type so the content
      // stays visible during the modal's exit animation. Next `setConfirmModal`
      // dispatch will overwrite these fields.
      state.confirmModal.visible = false;
    },
  },
});

export const {
  setUser,
  setAuthRequiredModal,
  setConfirmModal,
  closeConfirmModal,
} = commonSlice.actions;
