"use client";

import { useTranslations } from "next-intl";
import { Accordion, AccordionIndicator } from "@heroui/react";

import { RocketIcon } from "@/modules/icons";

const FAQ_KEYS = [1, 2, 3, 4, 5, 6] as const;

export const PremiumFAQ = () => {
  const t = useTranslations();

  return (
    <section className="mt-32">
      <h2 className="text-center text-2xl whitespace-pre-line font-semibold">
        {t("savol_va_javoblar")}
      </h2>
      <p className="mx-auto mt-3 font-medium max-w-xl text-center">
        {t("savol_va_javoblar_subtitle")}
      </p>

      <div className="mx-auto mt-16 max-w-162">
        <Accordion variant="surface">
          {FAQ_KEYS.map((num) => (
            <Accordion.Item key={num} id={num}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  <span className="mr-3 size-4 shrink-0 text-foreground-muted">
                    <RocketIcon />
                  </span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white text-left">
                    {t(`faq_${num}_question`)}
                  </span>
                  <AccordionIndicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t(`faq_${num}_answer`)}
                  </p>
                </Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
