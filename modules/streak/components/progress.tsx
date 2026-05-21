import Image from "next/image";
import { useTranslations } from "next-intl";

import { CircularProgress, formatSecondsToTime } from "@/modules/common";

interface IProps {
  progressPercent?: number;
  streakTime?: number;
  streakCoin?: number;
}

export const Progress: React.FC<IProps> = ({
  progressPercent,
  streakTime,
  streakCoin,
}) => {
  const t = useTranslations();

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-x-10 lg:gap-x-16.5 mt-4">
      <CircularProgress
        size={200}
        isMainProgress
        strokeWidth={18}
        points={streakCoin}
        value={progressPercent}
        label={t("bugungi_reja")}
        time={formatSecondsToTime(streakTime as number)}
      />
      <div className="size-40 sm:size-44 lg:size-50 rounded-full bg-muted dark:bg-muted-dark flex items-center justify-center">
        <div className="relative size-32 sm:size-36 lg:size-40">
          <Image
            fill
            src="/tree.webp"
            alt="STREAK TREE"
            sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 128px"
            className="object-contain"
          />
          <Image
            fill
            src="/masked-tree.webp"
            alt="STREAK MASKED TREE"
            sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 128px"
            className="object-contain"
            style={{
              clipPath: `inset(0 0 ${Math.max(0, Math.min(100, progressPercent ?? 0))}% 0)`,
              transition: "clip-path 500ms ease-out",
            }}
          />
        </div>
      </div>
    </div>
  );
};
