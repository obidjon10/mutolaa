import classNames from "classnames";

import { BiligCoinIcon } from "@/modules/icons";

interface IProps {
  biligCount: number;
  className?: string;
  coinSize?: number;
}

export const BiligWrapper: React.FC<IProps> = ({
  biligCount,
  className,
  coinSize = 11,
}) => (
  <div
    className={classNames(
      "inline-flex items-center gap-1 rounded-full bg-[#F5A52433] dark:bg-brand/15 px-1 py-0.5 text-xs font-medium",
      className,
    )}
  >
    <BiligCoinIcon size={coinSize} />
    {biligCount}
  </div>
);
