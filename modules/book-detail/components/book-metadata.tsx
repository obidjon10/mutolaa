import { useTranslations } from "next-intl";
import { Separator } from "@heroui/react";

// import { StarIcon } from "@/modules/icons";
import type { IBookDetail } from "../models";
import { formatDuration } from "../utils";

import { SearchLink } from "./search-link";

interface IProps {
  book: IBookDetail;
}

interface IMetaItemProps {
  label: string;
  value: React.ReactNode;
}

const MetaItem = ({ label, value }: IMetaItemProps) => (
  <div className="flex items-center gap-2 text-xs">
    <span className="font-semibold text-foreground-muted">{label}:</span>
    <span>{value}</span>
  </div>
);

export const BookMetadata = ({ book }: IProps) => {
  const t = useTranslations();

  return (
    <div className="p-3 flex items-center gap-3 bg-muted dark:bg-muted-dark rounded-lg">
      <MetaItem
        label={t("mutolaa_qilishmoqda")}
        value={`${book?.reading_now_count} kishi`}
      />
      <Separator orientation="vertical" />
      <MetaItem
        label={t("janr")}
        value={
          <SearchLink
            items={
              book?.categories?.map((c) => ({ id: c.id, label: c.title })) ?? []
            }
            searchParam="categories"
            ariaLabel={t("janr")}
            textClassName="text-brand border-b border-[#CDCDCE] hover:border-brand transition-colors"
          />
        }
      />
      <Separator orientation="vertical" />
      <MetaItem
        label={t("yosh_chegarasi")}
        value={`${book?.age?.minimum_allowed_age}+`}
      />
      <Separator orientation="vertical" />
      <MetaItem
        label={t("davomiyligi")}
        value={formatDuration(book.all_duration)}
      />
      {/* <Separator orientation="vertical" /> */}
      {/* <MetaItem
        label={t("reyting")}
        value={
          <div className="flex items-center gap-1 mt-0.5">
            {book.avg_rating}
            <StarIcon size={14} className="text-amber-400" />
          </div>
        }
      /> */}
    </div>
  );
};
