"use client";

import { useTranslations } from "next-intl";
import { Slider } from "@heroui/react";

import { AGE_BOUNDS } from "../constants";

interface IProps {
  value: [number, number];
  onChange: (value: [number, number]) => void;
}

const toTuple = (value: number | number[]): [number, number] => {
  if (Array.isArray(value) && value.length === 2)
    return [value[0], value[1]] as [number, number];
  return [AGE_BOUNDS.min, AGE_BOUNDS.max];
};

export const AgeFilter = ({ value, onChange }: IProps) => {
  const t = useTranslations();
  const [min, max] = value;

  return (
    <div className="space-y-2 bg-white dark:bg-black p-3 rounded-2xl">
      <div className="flex items-center justify-between text-sm font-medium text-gray-700 dark:text-gray-300">
        <span>{t("yoshdan", { age: min })}</span>
        <span>{t("yoshgacha", { age: max })}</span>
      </div>

      <Slider
        aria-label={t("yosh")}
        value={value}
        onChange={(next) => onChange(toTuple(next))}
        minValue={AGE_BOUNDS.min}
        maxValue={AGE_BOUNDS.max}
        step={1}
      >
        <Slider.Track>
          <Slider.Fill />
          <Slider.Thumb index={0} />
          <Slider.Thumb index={1} />
        </Slider.Track>
      </Slider>
    </div>
  );
};
