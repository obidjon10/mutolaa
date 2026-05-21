"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { useAppSelector } from "@/lib";

import { useCoinsPackage } from "../hooks";
import { ICoinsPackage } from "../models";

import { BiligWrapper } from "./bilig-wrapper";
import { FreezeModal } from "./freeze-modal";
interface IProps {
  freezeCount?: number;
}

export const Freeze: React.FC<IProps> = ({ freezeCount }) => {
  const t = useTranslations();
  const { coinsPackage } = useCoinsPackage();
  const userCoin = useAppSelector(({ common }) => common?.user?.coin_amount);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialPackage, setInitialPackage] = useState<ICoinsPackage | null>(
    null,
  );

  const handlePackageClick = (pkg: ICoinsPackage) => {
    setInitialPackage(pkg);
    setIsModalOpen(true);
  };

  return (
    <div className="mt-9">
      <div className="font-semibold">{t("muzlar")}</div>
      <div className="flex items-center mt-2 gap-4">
        <div className="border border-[#E4E4E7] dark:border-[#27272A] h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
          <p className="text-foreground-muted text-xs">{t("mavjud_muz")}</p>
          <div className="flex items-end gap-1">
            <div className="text-xl font-semibold">{freezeCount}</div>
            <p className="text-sm mb-0.5">{t("ta")}</p>
          </div>
        </div>
        <div className="border border-[#E4E4E7] dark:border-[#27272A] h-19.5 rounded-xl p-2 w-full flex flex-col justify-between">
          <p className="text-foreground-muted text-xs">{t("mavjud_bilig")}</p>
          <div className="flex items-end gap-2">
            <div className="text-xl font-semibold">{userCoin || 0}</div>
            <p className="text-sm mb-0.5">{t("ta")}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center mt-4 gap-2 sm:gap-3">
        {coinsPackage?.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => handlePackageClick(item)}
            className="bg-[#FAFAFA] dark:bg-muted-dark h-20 flex-1 sm:flex-none sm:w-28.75 rounded-xl gap-y-4 p-2 flex items-center flex-col cursor-pointer hover:bg-[#F0F0F0] dark:hover:bg-[#232323] transition-colors"
          >
            <div className="flex items-center gap-1">
              <Image src="/freeze.webp" alt="Freeze" width={24} height={24} />
              <p className="text-sm font-semibold">{item.freeze_count}</p>
            </div>
            <BiligWrapper coinSize={12} biligCount={item.coin_cost} />
          </button>
        ))}
      </div>

      <FreezeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        packages={coinsPackage ?? []}
        initialPackage={initialPackage}
        userCoins={userCoin}
      />
    </div>
  );
};
