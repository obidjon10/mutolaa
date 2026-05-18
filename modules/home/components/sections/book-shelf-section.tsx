"use client";

import { useCallback, useRef, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

import {
  Book,
  SectionCarousel,
  SectionCarouselScrollStateType,
  SectionHeader,
} from "@/modules/common";

import { IHomeSectionBookBucket } from "../../models";

interface IBookShelfSectionProps {
  section: IHomeSectionBookBucket;
}

export const BookShelfSection = ({ section }: IBookShelfSectionProps) => {
  const headingId = `home-section-${section?.id}`;
  const carouselApiRef = useRef<EmblaCarouselType | null>(null);
  const [scrollState, setScrollState] =
    useState<SectionCarouselScrollStateType>({
      canScrollPrev: false,
      canScrollNext: true,
    });

  const onScrollStateChange = useCallback(
    (state: SectionCarouselScrollStateType) => {
      setScrollState(state);
    },
    [],
  );

  const scrollPrev = useCallback(() => {
    carouselApiRef.current?.scrollPrev();
  }, []);

  const scrollNext = useCallback(() => {
    carouselApiRef.current?.scrollNext();
  }, []);

  if (!section?.content?.length) return null;

  return (
    <section aria-labelledby={headingId}>
      <SectionHeader
        id={headingId}
        title={section?.title}
        carousel={{
          canScrollPrev: scrollState.canScrollPrev,
          canScrollNext: scrollState.canScrollNext,
          onPrev: scrollPrev,
          onNext: scrollNext,
          seeAllHref: `/book-bucket/${section?.book_bucket_id}`,
        }}
      />
      <div className="border rounded-2xl mx-6 sm:mx-8 border-gray-100 dark:border-muted-dark">
        <SectionCarousel
          slideGapClass="gap-0"
          apiRef={carouselApiRef}
          ariaLabel={section?.title}
          slidePaddingStartClass="pl-0"
          onScrollStateChange={onScrollStateChange}
          classNames="divide-x divide-gray-100 dark:divide-muted-dark"
        >
          {section?.content?.map((book) => (
            <div
              key={book?.id}
              className="shrink-0 py-8 px-8.75 basis-[45%] sm:basis-[30%] md:basis-[22%] lg:basis-[17%] xl:basis-[14%]"
            >
              <Book
                hasAudiobook={book?.has_audiobook}
                hasEbook={book?.has_ebook}
                isPremium={book?.is_premium}
                discountPercentage={book?.discount_percentage}
                title={book?.title}
                author={book?.authors?.[0]?.name}
                cover={book?.image}
                slug={book?.slug}
                width={200}
              />
            </div>
          ))}
        </SectionCarousel>
      </div>
    </section>
  );
};
