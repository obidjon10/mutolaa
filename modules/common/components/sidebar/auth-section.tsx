import Image from "next/image";
import { useTranslations } from "next-intl";
import classNames from "classnames";

import { Link } from "@/i18n/navigation";
import { IUser } from "@/modules/auth";
import { LoginIcon } from "@/modules/icons";

const loginButtonClass = (collapsed: boolean) =>
  classNames(
    "flex items-center justify-center bg-orange-500 text-sm font-medium text-white hover:bg-orange-600 transition-colors",
    collapsed
      ? "size-10 rounded-full mx-auto"
      : "w-full rounded-full gap-2 py-2",
  );

export function AuthButtons({
  collapsed,
}: {
  collapsed: boolean;
  user?: IUser;
}) {
  const t = useTranslations();

  if (collapsed) {
    return (
      <Link
        href="/login"
        title={t("kirish")}
        className={classNames("mt-4", loginButtonClass(true))}
      >
        <LoginIcon />
      </Link>
    );
  }

  return (
    <div className="bg-white dark:bg-white/5 mt-4 p-4 rounded-2xl">
      <div className="mb-3.5">
        <div className="flex items-center justify-center">
          <div className="size-9 relative">
            <Image
              fill
              sizes="36px"
              alt="Custom profile"
              src="/profile.webp"
              className="rounded-full"
            />
          </div>
        </div>
        <div className="text-center">
          <p className="mt-1 font-semibold text-gray-900 dark:text-white">
            {t("hisobga_kirish")}
          </p>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-gray-400">
            {t("tosiqsiz_mutolaa_qilish_uchun_oz_hisobingizga_kiring")}
          </p>
        </div>
      </div>
      <Link href="/login" className={loginButtonClass(false)}>
        <span className="flex h-5 w-5 shrink-0 items-center justify-center">
          <LoginIcon />
        </span>
        <span className="whitespace-nowrap">{t("kirish")}</span>
      </Link>
    </div>
  );
}
