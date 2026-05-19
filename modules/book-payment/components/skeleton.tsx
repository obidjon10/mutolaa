import { Skeleton } from "@heroui/react";

export const BookPaymentSkeleton = () => (
  <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
    <div className="flex items-center gap-3 mb-8">
      <Skeleton className="size-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-40 rounded-md" />
        <Skeleton className="h-4 w-32 rounded-md" />
      </div>
    </div>
    <div className="mx-auto max-w-131.5 bg-muted dark:bg-muted-dark rounded-3xl p-5 space-y-4">
      <Skeleton className="h-24 rounded-2xl" />
      <Skeleton className="h-14 rounded-2xl" />
      <Skeleton className="h-32 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
    </div>
  </div>
);
