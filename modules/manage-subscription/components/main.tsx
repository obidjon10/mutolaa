"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { toast } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import { ChevronRightIcon } from "@/modules/icons";
import { CardListModal } from "@/modules/payment/components/subscribe/card-list-modal";
import {
  CardAddModal,
  CardOtpModal,
  IUserCard,
} from "@/modules/saved-cards";

import { SUBSCRIPTION_STATE } from "../constants";
import {
  useCancelSubscription,
  useChangeSubscription,
  usePayNow,
  useSubscriptionDetail,
} from "../hooks";

import { CancelConfirmModal } from "./cancel-confirm-modal";
import { CancelReasonsModal } from "./cancel-reasons-modal";
import { PlansGrid, PlansGridSkeleton } from "./plans-grid";
import { RestoreSubscriptionModal } from "./restore-subscription-modal";
import {
  SubscriptionCard,
  SubscriptionCardSkeleton,
} from "./subscription-card";

type ModalStateType =
  | "none"
  | "cancelConfirm"
  | "cancelReasons"
  | "cardList"
  | "cardAdd"
  | "cardOtp"
  | "restore";

export function Main() {
  const t = useTranslations();
  const router = useRouter();

  const { data: subscription, isLoading } = useSubscriptionDetail();
  const { mutate: cancelSubscription, isPending: isCancelling } =
    useCancelSubscription();
  const { mutate: changeSubscription, isPending: isChanging, variables } =
    useChangeSubscription();
  const { mutate: payNow, isPending: isPaying } = usePayNow();

  const [modal, setModal] = useState<ModalStateType>("none");
  const [pendingCardId, setPendingCardId] = useState<number | null>(null);
  const [pendingPhone, setPendingPhone] = useState("");

  // INACTIVE users have no subscription to manage — bounce them to /premium.
  useEffect(() => {
    if (subscription?.subscription_state === SUBSCRIPTION_STATE.INACTIVE) {
      router.replace("/premium");
    }
  }, [subscription?.subscription_state, router]);

  const handleCancelSubmit = (
    reasonId: number | null,
    reasonText: string,
  ) => {
    if (!subscription) return;
    cancelSubscription(
      {
        subscription_id: subscription.id,
        ...(reasonId !== null
          ? { cancel_reason: reasonId }
          : { cancel_reason_text: reasonText }),
      },
      {
        onSuccess: () => {
          setModal("none");
          toast.success(t("obuna_bekor_qilindi"));
        },
      },
    );
  };

  const handleChangeTariff = (tariffId: number) => {
    if (!subscription?.card) return;
    changeSubscription(
      {
        id: subscription.id,
        payload: { tariff: tariffId, card: subscription.card.id },
      },
      {
        onSuccess: () => toast.success(t("obuna_yangilandi")),
      },
    );
  };

  const handleCardSelect = (card: IUserCard) => {
    if (!subscription || card.id === subscription.card?.id) {
      setModal("none");
      return;
    }
    changeSubscription(
      { id: subscription.id, payload: { card: card.id } },
      {
        onSuccess: () => {
          setModal("none");
          toast.success(t("karta_yangilandi"));
        },
      },
    );
  };

  const handleNewCardCreated = (cardId: number, phone: string) => {
    setPendingCardId(cardId);
    setPendingPhone(phone);
    setModal("cardOtp");
  };

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 min-h-[94.3vh] rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer w-fit"
        onClick={() => router.push("/profile")}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <h1 className="text-2xl font-semibold">{t("obuna_malumotlari")}</h1>
      </div>

      <ConditionalRender
        if={isLoading}
        else={
          <ConditionalRender if={!!subscription}>
            <div className="max-w-118 mx-auto">
              <SubscriptionCard
                subscription={subscription!}
                onCancelClick={() => setModal("cancelConfirm")}
                onCardClick={() => setModal("cardList")}
                onHistoryClick={() => router.push("/transaction-history")}
                onRestoreClick={() => setModal("restore")}
                onPayClick={() =>
                  subscription &&
                  payNow(subscription.id, {
                    onSuccess: () => toast.success(t("tolov_amalga_oshirildi")),
                  })
                }
                isPaying={isPaying}
              />

              <div className="text-xl font-semibold pl-3.5 mb-2.5 mt-8">
                {subscription?.tariff?.duration === 12 ? t("siz_uchun_tavsiya_etiladi") : t("boshqa_obuna_turi")}
              </div>
              <PlansGrid
                activeTariffId={subscription?.tariff.id ?? null}
                onChange={handleChangeTariff}
                isChanging={isChanging}
                changingId={variables?.payload.tariff ?? null}
              />
            </div>
          </ConditionalRender>
        }
      >
        <div className="max-w-118 mx-auto">
          <SubscriptionCardSkeleton />
          <div className="mt-8 mb-2.5 pl-3.5">
            <div className="h-6 w-48 rounded-md bg-muted dark:bg-muted-dark animate-pulse" />
          </div>
          <PlansGridSkeleton />
        </div>
      </ConditionalRender>

      <CancelConfirmModal
        isOpen={modal === "cancelConfirm"}
        onConfirm={() => setModal("cancelReasons")}
        onClose={() => setModal("none")}
      />

      <CancelReasonsModal
        isOpen={modal === "cancelReasons"}
        isSubmitting={isCancelling}
        onSubmit={handleCancelSubmit}
        onClose={() => setModal("none")}
      />

      <CardListModal
        isOpen={modal === "cardList"}
        activeCardId={subscription?.card?.id}
        onSelect={handleCardSelect}
        onAddCard={() => setModal("cardAdd")}
        onClose={() => setModal("none")}
      />

      <CardAddModal
        isOpen={modal === "cardAdd"}
        onSuccess={handleNewCardCreated}
        onClose={() => setModal("none")}
      />

      <CardOtpModal
        isOpen={modal === "cardOtp"}
        cardId={pendingCardId}
        phone={pendingPhone}
        onSuccess={() => setModal("none")}
        onClose={() => setModal("none")}
      />

      {subscription && (
        <RestoreSubscriptionModal
          isOpen={modal === "restore"}
          subscription={subscription}
          onClose={() => setModal("none")}
        />
      )}
    </div>
  );
}
