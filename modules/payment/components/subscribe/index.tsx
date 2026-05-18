"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Label, Skeleton, TextField } from "@heroui/react";

import { useAppDispatch } from "@/lib";
import { ConditionalRender } from "@/modules/common";
import { CardAddModal, CardForm, CardIconContent, CardOtpModal, IUserCard, useCardList } from "@/modules/saved-cards";

import { setActiveCardId } from "../../store";

import { CardListModal } from "./card-list-modal";

type ModalStateType = "none" | "otp" | "cardList" | "cardAdd";

export const Subscribe: React.FC = () => {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const { data: cards, isLoading } = useCardList();
  const [activeCard, setActiveCard] = useState<IUserCard | null>(null);
  const [modal, setModal] = useState<ModalStateType>("none");

  useEffect(() => {
    if (!activeCard && cards?.[0]) {
      setActiveCard(cards[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  useEffect(() => {
    dispatch(setActiveCardId(activeCard?.id ?? null));
  }, [activeCard, dispatch]);
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);
  const [pendingPhone, setPendingPhone] = useState("");

  const handleCardCreated = (cardId: number, phone: string) => {
    setPendingCardId(cardId);
    setPendingPhone(phone);
    setModal("otp");
  };

  const handleVerified = (card: IUserCard) => {
    setActiveCard(card);
    setModal("none");
  };

  return (
    <>
      <ConditionalRender
        if={!isLoading}
        else={<Skeleton className="h-15 rounded-2xl" />}
      >
        <ConditionalRender
          if={activeCard}
          else={
            <TextField>
              <Label>{t("karta_qoshish")}</Label>
              <CardForm onSuccess={handleCardCreated} />
            </TextField>
          }
        >
          <div className="flex items-center justify-between bg-white dark:bg-black rounded-2xl p-2.5">
            <div className="flex items-center gap-3">
              <CardIconContent bg="gray" />
              <div>
                <div className="font-medium text-sm">
                  {activeCard?.card_number}
                </div>
                <div className="text-xs text-foreground-muted">
                  {activeCard?.bank.name}
                </div>
              </div>
            </div>
            <Button
              variant="tertiary"
              size="sm"
              className="bg-muted dark:bg-muted-dark text-brand dark:text-white"
              onPress={() => setModal("cardList")}
            >
              {t("ozgartirish")}
            </Button>
          </div>
        </ConditionalRender>
      </ConditionalRender>

      <CardOtpModal
        isOpen={modal === "otp"}
        cardId={pendingCardId}
        phone={pendingPhone}
        onSuccess={handleVerified}
        onClose={() => setModal("none")}
      />

      <CardListModal
        isOpen={modal === "cardList"}
        activeCardId={activeCard?.id}
        onSelect={(card) => {
          setActiveCard(card);
          setModal("none");
        }}
        onAddCard={() => setModal("cardAdd")}
        onClose={() => setModal("none")}
      />

      <CardAddModal
        isOpen={modal === "cardAdd"}
        onSuccess={handleCardCreated}
        onClose={() => setModal("cardList")}
      />
    </>
  );
};
