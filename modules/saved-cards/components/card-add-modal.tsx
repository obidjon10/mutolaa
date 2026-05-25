"use client";

import { Modal } from "@heroui/react";

import { XMarkIcon } from "@/modules/icons";

import { CardForm } from "./card-form";
import { CardIconContent } from "./card-icon-content";

interface ICardAddModalProps {
  isOpen: boolean;
  onSuccess: (cardId: number, phone: string) => void;
  onClose: () => void;
}

export const CardAddModal = ({
  isOpen,
  onSuccess,
  onClose,
}: ICardAddModalProps) => (
  <Modal.Root
    isOpen={isOpen}
    onOpenChange={(open) => {
      if (!open) onClose();
    }}
  >
    <Modal.Backdrop>
      <Modal.Container>
        <Modal.Dialog>
          {isOpen && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <CardIconContent bg="grayBlack" />

                <Modal.CloseTrigger className="flex size-6 items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200 dark:hover:bg-white/10">
                  <XMarkIcon size={16} />
                </Modal.CloseTrigger>
              </div>
              <CardForm onClose={onClose} isModal onSuccess={onSuccess} />
            </div>
          )}
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  </Modal.Root>
);
