import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { routing } from "@/i18n/routing";
import { THEME_COOKIE } from "@/lib/theme";

import Providers from "./providers";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();
  const cookieStore = await cookies();
  const initialTheme =
    cookieStore.get(THEME_COOKIE)?.value === "dark" ? "dark" : "light";

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers initialTheme={initialTheme}>
        <NuqsAdapter>
          <NextTopLoader color="#FF9345" height={5} showSpinner={false} />
          {children}
        </NuqsAdapter>
      </Providers>
    </NextIntlClientProvider>
  );
}
