"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Skeleton, toast } from "@heroui/react";

import {
  ChevronRightIcon,
  CirclePlusIcon,
  CreditCardIcon,
  PlusIcon,
  TrashIcon,
} from "@/modules/icons";

import { useCardList } from "../hooks";
import { IUserCard } from "../models";

import { CardAddModal } from "./card-add-modal";
import { CardDeleteModal } from "./card-delete-modal";
import { CardIconContent } from "./card-icon-content";
import { CardOtpModal } from "./card-otp-modal";

export function Main() {
  const t = useTranslations();
  const { push } = useRouter();
  const { data: cards, isLoading } = useCardList();

  const [isCardAddOpen, setIsCardAddOpen] = useState(false);
  const [isOtpOpen, setIsOtpOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);
  const [pendingPhone, setPendingPhone] = useState("");
  const [deletingCardId, setDeletingCardId] = useState<number | null>(null);

  const handleCardCreated = (cardId: number, phone: string) => {
    setPendingCardId(cardId);
    setPendingPhone(phone);
    setIsCardAddOpen(false);
    setIsOtpOpen(true);
  };

  const handleVerified = (_card: IUserCard) => {
    setIsOtpOpen(false);
    toast.success(t("kartangiz_muvaffaqiyatli_qoshildi"));
  };

  const handleDeleteOpen = (cardId: number) => {
    setDeletingCardId(cardId);
    setIsDeleteOpen(true);
  };

  const handleDeleteSuccess = () => {
    setIsDeleteOpen(false);
    setDeletingCardId(null);
    toast.success(t("kartangiz_muvaffaqiyatli_ochirildi"));
  };

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 h-[94.3vh] rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => push("/profile")}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <div>
          <h1 className="text-xl font-semibold">{t("saqlangan_kartalar")}</h1>
        </div>
      </div>

      {!isLoading && (cards?.length ?? 0) === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-32">
          <CreditCardIcon size={32} className="text-foreground-muted" />
          <p className="mt-3 text-base font-medium">
            {t("karta_topilmadi")}
          </p>
          <p className="mt-1 text-sm font-medium text-foreground-muted">
            {t("sizda_saqlangan_kartalar_mavjud_emas")}
          </p>
          <Button
            className="mt-5 bg-brand text-white rounded-full"
            onPress={() => setIsCardAddOpen(true)}
          >
            <PlusIcon />
            {t("karta_qoshish")}
          </Button>
        </div>
      ) : (
        <div
          className="w-full max-w-132 mx-auto mt-9 mb-20 bg-muted dark:bg-muted-dark rounded-3xl p-6"
          style={{ maxWidth: "531px" }}
        >
          <div className="space-y-2">
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Skeleton key={i} className="h-14 rounded-xl" />
                ))
              : cards?.map((card) => (
                  <div
                    key={card?.id}
                    className="w-full flex items-center gap-2 p-2.5 rounded-2xl bg-white dark:bg-black"
                  >
                    <CardIconContent bg="white" />
                    <div className="flex-1 text-left">
                      <div className="font-semibold text-sm">
                        {card?.card_number}
                      </div>
                      <div className="text-xs text-foreground-muted">
                        {card?.bank?.name}
                      </div>
                    </div>
                    <Button
                      variant="tertiary"
                      className="text-red-500"
                      isIconOnly
                      onPress={() => handleDeleteOpen(card.id)}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                ))}
          </div>

          <div
            onClick={() => setIsCardAddOpen(true)}
            className="w-full flex mt-2 items-center justify-between p-2.5 rounded-2xl bg-white dark:bg-black cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <CardIconContent bg="orange" />
              <div className="font-medium text-sm">{t("karta_qoshish")}</div>
            </div>
            <Button variant="tertiary" isIconOnly>
              <CirclePlusIcon />
            </Button>
          </div>
        </div>
      )}

      <CardAddModal
        isOpen={isCardAddOpen}
        onSuccess={handleCardCreated}
        onClose={() => setIsCardAddOpen(false)}
      />

      <CardOtpModal
        isOpen={isOtpOpen}
        cardId={pendingCardId}
        phone={pendingPhone}
        onSuccess={handleVerified}
        onClose={() => setIsOtpOpen(false)}
      />

      <CardDeleteModal
        isOpen={isDeleteOpen}
        cardId={deletingCardId}
        onSuccess={handleDeleteSuccess}
        onClose={() => setIsDeleteOpen(false)}
      />
    </div>
  );
}
