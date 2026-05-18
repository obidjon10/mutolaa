import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { MutolaaIcon } from "@/modules/icons";
import { XMarkIcon } from "@/modules/icons/x-mark-icon";

export function PremiumCard() {
  const t = useTranslations();

  return (
    <div className="mb-6 rounded-2xl border border-gray-100 relative overflow-hidden bg-white p-4 shadow-sm">
      <div className="absolute bottom-0 right-0 w-28 h-28 z-0 pointer-events-none">
        <Image fill sizes="112px" loading="eager" alt="Pattern for Premium" src="/pattern.webp" />
      </div>
      <div className="relative z-10">
        <div className="mb-1 flex items-center gap-2">
          <MutolaaIcon />
          <button className="ml-auto bg-gray-100 size-5 cursor-pointer rounded-full flex items-center justify-center text-gray-600">
            <XMarkIcon />
          </button>
        </div>
        <p className="mt-3 text-sm font-semibold text-gray-900">
          {t("cheksiz_mutolaa")}
        </p>
        <p className="mt-1 text-xs text-gray-500 leading-relaxed">
          {t("premium_tavsif")}
        </p>
        <Link
          href="/premium"
          className="mt-3 inline-block text-sm font-semibold text-orange-500 hover:text-orange-600 bg-[linear-gradient(currentColor,currentColor)] bg-size-[0%_1px] bg-bottom-left bg-no-repeat transition-[background-size] duration-300 hover:bg-size-[100%_1px]"
        >
          {t("boshlash")}
        </Link>
      </div>
    </div>
  );
}
