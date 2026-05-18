import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

export const AppRecommendation = () => {
  const t = useTranslations();

  return (
    <div className="mt-16 rounded-3xl bg-muted dark:bg-muted-dark p-4">
      <div className="text-center">
        <p className="font-semibold text-gray-900 dark:text-white">
          {t("ilovada_mutolaa_qiling")}
        </p>
        <p className="mt-1 text-sm text-foreground-muted">
          {t("mutolaa_ilovasini_yuklang")}
        </p>
      </div>
      <div className="shrink-0 flex items-center justify-center mt-6 mb-5">
        <Image
          src="/qr-code.svg"
          alt={t("ilovada_mutolaa_qiling")}
          width={128}
          height={128}
          style={{ height: "auto" }}
          className="block dark:hidden rounded-2xl"
        />
        <Image
          src="/qr-code-dark.svg"
          alt={t("ilovada_mutolaa_qiling")}
          width={128}
          height={128}
          style={{ height: "auto" }}
          className="hidden dark:block rounded-2xl"
        />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Link
          href={process.env.NEXT_PUBLIC_APP_APP_STORE_URL ?? ""}
          target="_blank"
          rel="noreferrer"
          aria-label="App Store"
          className="block"
        >
          <Image
            src="/app-store.svg"
            alt="App Store"
            width={126}
            height={40}
            className="h-10 block dark:hidden w-auto"
          />
          <Image
            src="/app-store-dark.svg"
            alt="App Store"
            width={126}
            height={40}
            className="h-10 hidden dark:block w-auto"
          />
        </Link>
        <Link
          href={process.env.NEXT_PUBLIC_APP_GOOGLE_PLAY_URL ?? ""}
          target="_blank"
          rel="noreferrer"
          aria-label="Google Play"
          className="block"
        >
          <Image
            src="/play-market.svg"
            alt="Google Play"
            width={126}
            height={40}
            className="h-10 block dark:hidden w-auto"
          />
          <Image
            src="/play-market-dark.svg"
            alt="Google Play"
            width={126}
            height={40}
            className="h-10 hidden dark:block w-auto"
          />
        </Link>
      </div>
    </div>
  );
};
