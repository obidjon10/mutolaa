"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, TextArea, toast } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import { StarIcon } from "@/modules/icons";

import { useCreateReview, useUpdateReview } from "../hooks";
import type { IReview } from "../models";

interface IProps {
  bookId?: number;
  review?: IReview;
  onCancel?: () => void;
  onSuccess?: () => void;
}

export const ReviewForm = ({ bookId, review, onCancel, onSuccess }: IProps) => {
  const t = useTranslations();
  const isEditMode = Boolean(review);

  const [rating, setRating] = useState<number>(review?.rating ?? 0);
  const [comment, setComment] = useState<string>(review?.comment ?? "");
  const [hoverRating, setHoverRating] = useState<number>(0);

  const { mutate: createReview, isPending: isCreating } =
    useCreateReview(bookId);
  const { mutate: updateReview, isPending: isUpdating } =
    useUpdateReview(bookId);

  const isPending = isCreating || isUpdating;

  const handleSubmit = () => {
    if (!bookId || rating < 1 || rating > 5) return;

    const trimmed = comment.trim();
    const payload = { book: bookId, rating, comment: trimmed };

    const onError = (err: Error) =>
      toast.danger(err?.message || t("xatolik_yuz_berdi"));

    const handleSuccess = (successMessage: string) => {
      toast.success(t(successMessage));
      if (!isEditMode) {
        setRating(0);
        setComment("");
      }
      onSuccess?.();
    };

    if (isEditMode && review) {
      updateReview(
        { id: review.id, ...payload },
        {
          onSuccess: () => handleSuccess("izoh_yangilandi"),
          onError,
        },
      );
    } else {
      createReview(payload, {
        onSuccess: () => handleSuccess("izoh_joylandi"),
        onError,
      });
    }
  };

  const displayRating = hoverRating || rating;

  return (
    <div>
      <p className="text-sm font-medium">
        {isEditMode
          ? t("izohingizni_tahrirlang")
          : t("kitobni_oqidingizmi_taasurot")}
      </p>

      <TextArea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder={t("fikringizni_yozing")}
        rows={4}
        className="mt-3 w-full rounded-xl bg-muted dark:bg-muted-dark shadow-none"
      />

      <div className="mt-4 flex items-center justify-between gap-3">
        <div
          className="flex items-center gap-1"
          onMouseLeave={() => setHoverRating(0)}
        >
          {Array.from({ length: 5 }).map((_, idx) => {
            const value = idx + 1;
            const isActive = value <= displayRating;
            return (
              <button
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
                type="button"
                aria-label={`${value}`}
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                disabled={isPending}
                className="p-0.5 transition-opacity cursor-pointer hover:opacity-80 disabled:opacity-60"
              >
                <StarIcon
                  size={20}
                  className={
                    isActive
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <ConditionalRender if={isEditMode}>
            <Button
              variant="tertiary"
              onPress={onCancel}
              isDisabled={isPending}
              className="rounded-full"
            >
              {t("bekor_qilish")}
            </Button>
          </ConditionalRender>
          <Button
            onPress={handleSubmit}
            isDisabled={isPending || rating < 1}
            className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
          >
            <ConditionalRender
              if={isPending}
              else={isEditMode ? t("saqlash") : t("joylash")}
            >
              {t("yuklanmoqda")}
            </ConditionalRender>
          </Button>
        </div>
      </div>
    </div>
  );
};
