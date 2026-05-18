export const SectionSkeleton = () => (
  <div className="animate-pulse" aria-hidden="true">
    <div className="h-7 w-48 rounded bg-gray-200 dark:bg-neutral-800" />
    <div className="mt-5 flex gap-4 overflow-hidden">
      {Array.from({ length: 6 }).map((_, idx) => (
        <div
          // eslint-disable-next-line react/no-array-index-key
          key={idx}
          className="shrink-0 basis-[45%] sm:basis-[30%] md:basis-[22%] lg:basis-[17%] xl:basis-[14%]"
        >
          <div className="aspect-3/4 w-full rounded-lg bg-gray-200 dark:bg-neutral-800" />
          <div className="mt-3 h-4 w-3/4 rounded bg-gray-200 dark:bg-neutral-800" />
        </div>
      ))}
    </div>
  </div>
);

export const SectionListSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="space-y-10 px-6 sm:px-8">
    {Array.from({ length: count }).map((_, idx) => (
      // eslint-disable-next-line react/no-array-index-key
      <SectionSkeleton key={idx} />
    ))}
  </div>
);
