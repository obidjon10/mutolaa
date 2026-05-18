import { Skeleton } from "@heroui/react";

const ROW_WIDTHS = ["w-24", "w-32", "w-20", "w-28"];

export const CheckboxFilterSkeleton = () => (
  <div className="space-y-3 bg-white dark:bg-black p-3 rounded-2xl">
    <div className="flex flex-col divide-y divide-muted dark:divide-[#27272A]">
      {ROW_WIDTHS.map((width, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <div key={i} className="flex items-center gap-2.5 py-3">
          <Skeleton className="size-5 rounded shrink-0" />
          <Skeleton className={`h-4 ${width} rounded-lg`} />
        </div>
      ))}
    </div>
  </div>
);
