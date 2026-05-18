"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

interface IProps {
  light: string;
  dark: string;
  text: string;
}

const CompanyCard = ({ light, dark, text }: IProps) => (
  <div className="flex h-38.5 items-center justify-center rounded-2xl bg-muted dark:bg-muted-dark px-8">
    <Image
      src={dark}
      alt={text}
      width={150}
      height={150}
      style={{ height: "auto" }}
      className="block dark:hidden"
    />
    <Image
      src={light}
      alt={text}
      width={150}
      height={150}
      style={{ height: "auto" }}
      className="hidden dark:block"
    />
  </div>
);

const COMPANIES = [
  {
    text: "Yoshlar ishlar agentligi",
    light: "/yia-light.svg",
    dark: "/yia-logo.svg",
  },
  {
    text: "Xalq bank",
    light: "/xb-logo-new-light.svg",
    dark: "/xb-logo-new-dark.svg",
  },
  {
    text: "O‘zbekiston Milliy kutubxonasi",
    light: "/national-library.svg",
    dark: "/national-library.svg",
  },
  {
    text: "O‘zbekiston ko‘zi ojizlar jamiyati",
    light: "/society-blind.svg",
    dark: "/society-blind.svg",
  },
];

export const TrustedCompanies = () => {
  const t = useTranslations();

  return (
    <section className="mt-32">
      <h2 className="text-center text-2xl whitespace-pre-line font-semibold">
        {t("bizga_ishonch_bildirgan_jamoalar")}
      </h2>
      <p className="mx-auto mt-3 font-medium whitespace-pre-line max-w-xl text-center">
        {t("ishonch_subtitle")}
      </p>

      <div className="mx-auto mt-16 grid max-w-249 grid-cols-2 gap-4 sm:grid-cols-4">
        {COMPANIES.map((company) => (
          <CompanyCard
            key={company?.light}
            text={company?.text}
            light={company?.light}
            dark={company?.dark}
          />
        ))}
      </div>
    </section>
  );
};
