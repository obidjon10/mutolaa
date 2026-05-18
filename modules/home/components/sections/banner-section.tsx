"use client";

import Image from "next/image";
import Link from "next/link";

import { SectionCarousel } from "@/modules/common";

import { IHomeSectionBanner } from "../../models";

interface IBannerSectionProps {
  section: IHomeSectionBanner;
}

export const BannerSection = ({ section }: IBannerSectionProps) => {
  const banners = section?.content;
  const headingId = `home-section-${section?.id}`;

  if (!banners?.length) return null;

  return (
    <section aria-labelledby={headingId} className="mt-16">
      <h2 id={headingId} className="sr-only">
        {section?.title}
      </h2>
      <SectionCarousel ariaLabel={section?.title} slideGapClass="gap-6">
        {banners?.map((banner) => {
          const content = (
            <div className="relative aspect-475/260 w-full rounded-4xl shadow-[0_12px_12px_-14px_#0000001F]">
              <div className="relative h-full w-full overflow-hidden rounded-4xl bg-gray-100 dark:bg-neutral-900">
                <Image
                  fill
                  src={banner?.image}
                  alt={banner?.title}
                  sizes="475px"
                  className="object-cover"
                  priority
                />
              </div>
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-4xl shadow-[inset_0_0_0_2px_#00000014]"
              />
            </div>
          );

          return (
            <div key={banner?.id} className="shrink-0 w-118.75 max-w-[92vw]">
              {banner?.external_link ? (
                <Link
                  href={banner?.external_link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={banner?.title}
                  className="block"
                >
                  {content}
                </Link>
              ) : (
                <Link
                  className="block"
                  aria-label={banner?.title}
                  href={
                    banner?.type === "collection"
                      ? `/collections/${banner?.object_id}`
                      : `/search?publishers=${banner?.object_id}`
                  }
                >
                  {content}
                </Link>
              )}
            </div>
          );
        })}
      </SectionCarousel>
    </section>
  );
};
