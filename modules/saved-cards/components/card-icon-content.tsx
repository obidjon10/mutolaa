import classNames from "classnames";

import { CreditCardIcon } from "@/modules/icons";

interface IProps {
  bg: "orange" | "white" | "gray" | "red";
}

export const CardIconContent: React.FC<IProps> = ({ bg }) => (
  <div
    className={classNames(
      "size-10 rounded-full flex items-center justify-center",
      {
        "bg-white dark:bg-black": bg === "white",
        "bg-brand text-white": bg === "orange",
        "bg-[#b61414] text-red-500": bg === "red",
        "bg-muted dark:bg-muted-dark": bg === "gray",
      },
    )}
  >
    <CreditCardIcon />
  </div>
);
