"use client";

import { useTranslations } from "next-intl";
import { Modal, Skeleton } from "@heroui/react";

import { CirclePlusIcon, XMarkIcon } from "@/modules/icons";
import { CardIconContent, IUserCard, useCardList } from "@/modules/saved-cards";

interface ICardListModalProps {
  isOpen: boolean;
  activeCardId?: number;
  onSelect: (card: IUserCard) => void;
  onAddCard: () => void;
  onClose: () => void;
}

export const CardListModal = ({
  isOpen,
  activeCardId,
  onSelect,
  onAddCard,
  onClose,
}: ICardListModalProps) => {
  const t = useTranslations();
  const { data: cards, isLoading } = useCardList();

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
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold">{t("kartalar")}</h2>
              <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                <XMarkIcon size={16} />
              </Modal.CloseTrigger>
            </div>

            <div className="space-y-2">
              {isLoading
                ? Array.from({ length: 2 }).map((_, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Skeleton key={i} className="h-14 rounded-xl" />
                  ))
                : cards?.map((card) => (
                    <button
                      key={card.id}
                      type="button"
                      onClick={() => onSelect(card)}
                      className="w-full flex items-center gap-2 p-2.5 rounded-2xl bg-muted dark:bg-muted-dark hover:bg-[#e4e4e7] dark:hover:bg-white/10 transition-colors"
                    >
                      <CardIconContent bg="white" />
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm">
                          {card.card_number}
                        </div>
                        <div className="text-xs text-foreground-muted">
                          {card.bank.name}
                        </div>
                      </div>
                      {activeCardId === card.id && (
                        <div className="size-5 rounded-full bg-brand flex items-center justify-center shrink-0">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
            </div>

            <div
              onClick={onAddCard}
              className="w-full flex mt-2 items-center justify-between p-2.5 rounded-2xl bg-muted dark:bg-muted-dark hover:bg-[#e4e4e7] dark:hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-2">
                <CardIconContent bg="orange" />
                <div className="font-medium text-sm">{t("karta_qoshish")}</div>
              </div>
              <CirclePlusIcon />
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};
