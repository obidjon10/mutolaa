"use client";

import { useCallback } from "react";
import type { ReactNode } from "react";

import { useAppDispatch } from "@/lib";

import { type ConfirmModalType,setConfirmModal } from "../store";
import { setConfirmRegistry } from "../utils/confirm-modal-registry";

interface IConfirmOptions {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmModalType;
  icon?: ReactNode;
  onConfirm: () => void | Promise<void>;
}

export const useConfirm = () => {
  const dispatch = useAppDispatch();

  return useCallback(
    (options: IConfirmOptions) => {
      // Blur the currently-focused element before opening so react-aria records
      // <body> as the focus-restore target. Without this, if the original
      // trigger gets removed (e.g. the deleted row is unmounted), react-aria
      // throws "Transition was aborted because of invalid state" when it tries
      // to restore focus on close.
      if (
        typeof document !== "undefined" &&
        document.activeElement instanceof HTMLElement
      ) {
        document.activeElement.blur();
      }

      setConfirmRegistry({
        onConfirm: options.onConfirm,
        icon: options.icon,
      });
      dispatch(
        setConfirmModal({
          visible: true,
          title: options.title,
          description: options.description ?? null,
          confirmText: options.confirmText ?? null,
          cancelText: options.cancelText ?? null,
          type: options.type ?? "delete",
        }),
      );
    },
    [dispatch],
  );
};
