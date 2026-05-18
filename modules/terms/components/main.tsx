"use client"

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { ChevronRightIcon } from "@/modules/icons";

import { useTerms } from "../hooks";

export function Main() {
  const t = useTranslations();
  const { back } = useRouter();
  const { data } = useTerms();

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => back()}
      >
        <div className="bg-muted dark:bg-muted-dark size-8 rounded-full flex items-center justify-center">
          <ChevronRightIcon className="rotate-180" />
        </div>
        <h1 className="text-xl font-semibold">{t("ortga")}</h1>
      </div>

      <div
        className="
          [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-4 [&_h1]:mt-6
          [&_h2]:text-xl  [&_h2]:font-bold [&_h2]:mb-3 [&_h2]:mt-5
          [&_h3]:text-lg  [&_h3]:font-semibold [&_h3]:mb-2 [&_h3]:mt-4
          [&_h4]:text-base [&_h4]:font-semibold [&_h4]:mb-2 [&_h4]:mt-3
          [&_p]:mb-3 [&_p]:leading-relaxed
          [&_strong]:font-bold
          [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
          [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
          [&_li]:mb-1
        "
        dangerouslySetInnerHTML={{ __html: data?.content as string }}
      />
    </div>
  );
}
