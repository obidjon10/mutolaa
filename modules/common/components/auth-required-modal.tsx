"use client";

import { useTranslations } from "next-intl";
import { Button, Modal } from "@heroui/react";

import { useRouter } from "@/i18n/navigation";
import { useAppDispatch, useAppSelector } from "@/lib";
import { LoginIcon, XMarkIcon } from "@/modules/icons";

import { setAuthRequiredModal } from "../store";

export function AuthRequiredModal() {
  const t = useTranslations();
  const dispatch = useAppDispatch();
  const visible = useAppSelector(
    ({ common }) => common?.authRequiredModal?.visible,
  );
  const title = useAppSelector(
    ({ common }) => common?.authRequiredModal?.title,
  );

  const { push } = useRouter();

  const onClose = () => {
    dispatch(setAuthRequiredModal({ visible: false, title: null }));
  };

  const onLogin = () => {
    onClose();
    push("/login");
  };

  return (
    <Modal.Root
      isOpen={visible}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-sm">
            {visible && (
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-500/10 text-orange-500">
                    <LoginIcon />
                  </div>
                  <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                    <XMarkIcon size={16} />
                  </Modal.CloseTrigger>
                </div>

                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {t(title as string)}
                </h2>
                <p className="text-sm text-foreground-muted mb-6">
                  {t("tizimga_kirish_uchun_tavsif")}
                </p>

                <Button className="w-full" onPress={onLogin}>
                  {t("kirish")}
                </Button>
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal.Root>
  );
}
