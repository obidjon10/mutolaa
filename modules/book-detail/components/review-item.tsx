"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Avatar, Button, Popover, Separator } from "@heroui/react";

import {
  ConditionalRender,
  getFallbackAvatar,
  getInitials,
} from "@/modules/common";
import { EllipsisIcon, PencilIcon, StarIcon, TrashIcon } from "@/modules/icons";

import type { IReview } from "../models";

interface IProps {
  review: IReview;
  onEdit: (review: IReview) => void;
  onDelete: (review: IReview) => void;
}

export const ReviewItem = ({ review, onEdit, onDelete }: IProps) => {
  const t = useTranslations();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const avatarSrc =
    review?.user?.avatar?.trim() ||
    getFallbackAvatar(review?.user?.id ?? review?.id);

  const handleEdit = () => {
    setIsPopoverOpen(false);
    onEdit(review);
  };

  const handleDelete = () => {
    setIsPopoverOpen(false);
    onDelete(review);
  };

  return (
    <div className="rounded-2xl flex items-start gap-3 bg-muted dark:bg-muted-dark p-3">
      <div>
        <Avatar>
          <Avatar.Image
            className="object-cover"
            src={avatarSrc}
            alt={review?.user?.full_name}
          />
          <Avatar.Fallback>
            {getInitials(review?.user?.full_name)}
          </Avatar.Fallback>
        </Avatar>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between w-full">
          <div>
            <p className="text-xs font-medium">{review?.user?.full_name}</p>
            <div className="mt-1 flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, idx) => (
                <StarIcon
                  // eslint-disable-next-line react/no-array-index-key
                  key={idx}
                  size={12}
                  className={
                    idx < Math.round(review?.rating ?? 0)
                      ? "text-yellow-500"
                      : "text-gray-300 dark:text-gray-600"
                  }
                />
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs text-gray-400">
              {new Date(review?.created_at).toLocaleDateString("ru")}
            </p>
            <ConditionalRender if={review?.is_mine}>
              <Popover isOpen={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                <Button
                  isIconOnly
                  className="size-6! bg-white dark:bg-black text-black dark:text-white shadow-[0px_0px_1px_0px_#0000000F,0px_1px_2px_0px_#0000000F,0px_2px_4px_0px_#0000000A]"
                >
                  <EllipsisIcon className="w-3" />
                </Button>
                <Popover.Content className="max-w-64">
                  <Popover.Dialog className="p-0">
                    <button
                      type="button"
                      onClick={handleEdit}
                      className="flex w-full items-center gap-3 font-medium hover:bg-gray-100 dark:hover:bg-white/5 cursor-pointer text-sm p-4 rounded-t-3xl"
                    >
                      <PencilIcon />
                      {t("tahrirlash")}
                    </button>
                    <Separator className="w-[85%] mx-auto" />
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex w-full items-center gap-3 font-medium hover:bg-red-100 dark:hover:bg-red-500/10 cursor-pointer text-sm p-4 rounded-b-3xl text-red-500"
                    >
                      <TrashIcon />
                      {t("ochirish")}
                    </button>
                  </Popover.Dialog>
                </Popover.Content>
              </Popover>
            </ConditionalRender>
          </div>
        </div>
        <ConditionalRender if={review?.comment}>
          <p className="text-xs mt-3">{review?.comment}</p>
        </ConditionalRender>
      </div>
    </div>
  );
};
