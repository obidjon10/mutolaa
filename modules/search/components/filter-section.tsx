import { ReactNode } from "react";

interface IProps {
  title: string;
  children: ReactNode;
  defaultExpanded?: boolean;
}

export const FilterSection = ({ title, children }: IProps) => (
  <div className="border-b border-gray-100 dark:border-[#27272A] last:border-b-0">
    <div className="text-base font-semibold px-2">{title}</div>

    <div className="mt-4 data-[expanded=true]:mt-4">{children}</div>
  </div>
);
