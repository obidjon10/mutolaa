"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";

import { ConditionalRender } from "@/modules/common";
import {
  BulbIcon,
  GlobeIcon,
  HeadphonesIcon,
  MagicWand,
  RectanglePulseIcon,
  SparklesIcon,
} from "@/modules/icons";

import { IPremiumFeatures } from "../models";

const FeatureCard = ({
  icon,
  color,
  title,
  description,
}: Pick<IPremiumFeatures, "color" | "description" | "icon" | "title">) => (
  <div className="rounded-3xl border border-[#E4E4E7] dark:border-muted-dark p-4">
    <div className="mb-14 flex size-13 relative items-center justify-center rounded-xl">
      <ConditionalRender
        if={typeof icon === "string"}
        else={
          <div
            className="size-13 rounded-xl flex items-center justify-center"
            style={{ background: color }}
          >
            {icon}
          </div>
        }
      >
        <Image fill src={icon as string} alt={title} />
      </ConditionalRender>
    </div>
    <h3 className="text-xl font-semibold">{title}</h3>
    <p className="mt-2 mb-5 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
      {description}
    </p>
  </div>
);

const FEATURES: IPremiumFeatures[] = [
  {
    id: 1,
    icon: <MagicWand />,
    color: "#C8FEC2",
    title: "Tovushbezak funksiyasi",
    description: "Tovushbezak funksiyasi audiokitoblarni eshitish qiziqarli.",
  },
  {
    id: 2,
    icon: <HeadphonesIcon size={28} className="text-[#AA0168]" />,
    color: "#FFD2ED",
    title: "Qulay tinglang",
    description:
      "Ovoz tezligini sozlab, o‘zingizga mos tempda tinglashingiz mumkin.",
  },
  {
    id: 3,
    icon: <GlobeIcon size={28} className="text-[#787002]" />,
    color: "#FCF6A8",
    title: "Offline tinglang",
    description:
      "Kitoblarni yuklab olib, har qanday joyda uzluksiz tinglashingiz mumkin.",
  },
  {
    id: 4,
    icon: <RectanglePulseIcon />,
    color: "#B5E7FF",
    title: "Rivojlanishingizni kuzating",
    description: "Faolligingizni kuzatib, natijalaringizni nazorat qilasiz.",
  },
  {
    id: 5,
    icon: <SparklesIcon size={28} className="text-[#5C1B9D]" />,
    color: "#F0E6FA",
    title: "AI bilan chuqurroq tushuning",
    description: "Savollaringizga javob olib, kitob mazmunini tez anglaysiz.",
  },
  {
    id: 6,
    icon: <BulbIcon />,
    color: "#FFF0E6",
    title: "Bilimingizni mustahkamlang",
    description:
      "Testlar orqali o‘rganganlaringizni sinab, bilimni mustahkamlaysiz.",
  },
];

export const PremiumFeatures = () => {
  const t = useTranslations();
  // const { features } = usePremiumFeatures();

  return (
    <section className="mt-32">
      <h2 className="text-center text-2xl whitespace-pre-line font-semibold">
        {t("mutolaa_qilish_hardoimgidan_ham_qulayroq")}
      </h2>
      <p className="mx-auto mt-3 max-w-xl whitespace-pre-line font-medium text-center text-muted-dark dark:text-gray-400">
        {t("premium_features_subtitle")}
      </p>

      <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES?.map((feature) => (
          <FeatureCard
            key={feature?.id}
            icon={feature?.icon}
            color={feature?.color}
            title={feature?.title}
            description={feature?.description}
          />
        ))}
      </div>
    </section>
  );
};
