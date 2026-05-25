"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  FieldError,
  InputGroup,
  Label,
  Spinner,
  TextField,
} from "@heroui/react";

import { ConditionalRender } from "@/modules/common";

import { useCreateCard } from "../";

interface ICardFormProps {
  isModal?: boolean;
  onClose?: () => void;
  onSuccess: (cardId: number, phone: string) => void;
}

const formatCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 16);
  return digits.replace(/(\d{4})(?=\d)/g, "$1 ");
};

const formatExpireDate = (value: string) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length > 2) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return digits;
};

export const CardForm = ({
  onSuccess,
  isModal = false,
  onClose,
}: ICardFormProps) => {
  const t = useTranslations();
  const [cardNumber, setCardNumber] = useState("");
  const [expireDate, setExpireDate] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const expireRef = useRef<HTMLInputElement>(null);
  const { mutate: createCard, isPending } = useCreateCard();

  const isValid =
    cardNumber.replace(/\s/g, "").length === 16 && expireDate.length === 5;

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
    setErrorMessage(null);
    if (formatted.replace(/\s/g, "").length === 16) {
      expireRef.current?.focus();
    }
  };

  const handleExpireDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setExpireDate(formatExpireDate(e.target.value));
    setErrorMessage(null);
  };

  const onSubmit = () => {
    if (!isValid) return;
    createCard(
      {
        card_number: cardNumber.replace(/\s/g, ""),
        expire_date: expireDate,
      },
      {
        onSuccess: (data) => onSuccess(data.user_card_id, data.phone),
        onError: (err: any) => {
          const message = err?.response?.data?.errors?.[0]?.message ?? null;
          setErrorMessage(message);
        },
      },
    );
  };

  return (
    <div>
      <ConditionalRender
        if={isModal}
        else={
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <InputGroup className="flex-1">
                <InputGroup.Input
                  placeholder="0000 0000 0000 0000"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                />
                <InputGroup.Suffix>
                  <input
                    ref={expireRef}
                    placeholder="00/00"
                    value={expireDate}
                    onChange={handleExpireDateChange}
                    onMouseDown={(e) => e.stopPropagation()}
                    onClick={(e) => e.stopPropagation()}
                    maxLength={5}
                    className="w-14 bg-transparent text-sm text-center outline-none placeholder:text-foreground-muted"
                  />
                </InputGroup.Suffix>
              </InputGroup>
              <Button
                isDisabled={!isValid}
                isPending={isPending}
                onPress={onSubmit}
              >
                {t("qoshish")}
              </Button>
            </div>
            {errorMessage && (
              <p className="text-sm text-red-500">{errorMessage}</p>
            )}
          </div>
        }
      >
        <TextField isInvalid={!!errorMessage}>
          <Label className="dark:text-white">{t("karta_qoshish")}</Label>
          <InputGroup className="w-full bg-muted dark:bg-black shadow-none">
            <InputGroup.Input
              placeholder="0000 0000 0000 0000"
              value={cardNumber}
              onChange={handleCardNumberChange}
            />
            <InputGroup.Suffix>
              <input
                maxLength={5}
                ref={expireRef}
                placeholder="00/00"
                value={expireDate}
                onChange={handleExpireDateChange}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
                className="w-14 bg-transparent text-sm text-center outline-none placeholder:text-foreground-muted"
              />
            </InputGroup.Suffix>
          </InputGroup>
          {errorMessage && <FieldError>{errorMessage}</FieldError>}
          <div className="flex mt-5 gap-2 items-center justify-end">
            <Button onPress={onClose} variant="tertiary">
              {t("bekor_qilish")}
            </Button>
            <Button
              isDisabled={!isValid}
              isPending={isPending}
              onPress={onSubmit}
            >
              {isPending ? <Spinner size="sm" color="current" /> : null}
              {t("tasdiqlash")}
            </Button>
          </div>
        </TextField>
      </ConditionalRender>
    </div>
  );
};
