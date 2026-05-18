"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, toast } from "@heroui/react";

import { Link } from "@/i18n/navigation";
import { useAuth } from "@/modules/auth";
import { ConditionalRender, useConfirm } from "@/modules/common";

import { useDeleteReview, useReviews } from "../hooks";
import type { IReview } from "../models";

import { ReviewForm } from "./review-form";
import { ReviewItem } from "./review-item";

interface IProps {
  bookId?: number;
  reviewsCount?: number;
}

export const BookReviews = ({ bookId, reviewsCount }: IProps) => {
  const t = useTranslations();
  const { isAuthenticated } = useAuth();
  const confirm = useConfirm();

  const { reviews, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useReviews(bookId);
  const { mutateAsync: deleteReview } = useDeleteReview(bookId);

  const [editingReview, setEditingReview] = useState<IReview | null>(null);

  const myReview = reviews?.results?.find((review) => review?.is_mine);

  const handleDelete = (review: IReview) => {
    confirm({
      type: "delete",
      title: t("izohni_ochirish"),
      description: t("izohni_ochirish_tasdiq"),
      confirmText: t("ochirish"),
      onConfirm: async () => {
        await deleteReview(review.id);
        toast.success(t("izoh_ochirildi"));
      },
    });
  };

  return (
    <section className="mt-10 max-w-148.5">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
        {t("izohlar")} <span className="text-foreground-muted">{reviewsCount}</span>
      </h2>

      <div className="relative mt-6">
        <div
          aria-hidden={!isAuthenticated}
          className={
            isAuthenticated ? "" : "pointer-events-none select-none blur-[1px]"
          }
        >
          <ConditionalRender if={!myReview}>
            <ReviewForm bookId={bookId} />
          </ConditionalRender>
        </div>

        <ConditionalRender if={!isAuthenticated}>
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/40 dark:bg-black/40">
            <Link
              href="/login"
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors"
            >
              {t("royxatdan_otish")}
            </Link>
          </div>
        </ConditionalRender>
      </div>

      <div className="mt-5 space-y-2">
        {reviews?.results?.map((review) => {
          const isEditing = editingReview?.id === review?.id;

          if (isEditing) {
            return (
              <div key={review?.id} className="mb-8">
                <ReviewForm
                  bookId={bookId}
                  review={review}
                  onCancel={() => setEditingReview(null)}
                  onSuccess={() => setEditingReview(null)}
                />
              </div>
            );
          }

          return (
            <ReviewItem
              key={review?.id}
              review={review}
              onEdit={setEditingReview}
              onDelete={handleDelete}
            />
          );
        })}
      </div>

      <ConditionalRender if={hasNextPage}>
        <div className="mt-4 flex justify-center">
          <Button
            variant="tertiary"
            isDisabled={isFetchingNextPage}
            onPress={() => fetchNextPage()}
            className="rounded-full"
          >
            {isFetchingNextPage ? t("yuklanmoqda") : t("yana_korsatish")}
          </Button>
        </div>
      </ConditionalRender>
    </section>
  );
};
