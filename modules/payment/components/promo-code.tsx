import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input } from "@heroui/react";

import { useAppSelector } from "@/lib";
import { ConditionalRender } from "@/modules/common";

import { useCheckPromoCode, useEncrypt } from "../hooks";
import { IPromoCodeResponse } from "../models";

interface IPromoCodeProps {
  onSuccess: (res: IPromoCodeResponse, encryptedText: string) => void;
}

export function PromoCode({ onSuccess }: IPromoCodeProps) {
  const t = useTranslations();
  const [promoCode, setPromoCode] = useState("");
  const { mutate, isPending } = useCheckPromoCode();
  const { encrypt } = useEncrypt(`${process.env.NEXT_PUBLIC_AES_KEY}`);
  const id = useAppSelector(({ payment }) => payment?.plan?.id);
  const [openPromoCodeInput, setOpenPromoCodeInput] = useState(false);

  const onCheck = async () => {
    const encryptedText = await encrypt(promoCode);
    mutate(
      { promo_code: encryptedText, tariff: id as number },
      { onSuccess: (res) => onSuccess(res, encryptedText) },
    );
  };

  return (
    <div className="mb-2.5">
      <ConditionalRender
        if={openPromoCodeInput}
        else={
          <div
            onClick={() => setOpenPromoCodeInput(true)}
            className="text-foreground-muted cursor-pointer text-sm underline underline-offset-3"
          >
            {t("promokod_qoshish")}
          </div>
        }
      >
        <div className="flex items-center gap-2.5">
          <Input
            value={promoCode}
            placeholder={t("promokodni_kiriting")}
            onChange={(e) => setPromoCode(e?.target?.value)}
            className="flex-1 bg-muted dark:bg-muted-dark shadow-none"
          />
          <Button
            onClick={onCheck}
            variant="tertiary"
            isPending={isPending}
            className="text-brand bg-muted dark:bg-muted-dark"
          >
            {t("qollash")}
          </Button>
        </div>
      </ConditionalRender>
    </div>
  );
}
