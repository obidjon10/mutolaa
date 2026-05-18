"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@heroui/react";

import { XMarkIcon } from "@/modules/icons";

import { useDeleteCard } from "../hooks";

import { CardIconContent } from "./card-icon-content";

interface ICardDeleteModalProps {
  isOpen: boolean;
  cardId: number | null;
  onSuccess: () => void;
  onClose: () => void;
}

export const CardDeleteModal = ({
  isOpen,
  cardId,
  onSuccess,
  onClose,
}: ICardDeleteModalProps) => {
  const t = useTranslations();
  const { mutate: deleteCard, isPending } = useDeleteCard();

  const handleConfirm = () => {
    if (!cardId) return;
    deleteCard(cardId, { onSuccess });
  };

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
            {isOpen && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <CardIconContent bg="gray" />
                  <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                    <XMarkIcon size={16} />
                  </Modal.CloseTrigger>
                </div>

                <h2 className="text-lg font-semibold mb-1">
                  {t("kartani_ochirish")}
                </h2>
                <p className="text-sm text-foreground-muted mb-6">
                  {t("kartani_ochirish_tasdiq")}
                </p>

                <div className="flex gap-2 justify-end">
                  <Button variant="tertiary" onPress={onClose}>
                    {t("bekor_qilish")}
                  </Button>
                  <Button
                    isPending={isPending}
                    onPress={handleConfirm}
                  >
                    {t("ochirish")}
                  </Button>
                </div>
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
