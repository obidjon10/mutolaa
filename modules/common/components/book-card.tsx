import Image from "next/image";

import { Link } from "@/i18n/navigation";

interface IBookCardProps {
  title: string;
  author?: string;
  cover: string;
  slug: string;
  width?: number;
}

const BOOK_SPINE_GRADIENT =
  "linear-gradient(90deg, rgba(255,255,255,0), rgba(255,255,255,0) 12%, rgba(255,255,255,0.5) 29.25%, rgba(255,255,255,0) 50.5%, rgba(255,255,255,0) 75.25%, rgba(255,255,255,0.5) 91%, rgba(255,255,255,0)), linear-gradient(90deg, rgba(0,0,0,0.06), rgba(0,0,0,0.2) 12%, transparent 30%, rgba(0,0,0,0.04) 50%, rgba(0,0,0,0.35) 73.5%, rgba(0,0,0,0.7) 75.25%, rgba(0,0,0,0.25) 85.25%, transparent)";

export function BookCard({
  title,
  author,
  cover,
  slug,
  width = 163,
}: IBookCardProps) {
  const depth = Math.round(width * 0.13);
  const spineWidth = Math.round(depth * 1.4);

  return (
    <Link
      href={`/book/${slug}`}
      className="group flex flex-col bg-transparent"
    >
      <div className="flex justify-center overflow-visible px-1 py-1 sm:px-2 sm:py-2">
        <div className="z-10 w-min perspective-midrange [--book-shadow-1:rgba(15,23,42,0.08)] [--book-shadow-2:rgba(15,23,42,0.14)] dark:[--book-shadow-1:rgba(0,0,0,0.35)] dark:[--book-shadow-2:rgba(0,0,0,0.55)]">
          <div
            className="relative aspect-3/4 rounded-lg transform-3d transform-[rotateY(0deg)] group-hover:transform-[rotateY(-28deg)] motion-reduce:transition-none motion-reduce:group-hover:transform-[rotateY(0deg)]"
            style={{
              width,
              transition: "transform 720ms cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* Front cover */}
            <div
              className="absolute inset-y-0 left-0 rounded-lg size-full overflow-hidden bg-neutral-800"
              style={{
                transform: `translateZ(${depth}px)`,
                boxShadow:
                  "0 1px 2px var(--book-shadow-1), 0 6px 14px -4px var(--book-shadow-2), 0 14px 32px -8px var(--book-shadow-1)",
              }}
            >
              <Image
                src={cover}
                alt={`Muqova: ${title}`}
                fill
                sizes={`${width}px`}
                className="absolute inset-0 size-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-white/5"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute left-0 top-0 h-full opacity-40"
                aria-hidden="true"
                style={{ minWidth: "8.2%", background: BOOK_SPINE_GRADIENT }}
              />
            </div>

            {/* Spine (pages edge) */}
            <div
              className="absolute left-0 bg-white"
              aria-hidden="true"
              style={{
                top: 3,
                bottom: 3,
                width: spineWidth,
                transform: `translateX(${width - depth}px) rotateY(90deg)`,
                background: "linear-gradient(90deg, #fff 50%, #f9f9f9 50%)",
                boxShadow: "rgba(0,0,0,0.08) -1px 0 2px inset",
              }}
            />

            {/* Back cover */}
            <div
              className="absolute rounded-lg inset-y-0 left-0 size-full overflow-hidden bg-neutral-900"
              aria-hidden="true"
              style={{
                transform: `translateZ(-${depth}px)`,
                boxShadow:
                  "-4px 0 16px -4px var(--book-shadow-1), -10px 0 28px -8px var(--book-shadow-2)",
              }}
            >
              <Image
                src={cover}
                alt=""
                fill
                sizes={`${width}px`}
                className="size-full object-cover brightness-[0.4] saturate-[0.85]"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-1 px-1 pb-1 pt-3 sm:px-2">
        <p className="line-clamp-2 text-pretty text-sm font-semibold text-foreground dark:text-white">
          {title}
        </p>
        {author ? (
          <p className="line-clamp-2 text-xs text-foreground-muted">{author}</p>
        ) : null}
      </div>
    </Link>
  );
}
