import { useTranslations } from "next-intl";
import { Button } from "@heroui/react";
import type { ReactNode } from "react";

import { Link } from "@/i18n/navigation";
import {
  ArrowRightIcon,
  ChevronRightIcon,
  OpenInNewIcon,
} from "@/modules/icons";

export interface ISectionHeaderCarouselProps {
  canScrollPrev: boolean;
  canScrollNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  seeAllHref?: string;
}

interface ISectionHeaderProps {
  id: string;
  title: string;
  listUrl?: string;
  carousel?: ISectionHeaderCarouselProps;
}

const carouselControlClassName =
  "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 transition-colors hover:border-orange-500 hover:text-orange-500 dark:border-[#27272A] dark:bg-muted-dark dark:text-gray-200 dark:hover:border-orange-500 dark:hover:text-orange-400 disabled:pointer-events-none disabled:opacity-40";

export const SectionHeader = ({
  id,
  title,
  listUrl,
  carousel,
}: ISectionHeaderProps) => {
  const t = useTranslations();

  let trailing: ReactNode = null;
  
  if (carousel) {
    let afterPrev: ReactNode = null;
    if (carousel.canScrollNext) {
      afterPrev = (
        <Button
          isIconOnly
          type="button"
          className={carouselControlClassName}
          aria-label="carousel_keyingi"
          onClick={carousel.onNext}
        >
          <ChevronRightIcon size={18} aria-hidden />
        </Button>
      );
    } else if (carousel.seeAllHref) {
      afterPrev = (
        <Link
          href={carousel.seeAllHref}
          className="text-sm font-medium flex underline items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors"
        >
          {t("barchasi")} <ArrowRightIcon />
        </Link>
      );
    }
    trailing = (
      <div className="flex items-center gap-2">
        <Button
          isIconOnly
          type="button"
          className={carouselControlClassName}
          aria-label="carousel_oldingi"
          isDisabled={!carousel.canScrollPrev}
          onClick={carousel.onPrev}
        >
          <ChevronRightIcon className="rotate-180" size={18} aria-hidden />
        </Button>
        {afterPrev}
      </div>
    );
  } else if (listUrl) {
    trailing = (
      <Link
        href="#"
        className="text-sm font-medium flex underline items-center gap-1 text-gray-500 hover:text-orange-500 transition-colors"
      >
        {t("barchasi")} <ArrowRightIcon />
      </Link>
    );
  }

  const titleClassName =
    "text-xl font-bold text-gray-900 dark:text-gray-200 sm:text-2xl";

  return (
    <div className="flex items-center justify-between px-6 sm:px-8 mt-16 mb-6">
      {carousel?.seeAllHref ? (
        <Link
          href={carousel.seeAllHref}
          className="group inline-flex items-center gap-2"
        >
          <h2
            id={id}
            className={`${titleClassName} transition-colors duration-300 group-hover:text-brand`}
          >
            {title}
          </h2>
          <span className="inline-flex transform-gpu text-brand opacity-0 -translate-x-2 transition duration-300 ease-out motion-reduce:transition-none group-hover:opacity-100 group-hover:translate-x-0">
            <OpenInNewIcon size={20} aria-hidden />
          </span>
        </Link>
      ) : (
        <h2 id={id} className={titleClassName}>
          {title}
        </h2>
      )}
      {trailing}
    </div>
  );
};
