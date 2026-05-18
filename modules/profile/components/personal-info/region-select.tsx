"use client";

import { Label, ListBox, Select } from "@heroui/react";

import { useRegionList } from "@/modules/common";

interface IProps {
  label: string;
  placeholder: string;
  value?: number;
  onChange: (id?: number) => void;
  parent?: number;
  isRegion?: boolean;
  enabled: boolean;
}

export const RegionSelect = ({
  label,
  placeholder,
  value,
  onChange,
  parent,
  isRegion,
  enabled,
}: IProps) => {
  const { regions, isLoading } = useRegionList({
    parent,
    is_region: isRegion,
    enabled,
  });

  return (
    <Select
      selectedKey={value ? String(value) : null}
      onSelectionChange={(key) => onChange(key ? Number(key) : undefined)}
      isDisabled={!enabled || isLoading}
    >
      <Label className="mb-0.5 block text-sm text-foreground-muted">
        {label}
      </Label>
      <Select.Trigger className="bg-muted h-10 dark:bg-muted-dark shadow-none">
        <Select.Value>
          {({ defaultChildren, isPlaceholder }) =>
            isPlaceholder ? placeholder : defaultChildren
          }
        </Select.Value>
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {regions.map((region) => (
            <ListBox.Item
              key={region.id}
              id={String(region.id)}
              textValue={region.name}
            >
              {region.name}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  );
};
