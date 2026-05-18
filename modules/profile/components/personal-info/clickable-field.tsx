"use client";

import { PencilIcon } from "@/modules/icons";

interface IProps {
  label: string;
  value: string;
  onClick: () => void;
}

export const ClickableField = ({ label, value, onClick }: IProps) => (
  <div>
    <p className="mb-1.5 text-sm font-medium text-foreground-muted">{label}</p>
    <button
      type="button"
      onClick={onClick}
      className="flex h-10 w-full cursor-pointer items-center justify-between rounded-xl bg-muted dark:bg-muted-dark px-3 text-left text-sm text-gray-900 dark:text-white"
    >
      <span className="truncate">{value}</span>
      <PencilIcon size={14} className="ml-2 shrink-0 text-gray-500" />
    </button>
  </div>
);
