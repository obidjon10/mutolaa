"use client";

import Image from "next/image";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";

import { IMarketBanner } from "../models";

interface IProps {
  banners?: IMarketBanner[];
}

const getBannerHref = (banner: IMarketBanner): string | null => {
  switch (banner?.type) {
    case "book":
      return banner?.slug ? `/book/${banner.slug}` : null;
    case "publisher":
      return banner?.publisher?.id
        ? `/search/?publishers=${banner.publisher.id}`
        : null;
    case "collection":
      return banner?.collection ? `/collections/${banner.collection}` : null;
    default:
      return null;
  }
};

export const Banners = ({ banners }: IProps) => {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: false,
      skipSnaps: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })],
  );

  if (!banners?.length) return null;

  return (
    <section aria-labelledby="market-banners" className="mt-12">
      <div
        ref={emblaRef}
        role="region"
        aria-roledescription="carousel"
        aria-label="market-banners"
        className="overflow-hidden"
      >
        <div className="flex">
          {banners.map((banner) => {
            const href = getBannerHref(banner);

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
              <div
                key={banner?.id}
                className="shrink-0 w-118.75 max-w-[92vw] px-2"
              >
                {href ? (
                  <Link href={href} aria-label={banner?.title} className="block">
                    {content}
                  </Link>
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
