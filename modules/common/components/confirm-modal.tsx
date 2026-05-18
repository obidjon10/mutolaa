"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, toast } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib";
import {
  CircleQuestionIcon,
  ShieldExclamationIcon,
  TriangleExclamationIcon,
  XMarkIcon,
} from "@/modules/icons";

import { closeConfirmModal, type ConfirmModalType } from "../store";
import { getConfirmRegistry } from "../utils/confirm-modal-registry";

const TYPE_DEFAULTS: Record<
  ConfirmModalType,
  { icon: React.ReactNode; iconClass: string; confirmClass: string }
> = {
  delete: {
    icon: <TriangleExclamationIcon />,
    iconClass: "bg-muted dark:bg-muted-dark",
    confirmClass: "bg-red-500 text-white hover:bg-red-600",
  },
  warning: {
    icon: <ShieldExclamationIcon />,
    iconClass: "bg-amber-100 dark:bg-amber-500/10 text-amber-500",
    confirmClass: "bg-amber-500 text-white hover:bg-amber-600",
  },
  info: {
    icon: <CircleQuestionIcon />,
    iconClass: "bg-blue-100 dark:bg-blue-500/10 text-blue-500",
    confirmClass: "bg-blue-500 text-white hover:bg-blue-600",
  },
};

export const ConfirmModal = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const state = useAppSelector(({ common }) => common.confirmModal);
  const [isPending, setIsPending] = useState(false);

  const { visible, title, description, confirmText, cancelText } = state;
  const type: ConfirmModalType = state.type ?? "delete";
  const defaults = TYPE_DEFAULTS[type];
  const { icon: customIcon } = getConfirmRegistry();

  // Registry isn't cleared on close — content (icon, callback) stays alive
  // through the exit animation and gets overwritten on the next `confirm()`.
  const onClose = () => {
    if (isPending) return;
    dispatch(closeConfirmModal());
  };

  const handleConfirm = async () => {
    const { onConfirm } = getConfirmRegistry();
    if (!onConfirm) return onClose();

    setIsPending(true);
    try {
      await onConfirm();
      setIsPending(false);
      dispatch(closeConfirmModal());
    } catch (err) {
      setIsPending(false);
      const message =
        err instanceof Error ? err.message : t("xatolik_yuz_berdi");
      toast.danger(message);
    }
  };

  return (
    <Modal.Root
      isOpen={visible}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-120">
            {/* Always render content — Modal handles the show/hide via its
                own enter/exit animation. Gating on `visible` would clear the
                content immediately and leave the user looking at an empty
                dialog during the exit animation. */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div
                  className={`flex size-10 items-center justify-center rounded-full ${defaults.iconClass}`}
                >
                  {customIcon ?? defaults.icon}
                </div>
                <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                  <XMarkIcon size={16} />
                </Modal.CloseTrigger>
              </div>

              {title && <h2 className="font-medium mb-2">{title}</h2>}
              {description && (
                <p className="text-sm text-foreground-muted mb-5">{description}</p>
              )}

              <div className="flex gap-2 justify-end">
                <Button
                  variant="tertiary"
                  onPress={onClose}
                  isDisabled={isPending}
                  className="rounded-full"
                >
                  {cancelText ?? t("bekor_qilish")}
                </Button>
                <Button
                  isPending={isPending}
                  onPress={handleConfirm}
                  className={`rounded-full ${defaults.confirmClass}`}
                >
                  {confirmText ?? t("tasdiqlash")}
                </Button>
              </div>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
