"use client";

import { useTranslations } from "next-intl";
import { Button, Modal, Spinner } from "@heroui/react";

import { XMarkIcon } from "@/modules/icons";

interface IPaymentPendingModalProps {
  isOpen: boolean;
  paymentUrl: string;
  onClose: () => void;
}

export const PaymentPendingModal = ({
  isOpen,
  paymentUrl,
  onClose,
}: IPaymentPendingModalProps) => {
  const t = useTranslations();

  return (
    <Modal.Root
      isOpen={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog>
            <div className="flex items-start justify-between">
              <div className="size-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center">
                <Spinner size="sm" className="text-brand" />
              </div>
              <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                <XMarkIcon size={16} />
              </Modal.CloseTrigger>
            </div>

            <h2 className="mt-4 font-semibold text-lg">
              {t("tolov_kutilmoqda")}
            </h2>
            <p className="mt-2 text-sm text-foreground-muted">
              {t("tolov_sahifasiga_oting")}
            </p>

            <div className="mt-6 flex justify-end">
              <Button
                onPress={() => window.open(paymentUrl, "_blank")}
                className="bg-brand text-white hover:bg-orange-600 rounded-full"
              >
                {t("tolov_sahifasini_ochish")}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
