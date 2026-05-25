"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@heroui/react";

import { XMarkIcon } from "@/modules/icons/x-mark-icon";

interface IProps {
  isOpen: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const CancelConfirmModal = ({ isOpen, onConfirm, onClose }: IProps) => {
  const t = useTranslations();

  return (
    <Modal.Root isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md p-6">
            <Modal.CloseTrigger className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-full bg-muted dark:bg-muted-dark text-foreground-muted hover:bg-gray-200 dark:hover:bg-white/10">
              <XMarkIcon size={16} />
            </Modal.CloseTrigger>

            <div className="flex size-10 items-center justify-center rounded-full bg-red-50 dark:bg-red-950/30 mb-4">
              <WarningIcon className="text-red-500" />
            </div>

            <h2 className="text-lg font-semibold">{t("obunani_bekor_qilish")}</h2>
            <p className="mt-1 text-sm text-foreground-muted">
              {t("chindan_ham_mavjud_obunangizni_bekor_qilmoqchimisiz")}
            </p>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button
                variant="tertiary"
                className="rounded-full"
                onPress={onConfirm}
              >
                {t("obunani_bekor_qilish")}
              </Button>
              <Button
                className="rounded-full bg-brand text-white"
                onPress={onClose}
              >
                {t("ortga_qaytish")}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className={className}>
      <path
        d="M10 3L17.5 16H2.5L10 3Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 8.5v3M10 14h0"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
