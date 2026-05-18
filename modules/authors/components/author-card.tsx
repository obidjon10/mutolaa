"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { getFallbackAvatar } from "@/modules/common";
import { setFilterLabels } from "@/modules/search";

interface IProps {
  bookCount: number;
  authorId: number;
  authorName: string;
  authorImage: string;
}

export const AuthorCard: React.FC<IProps> = ({
  authorId,
  bookCount,
  authorName,
  authorImage,
}) => {
  const t = useTranslations();
  const avatarSrc = authorImage?.trim() || getFallbackAvatar(authorId);

  return (
    <Link
      href={`/search?authors=${authorId}`}
      onClick={() => setFilterLabels("authors", [{ id: authorId, label: authorName }])}
      className="group flex gap-3 shrink-0 w-[256px] h-22 items-center p-4 bg-muted dark:bg-muted-dark rounded-2xl"
    >
      <div className="relative aspect-square w-14 shrink-0 overflow-hidden rounded-full">
        <Image
          fill
          src={avatarSrc}
          alt={authorName}
          sizes="56px"
          className="object-cover shrink-0 transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div>
        <p className="line-clamp-1 font-semibold text-gray-900 dark:text-gray-200">
          {authorName}
        </p>
        <p className="text-sm font-medium text-foreground-muted">
          {t("n_ta_kitob", { count: bookCount })}
        </p>
      </div>
    </Link>
  );
};
