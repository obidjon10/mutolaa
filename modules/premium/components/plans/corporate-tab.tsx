"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Button,
  FormRoot,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextFieldRoot,
  toast,
} from "@heroui/react";

import { formatPhone } from "@/modules/common";
import { PhoneIcon } from "@/modules/icons";

import { useCorporateLead } from "../../hooks";

const TEAM_SIZES = [
  { id: "0-50", name: "0-50" },
  { id: "50-100", name: "50-100" },
  { id: "100-500", name: "100-500" },
  { id: "500+", name: "500+" },
];

const INITIAL_FORM = {
  full_name: "",
  company_name: "",
  team_size: "",
  phone: "",
  message: "",
};

export const CorporateTab = () => {
  const t = useTranslations();
  const [form, setForm] = useState(INITIAL_FORM);
  const { mutate, isPending } = useCorporateLead();

  const set =
    (field: keyof typeof INITIAL_FORM) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate(
      { ...form, phone: `+998${form.phone?.trim()}` },
      {
        onSuccess: () => {
          toast.success(t("muvaffaqiyatli_yuborildi_siz_bilan_1_3_ish_kunida_boglanamiz"));
          setForm(INITIAL_FORM);
        },
      },
    );
  };

  return (
    <div className="mx-auto mt-10 grid max-w-249 grid-cols-1 gap-10 sm:grid-cols-2">
      {/* Left side — heading & phone */}
      <div className="flex flex-col justify-between">
        <div>
          <h3 className="whitespace-pre-line text-3xl font-semibold text-gray-900 dark:text-white sm:text-4xl">
            {t("bilimli_jamoa_yutuvchi_jamoa")}
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-gray-500 dark:text-gray-400 max-w-md">
            {t("korporativ_tavsifi")}
          </p>
        </div>

        <div className="mt-10">
          <p className="text-sm text-gray-900 dark:text-white">
            {t("hozir_gaplashishni_afzal_korasizmi")}
          </p>
          <a
            href="tel:+998773590100"
            className="mt-3 inline-flex items-center gap-2 rounded-full bg-muted dark:bg-muted-dark px-5 py-2.5 text-sm font-medium text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-900 transition-colors"
          >
            <PhoneIcon size={16} />
            +998 77 359 01 00
          </a>
        </div>
      </div>

      <FormRoot className="space-y-4" onSubmit={onSubmit}>
        <TextFieldRoot isRequired>
          <Label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
            {t("ism_familiya")}
          </Label>
          <Input
            className="bg-muted dark:bg-muted-dark w-full shadow-none"
            placeholder={t("ismingizni_kiriting")}
            value={form.full_name}
            onChange={set("full_name")}
          />
        </TextFieldRoot>

        <TextFieldRoot isRequired>
          <Label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
            {t("kompaniyangiz_nomi")}
          </Label>
          <Input
            className="bg-muted dark:bg-muted-dark w-full shadow-none"
            placeholder={t("kompaniyangiz_nomini_kiriting")}
            value={form.company_name}
            onChange={set("company_name")}
          />
        </TextFieldRoot>

        <Select
          isRequired
          placeholder={t("tanlang")}
          selectedKey={form.team_size || null}
          onSelectionChange={(key) =>
            setForm((prev) => ({ ...prev, team_size: key as string }))
          }
        >
          <Label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
            {t("jamoa_hajmi")}
          </Label>
          <Select.Trigger className="bg-muted dark:bg-muted-dark shadow-none">
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              {TEAM_SIZES.map((size) => (
                <ListBox.Item key={size.id} id={size.id}>
                  {size.name}
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              ))}
            </ListBox>
          </Select.Popover>
        </Select>

        <TextFieldRoot isRequired>
          <Label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
            {t("telefon_raqami")}
          </Label>
          <div className="flex gap-2">
            <div className="flex h-9 items-center rounded-xl bg-muted dark:bg-muted-dark px-3 text-sm text-gray-700 dark:text-gray-300">
              +998
            </div>
            <Input
              placeholder="00 000 00 00"
              className="flex-1 bg-muted dark:bg-muted-dark shadow-none"
              value={form.phone}
              onChange={(e) =>
                setForm((prev) => ({
                  ...prev,
                  phone: formatPhone(e.target.value),
                }))
              }
            />
          </div>
        </TextFieldRoot>

        <TextFieldRoot>
          <Label className="mb-1.5 block text-sm font-medium text-gray-900 dark:text-white">
            {t("xabar_qoldirish")}
          </Label>
          <TextArea
            className="bg-muted dark:bg-muted-dark w-full shadow-none"
            placeholder={t("xabar_placeholder")}
            rows={4}
            value={form.message}
            onChange={set("message")}
          />
        </TextFieldRoot>

        <div>
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isPending={isPending}
            className="rounded-full!"
          >
            {t("yuborish")}
          </Button>

          <p className="mt-2 text-center text-sm text-gray-500">
            {t("bir_ish_kuni_ichida")}
          </p>
        </div>
      </FormRoot>
    </div>
  );
};
