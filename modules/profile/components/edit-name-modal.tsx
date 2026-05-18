"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Modal, toast } from "@heroui/react";

import { getApiErrorMessage } from "@/modules/common";
import { PersonIcon, XMarkIcon } from "@/modules/icons";

import { useUpdateProfile } from "../hooks";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  currentName?: string;
}

interface IContentProps {
  currentName: string;
  onClose: () => void;
}

const EditNameContent = ({ currentName, onClose }: IContentProps) => {
  const t = useTranslations();
  const [name, setName] = useState(currentName);
  const { mutate, isPending } = useUpdateProfile();

  const onSubmit = () => {
    const trimmed = name.trim();
    if (!trimmed || trimmed === currentName.trim()) {
      onClose();
      return;
    }

    mutate(
      { full_name: trimmed },
      {
        onSuccess: () => onClose(),
        onError: (err) =>
          toast.danger(getApiErrorMessage(err, t("xatolik_yuz_berdi"))),
      },
    );
  };

  return (
    <div >
      <div className="flex items-start justify-between">
        <div className="flex size-10 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5">
          <PersonIcon />
        </div>
        <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
          <XMarkIcon size={16} />
        </Modal.CloseTrigger>
      </div>

      <h2 className="mt-5 font-semibold text-gray-900 dark:text-white">
        {t("ismni_ozgartirish")}
      </h2>

      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder={currentName}
        fullWidth
        className="mt-1 h-9 rounded-xl bg-muted dark:bg-muted-dark shadow-none"
        autoFocus
      />

      <div className="mt-6 flex justify-end gap-3">
        <Button variant="tertiary" onPress={onClose} className="rounded-full">
          {t("bekor_qilish")}
        </Button>
        <Button
          onPress={onSubmit}
          isDisabled={isPending || !name.trim()}
          className="rounded-full bg-orange-500 text-white hover:bg-orange-600"
        >
          {isPending ? t("yuklanmoqda") : t("tasdiqlash")}
        </Button>
      </div>
    </div>
  );
};

export const EditNameModal = ({
  isOpen,
  onClose,
  currentName = "",
}: IProps) => (
  <Modal.Root
    isOpen={isOpen}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
  >
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          {isOpen ? (
            <EditNameContent currentName={currentName} onClose={onClose} />
          ) : null}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal.Root>
);
