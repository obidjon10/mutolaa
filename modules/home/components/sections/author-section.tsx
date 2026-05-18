"use client";

import { useCallback, useRef, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

import { AuthorCard } from "@/modules/authors";
import {
  SectionCarousel,
  SectionCarouselScrollStateType,
  SectionHeader,
} from "@/modules/common";

import { IHomeSectionAuthor } from "../../models";

interface IAuthorSectionProps {
  section: IHomeSectionAuthor;
}

export const AuthorSection = ({ section }: IAuthorSectionProps) => {
  const authors = section?.content;
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

  if (!authors?.length) return null;

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
          seeAllHref: "/authors",
        }}
      />
      <div>
        <SectionCarousel
          slideGapClass="gap-6"
          apiRef={carouselApiRef}
          ariaLabel={section?.title}
          slidePaddingStartClass="pl-6 sm:pl-8"
          onScrollStateChange={onScrollStateChange}
        >
          {authors?.map((author) => (
            <AuthorCard
              key={author?.id}
              authorId={author?.id}
              authorName={author?.name}
              authorImage={author?.image}
              bookCount={author?.book_count}
            />
          ))}
        </SectionCarousel>
      </div>
    </section>
  );
};
