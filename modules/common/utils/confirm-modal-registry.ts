import type { ReactNode } from "react";

interface IRegistry {
  onConfirm?: () => void | Promise<void>;
  icon?: ReactNode;
}

let registry: IRegistry = {};

export const setConfirmRegistry = (next: IRegistry) => {
  registry = next;
};

export const getConfirmRegistry = (): IRegistry => registry;

export const clearConfirmRegistry = () => {
  registry = {};
};
