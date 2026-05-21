import { useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { Switch } from "@heroui/react";
import classNames from "classnames";

import { useTheme } from "@/lib/theme";
import { MoonIcon } from "@/modules/icons";

import { SidebarTooltip } from "./sidebar-tooltip";
import { collapsibleItemClass } from "./utils";

const subscribe = () => () => {};
const useMounted = () =>
  useSyncExternalStore(subscribe, () => true, () => false);

export function ThemeSwitcher({ collapsed }: { collapsed: boolean }) {
  const t = useTranslations();
  const { theme, toggleTheme } = useTheme();
  const mounted = useMounted();

  return (
    <SidebarTooltip enabled={collapsed} label={t("tungi_rejim")}>
      <button
        onClick={toggleTheme}
        className={classNames(
          collapsibleItemClass(collapsed),
          "text-sm font-medium hover:bg-[#E1E1E2] dark:hover:bg-white/10 transition-colors cursor-pointer",
        )}
      >
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <MoonIcon />
        </span>
        {!collapsed && (
          <span className="flex w-full items-center justify-between gap-2 whitespace-nowrap">
            <span className="shrink-0">{t("tungi_rejim")}</span>
            {mounted && (
              <Switch
                size="sm"
                isSelected={theme === "dark"}
                onChange={toggleTheme}
              >
                <Switch.Control>
                  <Switch.Thumb />
                </Switch.Control>
              </Switch>
            )}
          </span>
        )}
      </button>
    </SidebarTooltip>
  );
}
