export const BannerSkeleton: React.FC = () => (
  <section className="mt-12">
    <div className="overflow-hidden">
      <div className="flex items-center justify-center">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="shrink-0 w-118.75 max-w-[92vw] px-2"
          >
            <div className="animate-pulse aspect-475/260 w-full rounded-4xl bg-gray-200" />
          </div>
        ))}
      </div>
    </div>
  </section>
);

export const CategoriesSkeleton: React.FC = () => (
  <div className="flex flex-wrap items-center gap-4 shrink-0">
    {Array.from({ length: 15 }).map((_, index) => (
      <div
        // eslint-disable-next-line react/no-array-index-key
        key={index}
        className="animate-pulse w-20.5 h-8 rounded-lg bg-gray-200"
      />
    ))}
  </div>
);

export const BookListSkeleton: React.FC = () => (
  <div className="px-6 sm:px-8 mt-12">
    <div className="flex items-center justify-between mb-6">
      <div className="animate-pulse w-40 h-8 rounded-lg bg-gray-200" />

      <div className="flex items-center gap-2.5">
        <div className="animate-pulse size-9 rounded-full bg-gray-200" />
        <div className="animate-pulse size-9 rounded-full bg-gray-200" />
      </div>
    </div>
    <div className="border rounded-2xl border-gray-100 dark:border-muted-dark">
      <div className="flex items-center divide-x divide-gray-100 dark:divide-muted-dark">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            className="py-8 px-10"
          >
            <div className="animate-pulse w-50 h-76 rounded-lg bg-gray-200" />
            <div className="flex flex-col items-center justify-center mt-3">
              <div className="animate-pulse w-35 h-6 rounded-md mb-1 bg-gray-200" />
              <div className="animate-pulse w-25 h-5 rounded-md bg-gray-200" />
              <div className="animate-pulse w-full mt-3 h-9 rounded-full bg-gray-200" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
