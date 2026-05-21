"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import classNames from "classnames";
import { motion } from "framer-motion";

import { useAppDispatch } from "@/lib";
import { useAuth, useProfile } from "@/modules/auth";
import {
  ArrowRightIcon,
  MutolaaIcon,
  MutolaaLogo,
  SearchIcon,
  SparklesIcon,
} from "@/modules/icons";
import { XMarkIcon } from "@/modules/icons/x-mark-icon";

import { setUser } from "../../store";
import { ConditionalRender } from "../conditional-render";

import { AuthButtons } from "./auth-section";
import { LanguageSwitcher } from "./language-switcher";
import { NavItems } from "./nav-items";
import { SidebarTooltip } from "./sidebar-tooltip";
import { ThemeSwitcher } from "./theme-switcher";
import { User } from "./user";
import { collapsibleItemClass } from "./utils";

export const SIDEBAR_EXPANDED = 284;
export const SIDEBAR_COLLAPSED = 78;

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  initialIsAuthenticated?: boolean;
}

export const Sidebar = ({
  isOpen,
  onClose,
  collapsed,
  onToggleCollapse,
  initialIsAuthenticated,
}: IProps) => {
  const t = useTranslations();
  const { push } = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated, isHydrated } = useAuth();
  const isAuth = isHydrated ? isAuthenticated : !!initialIsAuthenticated;
  const { data: user, isLoading } = useProfile(isAuth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(setUser(null));
    } else if (user) {
      dispatch(setUser(user));
    }
  }, [isAuthenticated, user, dispatch]);

  const onSearchClick = () => {
    push("/search");
    document.getElementById("page-search-input")?.focus();
  };

  return (
    <>
      <ConditionalRender if={isOpen}>
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      </ConditionalRender>

      <motion.aside
        initial={false}
        animate={{ width: collapsed ? SIDEBAR_COLLAPSED : SIDEBAR_EXPANDED }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        style={{ willChange: "width" }}
        className="fixed top-0 left-0 z-40 flex h-screen shrink-0 flex-col overflow-x-hidden px-4 py-8 lg:translate-x-0 lg:sticky lg:top-0 lg:z-auto w-71 -translate-x-full data-[open=true]:translate-x-0 transition-transform duration-200"
        data-open={isOpen}
      >
        <Link href="/" className="flex items-center mb-6 ml-2 overflow-hidden">
          <div className="shrink-0 cursor-pointer">
            <MutolaaIcon size={32} />
          </div>
          <motion.div
            initial={false}
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.15 }}
            className="flex w-full items-center justify-between gap-2 whitespace-nowrap"
            aria-hidden={collapsed}
          >
            <MutolaaLogo />
            <div className="flex items-center gap-1">
              <button
                className="rounded-lg border border-gray-200 dark:border-gray-700 p-1.5 hover:bg-gray-50 dark:hover:bg-white/10 lg:hidden"
                onClick={onClose}
              >
                <XMarkIcon size={18} />
              </button>
            </div>
          </motion.div>
        </Link>

        <SidebarTooltip
          enabled={collapsed}
          label={t("kitob_yoki_muallifni_izlang")}
        >
          <div
            role="button"
            tabIndex={0}
            aria-label={t("kitob_yoki_muallifni_izlang")}
            onClick={onSearchClick}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSearchClick();
              }
            }}
            className={classNames(
              "flex h-10 cursor-pointer items-center bg-white dark:bg-[#232326] outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 transition-[width,padding,gap,border-radius] duration-200 ease-out",
              collapsed
                ? "w-10 p-0 gap-0 justify-center mx-auto rounded-full"
                : "w-full px-3 gap-2 rounded-xl",
            )}
          >
            <SearchIcon className="shrink-0 text-gray-400" />
            {!collapsed && (
              <span className="text-left text-sm text-gray-400 whitespace-nowrap">
                {t("kitob_yoki_muallifni_izlang")}
              </span>
            )}
          </div>
        </SidebarTooltip>

        <NavItems collapsed={collapsed} onClose={onClose} />

        <ConditionalRender if={!user?.is_premium}>
          <Link
            href="/premium"
            title={collapsed ? "Mutolaa Premium" : undefined}
            className={classNames(
              "mb-2 flex h-10 items-center justify-center bg-brand text-white hover:bg-brand/90 font-medium text-sm rounded-full transition-[width,padding,gap] duration-200 ease-out",
              collapsed ? "w-10 p-0 gap-0 mx-auto" : "w-full px-3 gap-2",
            )}
          >
            {!collapsed && (
              <span className="whitespace-nowrap">Mutolaa Premium</span>
            )}
            <SparklesIcon />
          </Link>
        </ConditionalRender>

        <SidebarTooltip enabled={collapsed} label={t("panelni_ochish")}>
          <button
            type="button"
            onClick={onToggleCollapse}
            className={classNames(
              collapsibleItemClass(collapsed),
              "text-sm font-medium hover:bg-[#E1E1E2] dark:hover:bg-white/10 transition-colors cursor-pointer hidden lg:flex",
            )}
          >
            <span className="flex h-5 w-5 shrink-0 items-center justify-center">
              <ArrowRightIcon
                size={16}
                className={classNames("transition-transform duration-200", {
                  "rotate-180": !collapsed,
                })}
              />
            </span>
            {!collapsed && (
              <span className="whitespace-nowrap">{t("panelni_yopish")}</span>
            )}
          </button>
        </SidebarTooltip>
        <LanguageSwitcher collapsed={collapsed} />
        <ThemeSwitcher collapsed={collapsed} />

        <ConditionalRender
          if={isAuth}
          else={<AuthButtons user={user} collapsed={collapsed} />}
        >
          <ConditionalRender
            if={!isLoading}
            else={
              <div
                className={classNames(
                  "mt-4 bg-gray-200 dark:bg-gray-700 animate-pulse transition-[width,height,border-radius] duration-200 ease-out",
                  collapsed
                    ? "size-10 rounded-full mx-auto"
                    : "w-full h-14 rounded-xl",
                )}
              />
            }
          >
            <User collapsed={collapsed} user={user} />
          </ConditionalRender>
        </ConditionalRender>
      </motion.aside>
    </>
  );
};
