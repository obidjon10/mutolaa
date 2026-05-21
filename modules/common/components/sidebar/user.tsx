"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import classNames from "classnames";

import { IUser } from "@/modules/auth";
import { CrownIcon, GearIcon } from "@/modules/icons";

import { ConditionalRender } from "../conditional-render";

import { SidebarTooltip } from "./sidebar-tooltip";

interface IProps {
  collapsed: boolean;
  user?: IUser;
}

export const User: React.FC<IProps> = ({ collapsed, user }) => {
  const { push } = useRouter();

  return (
    <SidebarTooltip enabled={collapsed} label={user?.full_name}>
      <button
        type="button"
        onClick={() => push("/profile")}
        className={classNames(
          "mt-4 flex w-full items-center cursor-pointer overflow-hidden transition-[background-color,padding,border-radius,gap] duration-200 ease-out text-left",
          collapsed
            ? "bg-transparent dark:bg-transparent p-0 gap-0 rounded-full justify-center"
            : "bg-white dark:bg-white/5 hover:bg-gray-50 dark:hover:bg-white/10 p-4 gap-3 rounded-2xl justify-between",
        )}
      >
      <div
        className={classNames(
          "flex items-center min-w-0",
          collapsed ? "gap-0" : "gap-3 max-w-8/10",
        )}
      >
        <div
          className={classNames("size-10 relative shrink-0", {
            "border border-brand rounded-full": user?.is_premium,
          })}
        >
          <Image
            fill
            sizes="40px"
            alt={user?.full_name || "USER NAME"}
            src={user?.avatar || "/profile.webp"}
            className="rounded-full object-cover"
          />
          <ConditionalRender if={user?.is_premium}>
            <div className="absolute bottom-0 left-6 text-white size-4 flex items-center justify-center rounded-full bg-brand">
              <CrownIcon size={10} />
            </div>
          </ConditionalRender>
        </div>
        {!collapsed && (
          <div className="min-w-0 whitespace-nowrap">
            <p className="text-sm font-semibold truncate">{user?.full_name}</p>
            <ConditionalRender if={user?.is_premium}>
              <p className="text-sm text-foreground-muted truncate">Premium</p>
            </ConditionalRender>
          </div>
        )}
      </div>
        {!collapsed && <GearIcon />}
      </button>
    </SidebarTooltip>
  );
};
