import { useTranslations } from "next-intl";
import classnames from "classnames";

import { Link, usePathname } from "@/i18n/navigation";
import { useAppSelector } from "@/lib";
import { useAuth } from "@/modules/auth";
import {
  CrownIcon,
  FolderIcon,
  HomeIcon,
  LibraryBooksIcon,
  ShoppingCartIcon,
} from "@/modules/icons";

import { SidebarTooltip } from "./sidebar-tooltip";
import { collapsibleItemClass } from "./utils";

const navItems = [
  { labelKey: "asosiy_sahifa" as const, href: "/" as const, icon: HomeIcon },
  {
    labelKey: "toplamlar" as const,
    href: "/collections" as const,
    icon: FolderIcon,
  },
  {
    labelKey: "mutolaa_market" as const,
    href: "/market" as const,
    icon: ShoppingCartIcon,
  },
  {
    labelKey: "mutolaaxona" as const,
    href: "/my-library" as const,
    icon: LibraryBooksIcon,
    isPremium: true,
  },
  // {
  //   labelKey: "audiokitoblar" as const,
  //   href: "/audiobooks" as const,
  //   icon: HeadphonesIcon,
  // },
  // {
  //   labelKey: "badiiy_asarlar" as const,
  //   href: "/fiction" as const,
  //   icon: CopyTransparentIcon,
  // },
  // {
  //   labelKey: "ilmiy_kitoblar" as const,
  //   href: "/science" as const,
  //   icon: GraduationIcon,
  // },
];

export function NavItems({
  collapsed,
  onClose,
}: {
  collapsed: boolean;
  onClose: () => void;
}) {
  const t = useTranslations();
  const pathname = usePathname();
  const isPremium = useAppSelector(({ common }) => common?.user?.is_premium);
  const { isAuthenticated } = useAuth();

  return (
    <nav className="flex-1 mt-6 space-y-1 overflow-y-auto overflow-x-hidden">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        const isLocked = isAuthenticated && item.isPremium && !isPremium;

        return (
          <SidebarTooltip
            key={item.href}
            enabled={collapsed}
            label={t(item.labelKey)}
          >
            <Link
              href={isLocked ? "/premium" : item.href}
              onClick={onClose}
              className={classnames(
                collapsibleItemClass(collapsed),
                "relative text-sm font-medium transition-colors",
                isActive
                  ? "bg-[#E7E5E4] dark:bg-[#2E2E31]"
                  : "hover:bg-[#E7E5E4] dark:hover:bg-[#2E2E31]",
              )}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                <item.icon />
              </span>
              {!collapsed && (
                <span className="whitespace-nowrap">{t(item.labelKey)}</span>
              )}
              {isLocked && !collapsed && (
                <div className="absolute right-3">
                  <div className="relative flex items-center justify-center size-4 text-brand">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
                    <CrownIcon size={16} />
                  </div>
                </div>
              )}
            </Link>
          </SidebarTooltip>
        );
      })}
    </nav>
  );
}
