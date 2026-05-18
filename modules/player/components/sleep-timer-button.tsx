"use client";

import { useTranslations } from "next-intl";
import { Dropdown } from "@heroui/react";
import classNames from "classnames";

import { StopWatchIcon } from "@/modules/icons";

import type { SleepTimerModeType } from "../context";
import {
  useAudioActions,
  useAudioPlayback,
  useSleepTimerRemaining,
} from "../context";

interface IProps {
  className?: string;
}

const MINUTE_OPTIONS: number[] = [5, 10, 15, 30, 45, 60];

const formatLabel = (
  minutes: number,
  labelMinute: string,
  labelHour: string,
) => (minutes === 60 ? `1 ${labelHour}` : `${minutes} ${labelMinute}`);

const formatRemaining = (ms: number) => {
  const totalSeconds = Math.max(0, Math.ceil(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};

export const SleepTimerButton = ({ className = "" }: IProps) => {
  const t = useTranslations();
  const { sleepTimerMode } = useAudioPlayback();
  const sleepTimerRemainingMs = useSleepTimerRemaining();
  const { setSleepTimer } = useAudioActions();

  const isActive = sleepTimerMode !== null;
  const selectedKey: string =
    sleepTimerMode === null
      ? "off"
      : sleepTimerMode === "end"
        ? "end"
        : String(sleepTimerMode);

  const onSelect = (key: string) => {
    if (key === "off") {
      setSleepTimer(null);
      return;
    }
    if (key === "end") {
      setSleepTimer("end");
      return;
    }
    const minutes = Number(key);
    if (Number.isFinite(minutes)) {
      setSleepTimer(minutes as SleepTimerModeType);
    }
  };

  return (
    <Dropdown>
      <Dropdown.Trigger>
        <div
          role="button"
          tabIndex={0}
          aria-label={t("uyqu_taymeri")}
          className={classNames(
            "inline-flex items-center gap-1.5 mt-2 rounded-full cursor-pointer text-sm tabular-nums transition-colors select-none",
            isActive
              ? "text-brand"
              : "hover:text-brand",
            className,
          )}
        >
          <StopWatchIcon />
          {typeof sleepTimerMode === "number" &&
          sleepTimerRemainingMs !== null ? (
            <span>{formatRemaining(sleepTimerRemainingMs)}</span>
          ) : null}
        </div>
      </Dropdown.Trigger>
      <Dropdown.Popover placement="top" className="rounded-2xl min-w-52">
        <Dropdown.Menu
          selectionMode="single"
          selectedKeys={new Set([selectedKey])}
          onAction={(key) => onSelect(key as string)}
          className="p-2"
        >
          <Dropdown.Item key="off" id="off" textValue={t("ochirish")}>
            {t("ochirish")}
          </Dropdown.Item>
          {MINUTE_OPTIONS.map((minutes) => {
            const label = formatLabel(minutes, t("daqiqa"), t("soat"));
            return (
              <Dropdown.Item
                key={String(minutes)}
                id={String(minutes)}
                textValue={label}
              >
                {label}
              </Dropdown.Item>
            );
          })}
          <Dropdown.Item key="end" id="end" textValue={t("bob_tugashi_bilan")}>
            {t("bob_tugashi_bilan")}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  );
};
