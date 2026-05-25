import Image from "next/image";
import classNames from "classnames";

import { IBadge } from "../models";

import { BiligWrapper } from "./bilig-wrapper";

// SVG geometry for the in-progress ring. Using r=49 in a 100x100 viewBox plus
// `vector-effect="non-scaling-stroke"` keeps the stroke at exactly 2px (so it
// visually matches the `border-2` used by the complete state) regardless of
// the container size.
const RING_RADIUS = 49;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

interface IProps {
  badge: IBadge;
}

export function BadgeCard({ badge }: IProps) {
  const percent = Math.max(0, Math.min(100, badge.percent ?? 0));
  const isComplete = badge.is_obtained || percent >= 100;
  const isInProgress = !isComplete && percent > 0;

  // eslint-disable-next-line no-nested-ternary
  const imageSrc = isComplete
    ? badge.image_completed
    : isInProgress
      ? badge.image_progress
      : badge.image_inactive;

  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative size-26.5">
        {/* Base ring: green when complete, otherwise the muted track that
            stays visible behind the in-progress arc. */}
        <div
          className={classNames("size-full rounded-full", {
            "border-2 border-[#A3E635]": isComplete,
            "border border-[#E4E4E7] dark:border-[#27272A]": !isComplete,
          })}
        />
        {isInProgress && (
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 size-full -rotate-90"
            aria-hidden
          >
            <circle
              cx="50"
              cy="50"
              r={RING_RADIUS}
              fill="none"
              stroke="#A3E635"
              strokeWidth="2"
              strokeDasharray={RING_CIRCUMFERENCE}
              strokeDashoffset={RING_CIRCUMFERENCE * (1 - percent / 100)}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        )}
        <div
          className={classNames(
            "absolute inset-0 flex items-center justify-center rounded-full m-2.5",
            {
              "bg-muted dark:bg-[#27272A]": !isComplete,
              "bg-[#F7FEE7]": isComplete,
            },
          )}
        >
          <Image
            src={imageSrc}
            alt={badge.name}
            width={72}
            height={72}
            className="object-contain"
          />
        </div>
      </div>
      <p className="text-sm font-semibold">{badge.name}</p>
      <BiligWrapper biligCount={badge.award_coin_amount} />
    </div>
  );
}
