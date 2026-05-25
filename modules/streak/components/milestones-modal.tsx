"use client";

import { useTranslations } from "next-intl";
import { Button, Modal, Separator } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import { ArrowRightIcon, XMarkIcon } from "@/modules/icons";

import { IBadgeWrapper } from "../models";

import { BadgeCard } from "./badge-card";

interface IProps {
  badges: IBadgeWrapper[];
}

export const MilestonesModal: React.FC<IProps> = ({ badges }) => {
  const t = useTranslations();

  return (
    <Modal>
      <Button
        variant="ghost"
        className="text-sm hover:bg-transparent cursor-pointer"
      >
        <div className="flex font-medium underline underline-offset-4 decoration-[#CDCDCE] items-center gap-0.5">
          {t("toliq_korish")}
          <ArrowRightIcon />
        </div>
      </Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-120">
            <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-foreground-muted hover:bg-gray-200 dark:hover:bg-white/10">
              <XMarkIcon size={16} />
            </Modal.CloseTrigger>
            <Modal.Header>
              <Modal.Heading className="text-xl font-semibold text-foreground dark:text-white">
                {t("osish_marralari")}
              </Modal.Heading>
            </Modal.Header>
            <Modal.Body className="text-black dark:text-white text-base">
              {badges.map((group, index) => (
                <div key={group.name}>
                  <div className="font-semibold mt-8">{group.name}</div>
                  <div className="grid grid-cols-3 gap-y-8 mt-4">
                    {group.items.map((badge) => (
                      <BadgeCard key={badge.id} badge={badge} />
                    ))}
                  </div>
                  <ConditionalRender if={index !== badges.length - 1}>
                    <Separator className="mt-8 bg-muted dark:bg-black" />
                  </ConditionalRender>
                </div>
              ))}
            </Modal.Body>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
