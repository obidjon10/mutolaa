"use client";

import { useCallback, useRef, useState } from "react";
import Image from "next/image";
import type { EmblaCarouselType } from "embla-carousel";

import { Link } from "@/i18n/navigation";
import {
  COLLECTION_FALLBACK_COLOR,
  SectionCarousel,
  SectionCarouselScrollStateType,
  SectionHeader,
} from "@/modules/common";

import { IHomeSectionCollection } from "../../models";

interface ICollectionSectionProps {
  section: IHomeSectionCollection;
}

const MAX_COLLECTIONS = 10;

export const CollectionSection = ({ section }: ICollectionSectionProps) => {
  const collections = section?.content?.slice(0, MAX_COLLECTIONS);
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

  if (!collections?.length) return null;

  return (
    <section aria-labelledby={headingId}>
      <SectionHeader
        id={headingId}
        title={section?.title}
        carousel={{
          seeAllHref: "/collections",
          onPrev: scrollPrev,
          onNext: scrollNext,
          canScrollPrev: scrollState.canScrollPrev,
          canScrollNext: scrollState.canScrollNext,
        }}
      />
      <div className="mt-5">
        <SectionCarousel
          apiRef={carouselApiRef}
          ariaLabel={section?.title}
          onScrollStateChange={onScrollStateChange}
        >
          {collections?.map((collection) => {
            const color = collection?.color_code || COLLECTION_FALLBACK_COLOR;

            return (
              <div
                key={collection?.id}
                className="shrink-0 basis-[45%] sm:basis-[30%] md:basis-[22%] lg:basis-[17%] xl:basis-[14%]"
              >
                <Link
                  href={`/collections/${collection?.id}`}
                  className="group block pt-4"
                  aria-label={collection?.title}
                >
                  <div className="relative">
                    {/* Back card 2 (farthest) */}
                    <div
                      aria-hidden="true"
                      className="absolute left-4 right-4 -top-4 h-6 rounded-t-lg backdrop-blur-[57px]"
                      style={{ backgroundColor: `${color}66` }}
                    />
                    {/* Back card 1 */}
                    <div
                      aria-hidden="true"
                      className="absolute left-2 right-2 -top-2 h-6 rounded-t-lg backdrop-blur-[57px]"
                      style={{ backgroundColor: `${color}66` }}
                    />
                    {/* Main card */}
                    <div
                      className="relative aspect-4/5 w-full overflow-hidden rounded-lg"
                      style={{ backgroundColor: color }}
                    >
                      <Image
                        fill
                        src={collection?.cover_image || collection?.image}
                        alt={collection?.title}
                        sizes="(min-width: 1280px) 14vw, (min-width: 1024px) 17vw, (min-width: 768px) 22vw, 45vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                      />
                      <h3 className="absolute left-3 text-center right-3 top-3 line-clamp-2 text-sm font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.35)] sm:text-base">
                        {collection?.title}
                      </h3>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </SectionCarousel>
      </div>
    </section>
  );
};
