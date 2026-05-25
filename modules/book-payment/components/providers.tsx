"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Separator } from "@heroui/react";

import { useAppDispatch, useAppSelector } from "@/lib";
import { ThemedLogo } from "@/modules/common";

import { useBookPurchaseData } from "../hooks";
import { setBookPaymentProvider } from "../store";

const PROVIDER_CONFIG: Record<
  string,
  { label: string; content: React.ReactNode }
> = {
  click: {
    label: "CLICK",
    content: (
      <ThemedLogo
        src="/click.svg"
        darkSrc="/click-dark.svg"
        alt="CLICK"
        width={54}
        height={15}
      />
    ),
  },
  payme: {
    label: "PAYME",
    content: (
      <ThemedLogo
        src="/payme.svg"
        darkSrc="/payme-dark.svg"
        alt="PAYME"
        width={56}
        height={16}
      />
    ),
  },
  xazna: {
    label: "XAZNA",
    content: (
      <ThemedLogo
        src="/xazna.svg"
        darkSrc="/xazna-dark.svg"
        alt="XAZNA"
        width={74}
        height={15}
      />
    ),
  },
  octo: {
    label: "OCTO",
    content: (
      <div className="flex items-center gap-4 py-4">
        <Image src="/visa.svg" alt="Visa" width={22} height={22} />
        <Separator orientation="vertical" className="dark:bg-foreground-muted" />
        <Image src="/mastercard.svg" alt="Mastercard" width={22} height={22} />
        <Separator orientation="vertical" className="dark:bg-foreground-muted" />
        <Image src="/uzcard.svg" alt="Uzcard" width={22} height={22} />
        <Separator orientation="vertical" className="dark:bg-foreground-muted" />
        <Image src="/humo.svg" alt="Humo" width={22} height={22} />
      </div>
    ),
  },
};

export const Providers = () => {
  const dispatch = useAppDispatch();
  const { slug } = useParams<{ slug: string }>();
  const selectedProvider = useAppSelector(
    ({ bookPayment }) => bookPayment.provider,
  );
  const { purchaseData } = useBookPurchaseData(slug);

  const methods = purchaseData?.available_payment_methods ?? [];

  useEffect(() => {
    if (!selectedProvider && methods[0]) {
      dispatch(setBookPaymentProvider(methods[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [methods]);

  if (methods.length === 0) return null;

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 mt-4">
      {methods.map((method) => {
        const config = PROVIDER_CONFIG[method];
        if (!config) return null;

        const isSelected = selectedProvider === method;

        return (
          <button
            key={method}
            type="button"
            onClick={() => dispatch(setBookPaymentProvider(method))}
            className={`bg-muted dark:bg-muted-dark cursor-pointer rounded-xl h-12.5 flex items-center justify-center transition-colors border-2 ${
              isSelected ? "border-brand bg-white dark:bg-black" : "border-transparent"
            }`}
          >
            {config.content}
          </button>
        );
      })}
    </div>
  );
};
