import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Dropdown, Separator } from "@heroui/react";
import classNames from "classnames";

import { usePathname, useRouter } from "@/i18n/navigation";
import { type LocaleType } from "@/i18n/routing";
import { ChevronRightIcon, GlobeIcon } from "@/modules/icons";

import { collapsibleItemClass } from "./utils";

function RadioIndicator({ active }: { active: boolean }) {
  return (
    <span
      className={classNames(
        "ml-auto size-4 shrink-0 rounded-full flex items-center justify-center",
        { "border-5": active, "border-2": !active },
      )}
      style={{ borderColor: active ? "var(--accent)" : "var(--border)" }}
    />
  );
}

const localeNames: Record<LocaleType, string> = {
  uz: "O'zbekcha",
  qr: "Qaraqalpaqsha",
};

const localeFlags: Record<LocaleType, string> = {
  uz: "/uzbekistan.webp",
  qr: "/karakalpakstan.webp",
};

export function LanguageSwitcher({ collapsed }: { collapsed: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale() as LocaleType;
  const t = useTranslations();

  const onSelect = (key: string) => {
    if (key !== locale) {
      router.replace(pathname, { locale: key as LocaleType });
    }
  };

  return (
    <Dropdown>
      {/*
        Heroui's Dropdown.Trigger renders its own <button> wrapper, so the
        child must be a non-interactive element — a <button> here would
        produce nested-button HTML and a hydration error. The PressResponder
        console warning that React Aria emits with a plain <div> child is a
        known Heroui pattern quirk and is benign.
      */}
      <Dropdown.Trigger>
        <div
          title={collapsed ? t("til") : undefined}
          className={classNames(
            collapsibleItemClass(collapsed),
            "text-sm font-medium hover:bg-[#E1E1E2] dark:hover:bg-white/10 transition-colors cursor-pointer",
          )}
        >
          <span className="flex h-5 w-5 shrink-0 items-center justify-center">
            <GlobeIcon />
          </span>
          {!collapsed && (
            <span className="flex w-full items-center gap-2 whitespace-nowrap">
              <span className="shrink-0">{t("til")}</span>
              <span className="flex items-center gap-2 ml-auto text-foreground-muted">
                <span className="shrink-0">{localeNames[locale]}</span>
                <ChevronRightIcon />
              </span>
            </span>
          )}
        </div>
      </Dropdown.Trigger>
      <Dropdown.Popover placement="right" className="rounded-2xl">
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={new Set([locale])}
          className="p-2"
          onAction={(key) => onSelect(key as string)}
        >
          <Dropdown.Item
            key="uz"
            id="uz"
            textValue="O'zbekcha"
            className="pl-2"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="relative size-5">
                  <Image src={localeFlags.uz} alt="UZ" sizes="20px" fill />
                </div>
                <span className="text-sm font-medium">{localeNames.uz}</span>
              </div>
              <RadioIndicator active={locale === "uz"} />
            </div>
          </Dropdown.Item>
          
          <Separator className="w-8/10 mx-auto my-1" />
          <Dropdown.Item
            key="qr"
            id="qr"
            textValue="Qaraqalpaqsha"
            className="pl-2"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <div className="relative size-5">
                  <Image src={localeFlags.qr} alt="QR" sizes="20px" fill />
                </div>
                <span className="text-sm font-medium">{localeNames.qr}</span>
              </div>
              <RadioIndicator active={locale === "qr"} />
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
}
