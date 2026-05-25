"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal, Radio, RadioGroup, Skeleton } from "@heroui/react";

import { ConditionalRender } from "@/modules/common";
import { XMarkIcon } from "@/modules/icons/x-mark-icon";

import { useCancelReasons } from "../hooks";

interface IProps {
  isOpen: boolean;
  isSubmitting: boolean;
  onSubmit: (reasonId: number | null, reasonText: string) => void;
  onClose: () => void;
}

const OTHER_KEY = "other";

export const CancelReasonsModal = ({
  isOpen,
  isSubmitting,
  onSubmit,
  onClose,
}: IProps) => {
  const t = useTranslations();
  const { data: reasons, isLoading } = useCancelReasons(isOpen);
  // RadioGroup's value is a string. Numeric ids are serialised to strings here
  // and parsed back in handleSubmit.
  const [selected, setSelected] = useState<string | null>(null);
  const [customText, setCustomText] = useState("");

  const isOther = selected === OTHER_KEY;
  const canSubmit =
    selected !== null && (!isOther || customText.trim().length > 0);

  // Reset on close so a future open starts blank — done in the handler
  // (not an effect) to keep this state in sync with the parent's modal state.
  const handleClose = () => {
    setSelected(null);
    setCustomText("");
    onClose();
  };

  const handleSubmit = () => {
    if (!canSubmit || selected === null) return;
    if (isOther) {
      onSubmit(null, customText.trim());
    } else {
      onSubmit(Number(selected), "");
    }
  };

  return (
    <Modal.Root
      isOpen={isOpen}
      onOpenChange={(open) => !open && handleClose()}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-md p-6">
            <Modal.CloseTrigger className="absolute top-4 right-4 flex size-7 items-center justify-center rounded-full bg-muted dark:bg-muted-dark text-foreground-muted hover:bg-gray-200 dark:hover:bg-white/10">
              <XMarkIcon size={16} />
            </Modal.CloseTrigger>

            <h2 className="text-xl font-semibold">{t("afsusdamiz")}</h2>
            <p className="text-foreground-muted">
              {t("nima_sizni_qoniqtirmadi")}
            </p>

            <div className="mt-4 space-y-3">
              <ConditionalRender
                if={isLoading}
                else={
                  <RadioGroup
                    value={selected ?? ""}
                    onChange={(value) => setSelected(value)}
                    className="flex flex-col gap-3"
                  >
                    {reasons?.map((reason) => (
                      <Radio
                        key={reason.id}
                        value={String(reason.id)}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Radio.Control className="size-5! mt-0!">
                          <Radio.Indicator className="before:bg-muted dark:before:bg-muted-dark" />
                        </Radio.Control>
                        <Radio.Content className="text-sm font-medium">
                          {reason.content}
                        </Radio.Content>
                      </Radio>
                    ))}
                    <Radio
                      value={OTHER_KEY}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Radio.Control className="size-5! mt-0!">
                        <Radio.Indicator className="before:bg-muted dark:before:bg-muted-dark" />
                      </Radio.Control>
                      <Radio.Content className="text-sm font-medium">
                        {t("boshqa_sabab")}
                      </Radio.Content>
                    </Radio>
                    <ConditionalRender if={isOther}>
                      <Input
                        value={customText}
                        autoFocus
                        onChange={(e) => setCustomText(e.target.value)}
                        className="bg-white dark:bg-black border border-brand rounded-xl"
                      />
                    </ConditionalRender>
                  </RadioGroup>
                }
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Skeleton key={i} className="h-7 w-full rounded-lg" />
                ))}
              </ConditionalRender>
            </div>

            <div className="mt-6 flex items-center justify-end gap-2">
              <Button
                variant="tertiary"
                className="rounded-full"
                isDisabled={!canSubmit}
                isPending={isSubmitting}
                onPress={handleSubmit}
              >
                {t("obunani_bekor_qilish")}
              </Button>
              <Button
                className="rounded-full bg-brand text-white"
                onPress={handleClose}
              >
                {t("ortga_qaytish")}
              </Button>
            </div>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
};

