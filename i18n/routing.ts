import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["uz", "qr"],
  defaultLocale: "uz",
});

export type LocaleType = (typeof routing.locales)[number];
