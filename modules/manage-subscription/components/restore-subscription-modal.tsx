"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Modal, Separator, toast } from "@heroui/react";

import { SealCheckIcon } from "@/modules/icons";
import { CardListModal } from "@/modules/payment/components/subscribe/card-list-modal";
import {
  CardAddModal,
  CardIconContent,
  CardOtpModal,
  IUserCard,
} from "@/modules/saved-cards";

import { useRestoreSubscription } from "../hooks";
import { ISubscriptionDetail } from "../models";
import { formatPeriodDate } from "../utils";

interface ICardSummary {
  id: number;
  card_number: string;
  bank_name: string;
}

interface IProps {
  isOpen: boolean;
  subscription: ISubscriptionDetail;
  onClose: () => void;
}

type SubModalType = "none" | "cardList" | "cardAdd" | "cardOtp";

export const RestoreSubscriptionModal = ({
  isOpen,
  subscription,
  onClose,
}: IProps) => {
  const t = useTranslations();
  const { mutate: restore, isPending } = useRestoreSubscription();

  // User's override; if null we fall back to the subscription's current card.
  const [override, setOverride] = useState<ICardSummary | null>(null);
  const [subModal, setSubModal] = useState<SubModalType>("none");
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);
  const [pendingPhone, setPendingPhone] = useState("");

  const selectedCard: ICardSummary | null =
    override ??
    (subscription.card
      ? {
          id: subscription.card.id,
          card_number: subscription.card.card_number,
          bank_name: subscription.card.bank.name,
        }
      : null);

  const validityDate = formatPeriodDate(
    subscription.periods?.subscription_validity_period?.date_time ??
      subscription.end_time,
  );

  const handleClose = () => {
    setOverride(null);
    setSubModal("none");
    onClose();
  };

  const handleCardSelect = (card: IUserCard) => {
    setOverride({
      id: card.id,
      card_number: card.card_number,
      bank_name: card.bank.name,
    });
    setSubModal("none");
  };

  const handleNewCardCreated = (cardId: number, phone: string) => {
    setPendingCardId(cardId);
    setPendingPhone(phone);
    setSubModal("cardOtp");
  };

  const handleVerified = (card: IUserCard) => {
    handleCardSelect(card);
  };

  const handleRestore = () => {
    if (!selectedCard) return;
    restore(
      { id: subscription.id, card: selectedCard.id },
      {
        onSuccess: () => {
          toast.success(t("obuna_tiklandi"));
          handleClose();
        },
      },
    );
  };

  return (
    <>
      <Modal.Root
        isOpen={isOpen}
        onOpenChange={(open) => !open && handleClose()}
      >
        <Modal.Backdrop>
          <Modal.Container>
            <Modal.Dialog className="sm:max-w-131.5 p-5 space-y-4 rounded-3xl bg-muted dark:bg-muted-dark">
              <div className="bg-white rounded-2xl px-4 py-2.5 dark:bg-black">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#17C96426] dark:bg-green-950/30 mb-3">
                  <SealCheckIcon className="text-[#3BCE76]" />
                </div>
                <h2 className="font-medium">
                  {t("hozirda_premiumingiz_aktiv")}
                </h2>
                <p className="mt-2 text-sm text-foreground-muted">
                  {t("restore_subscription_description", {
                    validityDate,
                  })}
                </p>
              </div>

              {selectedCard && (
                <div className="w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-white dark:bg-black text-left">
                  <CardIconContent bg="gray" />
                  <div className="flex-1">
                    <div className="font-semibold text-sm">
                      {selectedCard.card_number}
                    </div>
                    <div className="text-xs text-foreground-muted">
                      {selectedCard.bank_name}
                    </div>
                  </div>
                  <Button
                    onClick={() => setSubModal("cardList")}
                    variant="tertiary"
                    size="sm"
                    className="text-sm font-medium text-brand"
                  >
                    {t("ozgartirish")}
                  </Button>
                </div>
              )}

              <div className="rounded-2xl bg-white dark:bg-black p-4 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">
                    {t("obuna_turi")}:
                  </span>
                  <span className="font-medium">
                    {subscription.tariff.name}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground-muted">
                    {t("tolov_summasi")}:
                  </span>
                  <span className="font-medium">0 UZS</span>
                </div>
                <Separator />
                <div className="flex items-center gap-3 mt-6">
                  <Button
                    size="lg"
                    isPending={isPending}
                    onPress={handleRestore}
                    isDisabled={!selectedCard}
                    className="flex-1 bg-[#22C55E] text-white rounded-full"
                  >
                    {t("tiklash")}
                  </Button>
                  <span className="font-semibold text-2xl">0 UZS</span>
                </div>
              </div>
            </Modal.Dialog>
          </Modal.Container>
        </Modal.Backdrop>
      </Modal.Root>

      {/* Nested card management — opens on top of this modal. */}
      <CardListModal
        isOpen={subModal === "cardList"}
        activeCardId={selectedCard?.id}
        onSelect={handleCardSelect}
        onAddCard={() => setSubModal("cardAdd")}
        onClose={() => setSubModal("none")}
      />
      <CardAddModal
        isOpen={subModal === "cardAdd"}
        onSuccess={handleNewCardCreated}
        onClose={() => setSubModal("none")}
      />
      <CardOtpModal
        isOpen={subModal === "cardOtp"}
        cardId={pendingCardId}
        phone={pendingPhone}
        onSuccess={handleVerified}
        onClose={() => setSubModal("none")}
      />
    </>
  );
};
