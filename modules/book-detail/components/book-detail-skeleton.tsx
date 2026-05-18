// Mirrors the real layout in `main.tsx` block-for-block so there's no
// content-jump when bookDetail resolves. Any spacing/structure change in the
// real layout should be reflected here.
const SkeletonMetaItem = () => (
  <div className="flex items-center gap-2">
    <div className="h-3 w-20 rounded bg-gray-300 dark:bg-neutral-700" />
    <div className="h-3 w-16 rounded bg-gray-300 dark:bg-neutral-700" />
  </div>
);

const SkeletonMetaSeparator = () => (
  <div className="h-4 w-px bg-gray-300 dark:bg-neutral-700" />
);

export const BookDetailSkeleton = () => (
  <div
    className="mx-auto p-4 mr-4 my-4 rounded-2xl bg-white dark:bg-black sm:p-8 shadow-card"
    aria-hidden="true"
  >
    {/* Back button (size-12 circle + text-2xl label) — kept in skeleton so the
        body below sits at the same Y as in the real layout. */}
    <div className="flex items-center gap-3 mb-8 animate-pulse">
      <div className="size-12 rounded-full bg-muted dark:bg-muted-dark" />
      <div className="h-7 w-44 rounded bg-gray-200 dark:bg-neutral-800" />
    </div>

    <div className="flex animate-pulse flex-col sm:flex-row sm:gap-16">
      {/* Left column — same width + pt as real (sm:w-73.75 pt-6) */}
      <div className="shrink-0 sm:w-73.75 pt-6">
        <div className="sm:sticky sm:top-8">
          {/* Cover (relative-centered 205x312 over a 73.75 muted circle) */}
          <div className="w-full">
            <div className="relative flex items-center justify-center">
              <div className="absolute size-73.75 rounded-full bg-muted dark:bg-muted-dark" />
              <div
                className="relative rounded-sm bg-gray-200 dark:bg-neutral-800"
                style={{ width: 205, height: 312 }}
              />
            </div>
          </div>

          {/* AppRecommendation (mt-16 rounded-3xl bg-muted p-4) */}
          <div className="mt-16 rounded-3xl bg-muted dark:bg-muted-dark p-4">
            <div className="text-center">
              <div className="mx-auto h-5 w-3/4 rounded bg-gray-300 dark:bg-neutral-700" />
              <div className="mx-auto mt-1 h-4 w-2/3 rounded bg-gray-300 dark:bg-neutral-700" />
            </div>
            <div className="mt-6 mb-5 flex items-center justify-center">
              <div className="size-32 rounded-2xl bg-gray-300 dark:bg-neutral-700" />
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <div className="h-10 w-31.5 rounded bg-gray-300 dark:bg-neutral-700" />
              <div className="h-10 w-31.5 rounded bg-gray-300 dark:bg-neutral-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Right column — pt-8 (not mt-8) to match real */}
      <div className="pt-8 min-w-0 flex-1 sm:mt-0">
        <div className="max-w-148.5">
          {/* Title — h-8 matches text-2xl line-height */}
          <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-neutral-800" />
          {/* Author/dubber row — mt-1.5 mb-6 to match real BookInfo */}
          <div className="mt-1.5 mb-6 h-3 w-1/3 rounded bg-gray-200 dark:bg-neutral-800" />
          {/* Description — w-9/10 text-sm leading-relaxed */}
          <div className="w-9/10 space-y-2">
            <div className="h-4 w-full rounded bg-gray-200 dark:bg-neutral-800" />
            <div className="h-4 w-11/12 rounded bg-gray-200 dark:bg-neutral-800" />
            <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-neutral-800" />
            <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-800" />
          </div>
          {/* Action buttons (mt-6 gap-3) */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-40 rounded-lg bg-gray-200 dark:bg-neutral-800" />
            <div className="h-10 w-40 rounded-lg bg-gray-200 dark:bg-neutral-800" />
            <div className="size-10 rounded-lg bg-gray-200 dark:bg-neutral-800" />
          </div>
        </div>

        {/* BookMetadata — mt-10 w-max, single inline row with separators */}
        <div className="mt-10 w-max">
          <div className="p-3 flex items-center gap-3 rounded-lg bg-muted dark:bg-muted-dark">
            <SkeletonMetaItem />
            <SkeletonMetaSeparator />
            <SkeletonMetaItem />
            <SkeletonMetaSeparator />
            <SkeletonMetaItem />
            <SkeletonMetaSeparator />
            <SkeletonMetaItem />
          </div>
        </div>

        {/* BookReviews — section mt-10 max-w-148.5, vertical list */}
        <div className="mt-10 max-w-148.5">
          <div className="h-7 w-32 rounded bg-gray-200 dark:bg-neutral-800" />
          <div className="mt-6 space-y-8">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={idx}
              >
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full bg-gray-200 dark:bg-neutral-800" />
                  <div className="space-y-1.5">
                    <div className="h-3 w-32 rounded bg-gray-200 dark:bg-neutral-800" />
                    <div className="h-3 w-20 rounded bg-gray-200 dark:bg-neutral-800" />
                  </div>
                </div>
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full rounded bg-gray-200 dark:bg-neutral-800" />
                  <div className="h-3 w-11/12 rounded bg-gray-200 dark:bg-neutral-800" />
                  <div className="h-3 w-3/4 rounded bg-gray-200 dark:bg-neutral-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);
