import { useTranslations } from "next-intl";
import classNames from "classnames";

import { CheckIcon } from "@/modules/icons";
import { BiligWrapper } from "@/modules/streak";

export const CircularProgress = ({
  value,
  label,
  time,
  points,
  size = 156,
  strokeWidth = 14,
  isMainProgress = false,
}: {
  value?: number;
  label: string;
  time?: string;
  size?: number;
  points?: number;
  strokeWidth?: number;
  isMainProgress?: boolean;
}) => {
  const t = useTranslations();

  const GAP_DEG = 30;
  const ARC_DEG = 360 - GAP_DEG;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const arcLength = (ARC_DEG / 360) * circumference;
  const gapLength = circumference - arcLength;
  const clamped = Math.min(100, Math.max(0, value ?? 0));
  const fillLength = (clamped / 100) * arcLength;
  const center = size / 2;
  const rotation = 270 - (ARC_DEG + GAP_DEG / 2);
  const fillDeg = (clamped / 100) * ARC_DEG;
  const dotAngleDeg = rotation + fillDeg;
  const dotRad = (dotAngleDeg * Math.PI) / 180;
  const dotX = center + radius * Math.cos(dotRad);
  const dotY = center + radius * Math.sin(dotRad);

  const isComplete = (value ?? 0) >= 100;
  const accentColor = isComplete ? "#2EAD62" : "#FF6900";

  return (
    <div
      className="relative overflow-visible"
      style={{ width: size, height: size }}
    >
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        overflow="visible"
        className="block"
      >
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke="#E4E4E7"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${arcLength} ${gapLength}`}
          transform={`rotate(${rotation} ${center} ${center})`}
          className="dark:stroke-[#3f3f46]"
        />
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={accentColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${fillLength} ${circumference - fillLength}`}
          transform={`rotate(${rotation} ${center} ${center})`}
          className="transition-[stroke-dasharray,stroke] duration-700 ease-out"
        />
        <circle
          cx={dotX}
          cy={dotY}
          r={strokeWidth / 2 + 3}
          fill={accentColor}
          stroke="white"
          strokeWidth={2.5}
          className="dark:stroke-muted-dark drop-shadow-[0_6.36px_20.34px_#03030333]"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        {isComplete ? (
          <>
            <div
              className={classNames(
                "rounded-full flex items-center justify-center bg-[#2EAD62]",
                {
                  "size-10": isMainProgress,
                  "size-8": !isMainProgress,
                },
              )}
            >
              <CheckIcon size={28} className="text-white" />
            </div>
            <span
              className={classNames(
                "mt-2 font-semibold text-center text-[#2EAD62] leading-tight px-2",
                {
                  "text-xl": isMainProgress,
                  "text-base": !isMainProgress,
                },
              )}
            >
              {t("bugungi_reja_bajarildi")}
            </span>
          </>
        ) : (
          <>
            <div
              className={classNames("text-foreground-muted dark:text-[#a1a1aa]", {
                "text-sm": !isMainProgress,
                "text-base": isMainProgress,
              })}
            >
              {label}
            </div>
            <div
              className={classNames(
                "font-semibold tracking-tight leading-tight mt-0.5 mb-2",
                {
                  "text-[28px]": !isMainProgress,
                  "text-[32px]": isMainProgress,
                },
              )}
            >
              {time}
            </div>
            <BiligWrapper
              coinSize={13}
              className="text-sm! px-1.5"
              biligCount={points as number}
            />
          </>
        )}
      </div>
    </div>
  );
};
