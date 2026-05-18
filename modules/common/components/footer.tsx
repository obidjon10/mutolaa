"use client";

import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

const SOCIAL_LINKS = [
  {
    name: "Telegram",
    href: "https://t.me/mutolaaxona",
    icon: (
      <svg
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.05399 5.45293C5.17076 3.6655 7.91527 2.48702 9.28747 1.91768C13.2101 0.291907 14.0242 0.00954641 14.5559 9.30764e-05C14.6728 -0.00188692 14.9331 0.0269197 15.103 0.16392C15.2442 0.279373 15.2839 0.435506 15.3038 0.54502C15.3215 0.654533 15.3457 0.904126 15.3259 1.09897C15.1141 3.32443 14.1941 8.72487 13.7264 11.2175C13.5301 12.2723 13.1395 12.6259 12.7623 12.6604C11.9415 12.7356 11.3194 12.1203 10.5251 11.6015C9.28307 10.7894 8.58153 10.284 7.37473 9.49173C5.98042 8.576 6.88493 8.07267 7.6792 7.2502C7.88653 7.03493 11.5003 3.7594 11.5687 3.46231C11.5775 3.42514 11.5864 3.2866 11.5025 3.21359C11.4209 3.14036 11.2995 3.16543 11.2113 3.18522C11.0855 3.21337 9.10213 4.52137 5.2545 7.109C4.69192 7.49473 4.1823 7.68273 3.72341 7.67287C3.22039 7.66207 2.24973 7.38873 1.5283 7.1552C0.645817 6.86867 -0.0579959 6.71713 0.00377776 6.23047C0.0346646 5.97713 0.385507 5.71787 1.05399 5.45293Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/mutolaaxona",
    icon: (
      <svg
        width="13"
        height="13"
        viewBox="0 0 13 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9.5 0H3.5C2.57205 0.000992641 1.68238 0.37006 1.02622 1.02622C0.37006 1.68238 0.000992641 2.57205 0 3.5V9.5C0.000992641 10.428 0.37006 11.3176 1.02622 11.9738C1.68238 12.6299 2.57205 12.999 3.5 13H9.5C10.428 12.999 11.3176 12.6299 11.9738 11.9738C12.6299 11.3176 12.999 10.428 13 9.5V3.5C12.999 2.57205 12.6299 1.68238 11.9738 1.02622C11.3176 0.37006 10.428 0.000992641 9.5 0ZM6.5 9.5C5.90666 9.5 5.32664 9.32405 4.83329 8.99441C4.33994 8.66476 3.95542 8.19623 3.72836 7.64805C3.5013 7.09987 3.44189 6.49667 3.55764 5.91473C3.6734 5.33279 3.95912 4.79824 4.37868 4.37868C4.79824 3.95912 5.33279 3.6734 5.91473 3.55764C6.49667 3.44189 7.09987 3.5013 7.64805 3.72836C8.19623 3.95542 8.66476 4.33994 8.99441 4.83329C9.32405 5.32664 9.5 5.90666 9.5 6.5C9.49917 7.2954 9.18284 8.05798 8.62041 8.62041C8.05798 9.18284 7.2954 9.49917 6.5 9.5ZM10.25 3.5C10.1017 3.5 9.95666 3.45601 9.83332 3.3736C9.70999 3.29119 9.61386 3.17406 9.55709 3.03701C9.50033 2.89997 9.48547 2.74917 9.51441 2.60368C9.54335 2.4582 9.61478 2.32456 9.71967 2.21967C9.82456 2.11478 9.9582 2.04335 10.1037 2.01441C10.2492 1.98547 10.4 2.00032 10.537 2.05709C10.6741 2.11386 10.7912 2.20999 10.8736 2.33332C10.956 2.45666 11 2.60166 11 2.75C11 2.94891 10.921 3.13968 10.7803 3.28033C10.6397 3.42098 10.4489 3.5 10.25 3.5ZM8.5 6.5C8.5 6.89556 8.3827 7.28224 8.16294 7.61114C7.94318 7.94004 7.63082 8.19638 7.26537 8.34776C6.89991 8.49913 6.49778 8.53874 6.10982 8.46157C5.72186 8.3844 5.36549 8.19392 5.08579 7.91421C4.80608 7.63451 4.6156 7.27814 4.53843 6.89018C4.46126 6.50222 4.50087 6.10009 4.65224 5.73463C4.80362 5.36918 5.05996 5.05682 5.38886 4.83706C5.71776 4.6173 6.10444 4.5 6.5 4.5C7.03043 4.5 7.53914 4.71071 7.91421 5.08579C8.28929 5.46086 8.5 5.96957 8.5 6.5Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@Mutolaaxona",
    icon: (
      <svg
        width="14"
        height="12"
        viewBox="0 0 14 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.4695 0.338507C13.0723 0.525087 13.5459 1.07283 13.7073 1.76983C13.9988 3.03191 14 5.66667 14 5.66667C14 5.66667 14 8.30147 13.7073 9.56353C13.5459 10.2605 13.0723 10.8083 12.4695 10.9948C11.3782 11.3333 7 11.3333 7 11.3333C7 11.3333 2.62183 11.3333 1.53045 10.9948C0.927727 10.8083 0.454067 10.2605 0.29272 9.56353C0 8.30147 0 5.66667 0 5.66667C0 5.66667 0 3.03191 0.29272 1.76983C0.454067 1.07283 0.927727 0.525087 1.53045 0.338507C2.62183 3.97364e-08 7 0 7 0C7 0 11.3782 3.97364e-08 12.4695 0.338507ZM9.34227 5.66687L5.5319 7.8666V3.4671L9.34227 5.66687Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com/mutolaaxona",
    icon: (
      <svg
        width="13"
        height="12"
        viewBox="0 0 13 12"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10.1581 0H12.1359L7.81492 4.94187L12.8981 11.6667H8.91805L5.80065 7.58813L2.2337 11.6667H0.2547L4.87635 6.3808L0 0H4.08116L6.89899 3.72795L10.1581 0ZM9.46392 10.4821H10.5599L3.48567 1.12239H2.30963L9.46392 10.4821Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];

export const Footer = () => {
  const t = useTranslations();

  const footerLinks = [
    { label: t("loyiha_haqida"), href: "/about" },
    { label: t("bizning_jamoa"), href: "/team" },
    { label: t("biz_bilan_aloqa"), href: "/contact" },
    { label: t("hamkorlar"), href: "/partners" },
  ];

  const legalLinks = [{ label: t("foydalanish_shartlari"), href: "/terms" }];

  return (
    <footer className="pt-6 px-8">
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-gray-900 underline dark:hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {SOCIAL_LINKS.map((social) => (
            <Link
              href={social.href}
              key={social.name}
              aria-label={social.name}
              className="bg-muted dark:bg-muted-dark flex items-center justify-center size-8 rounded-full transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {social.icon}
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-gray-400 dark:text-gray-500 sm:justify-start">
        {legalLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="hover:text-gray-600 underline dark:hover:text-gray-300 transition-colors"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  );
};
