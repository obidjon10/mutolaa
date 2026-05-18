import classNames from "classnames";

import { ChevronRightIcon } from "@/modules/icons";

interface IProps {
  icon: React.ReactNode;
  label: string;
  value?: string;
  hasArrow?: boolean;
  isLast?: boolean;
  trailing?: React.ReactNode;
  onClick?: () => void;
}

export const ProfileRow = ({
  icon,
  label,
  value,
  hasArrow,
  isLast,
  trailing,
  onClick,
}: IProps) => (
  <div
    role={onClick ? "button" : undefined}
    tabIndex={onClick ? 0 : undefined}
    onClick={onClick}
    onKeyDown={(event) => {
      if (onClick && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        onClick();
      }
    }}
    className={classNames(
      "flex items-center gap-4 bg-muted dark:bg-muted-dark p-3",
      {
        "border-b border-[#E4E4E7] dark:border-gray-800": !isLast,
        "cursor-pointer hover:bg-gray-200/60 dark:hover:bg-white/5 transition-colors":
          !!onClick,
      },
    )}
  >
    <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-white dark:bg-black">
      {icon}
    </span>
    <div className="flex-1 min-w-0">
      <p className="text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </p>
      {value && (
        <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400 truncate">
          {value}
        </p>
      )}
    </div>
    {trailing}
    {hasArrow && (
      <ChevronRightIcon size={16} className="text-gray-400 shrink-0" />
    )}
  </div>
);
