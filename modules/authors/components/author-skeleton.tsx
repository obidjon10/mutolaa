import { Skeleton } from "@heroui/react";

export const AuthorSkeleton: React.FC = () => (
  <div className="flex gap-3 shrink-0 w-[256px] h-22 items-center p-4 bg-muted dark:bg-muted-dark rounded-2xl">
    <Skeleton className="rounded-full w-14 h-14 shrink-0" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-32 rounded-lg" />
      <Skeleton className="h-3 w-20 rounded-lg" />
    </div>
  </div>
);
