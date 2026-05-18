"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  Button,
  DateField,
  DatePicker,
  Input,
  Label,
  ListBox,
  Radio,
  RadioGroup,
  Select,
  toast,
} from "@heroui/react";
import { CalendarDate, parseDate } from "@internationalized/date";
import { I18nProvider } from "react-aria-components";

import { useAuth } from "@/modules/auth";
import {
  getApiErrorMessage,
  IRegion,
  IRegionParent,
  prepareAvatar,
  useCountryList,
  useJobChoicesList,
} from "@/modules/common";
import {
  CalendarIcon,
  ChevronRightIcon,
  PencilToLineIcon,
} from "@/modules/icons";

import { useProfileDetail, useUpdateProfile } from "../hooks";
import { IUserDetail } from "../models";

import { ClickableField } from "./personal-info/clickable-field";
import { RegionSelect } from "./personal-info/region-select";
import { EditEmailModal } from "./edit-email-modal";
import { EditPhoneModal } from "./edit-phone-modal";

const UZBEKISTAN_COUNTRY_ID = 1;

const extractRegionChain = (region?: IRegion | IRegionParent | null) => {
  const chain: number[] = [];
  let current: IRegion | IRegionParent | null | undefined = region;
  while (current) {
    chain.unshift(current.id);
    current = current.parent;
  }
  return {
    region: chain[0],
    district: chain[1],
    neighborhood: chain[2],
  };
};

const toCalendarDate = (value?: string): CalendarDate | null => {
  if (!value) return null;
  try {
    return parseDate(value);
  } catch {
    return null;
  }
};

interface IGeoState {
  country?: number;
  region?: number;
  district?: number;
  neighborhood?: number;
}

const PersonalInfoForm = ({ user }: { user: IUserDetail }) => {
  const t = useTranslations();
  const { push } = useRouter();
  const { mutate, isPending } = useUpdateProfile();
  const {
    countries,
    hasNextPage: hasMoreCountries,
    fetchNextPage: fetchMoreCountries,
    isFetchingNextPage: isFetchingMoreCountries,
  } = useCountryList();

  const onCountriesScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (
      hasMoreCountries &&
      !isFetchingMoreCountries &&
      el.scrollHeight - el.scrollTop - el.clientHeight < 64
    ) {
      fetchMoreCountries();
    }
  };
  const { jobChoices } = useJobChoicesList();

  const [fullName, setFullName] = useState(user.full_name ?? "");
  const [gender, setGender] = useState<"male" | "female">(
    (user.gender as "male" | "female") || "male",
  );
  const [birthDate, setBirthDate] = useState<CalendarDate | null>(() =>
    toCalendarDate(user.birth_date),
  );
  const [job, setJob] = useState<string>(user.job_key ?? "");
  const [geo, setGeo] = useState<IGeoState>(() => ({
    country: user.country?.id,
    ...extractRegionChain(user.region),
  }));
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const avatarPreview = useMemo(() => {
    if (!avatarFile) return null;
    return URL.createObjectURL(avatarFile);
  }, [avatarFile]);

  useEffect(
    () => () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    },
    [avatarPreview],
  );

  const onAvatarSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const prepared = await prepareAvatar(file);
      setAvatarFile(prepared);
    } catch (err) {
      const code = err instanceof Error ? err.message : "";
      const errorKeys: Record<string, string> = {
        "webp-not-allowed": "rasm_webp_qollab_quvvatlanmaydi",
        "too-large": "rasm_hajmi_juda_katta",
        "not-image": "fayl_rasm_emas",
      };
      toast.danger(t(errorKeys[code] ?? "xatolik_yuz_berdi"));
    }
  };

  const isUzbekistan = geo.country === UZBEKISTAN_COUNTRY_ID;

  const finalRegionId = useMemo(
    () => geo.neighborhood ?? geo.district ?? geo.region,
    [geo.neighborhood, geo.district, geo.region],
  );

  const onCountryChange = (id?: number) => setGeo({ country: id });

  const onRegionChange = (id?: number) =>
    setGeo((prev) => ({
      ...prev,
      region: id,
      district: undefined,
      neighborhood: undefined,
    }));

  const onDistrictChange = (id?: number) =>
    setGeo((prev) => ({ ...prev, district: id, neighborhood: undefined }));

  const onNeighborhoodChange = (id?: number) =>
    setGeo((prev) => ({ ...prev, neighborhood: id }));

  const onSubmit = () => {
    mutate(
      {
        full_name: fullName.trim(),
        birth_date: birthDate ? birthDate.toString() : undefined,
        country: geo.country,
        region: finalRegionId,
        gender,
        job: job || undefined,
        avatar: avatarFile ?? undefined,
      },
      {
        onSuccess: () => {
          toast.success(t("muvaffaqiyatli_saqlandi"));
          push("/profile");
        },
        onError: (err) =>
          toast.danger(getApiErrorMessage(err, t("xatolik_yuz_berdi"))),
      },
    );
  };

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => push("/profile")}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold">{t("shaxsiy_malumotlar")}</h1>
        </div>
      </div>

      <div className="mx-auto max-w-120 space-y-4 p-1 bg-muted dark:bg-muted-dark rounded-3xl">
        <div className="rounded-[20px] bg-white dark:bg-black p-4">
          <h2 className="text-xl font-semibold">{t("shaxsiy_malumot")}</h2>

          <div className="flex justify-center mt-5">
            <div className="relative">
              <div className="relative size-24.5 overflow-hidden rounded-full">
                <Image
                  fill
                  sizes="98px"
                  alt="Profile"
                  loading="eager"
                  src={avatarPreview || user?.avatar || "/profile.webp"}
                  className="object-cover"
                />
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/jpg,image/gif,image/bmp"
                className="hidden"
                onChange={onAvatarSelected}
              />
              <Button
                isIconOnly
                onPress={() => fileInputRef.current?.click()}
                className="absolute bottom-0 border-2 border-white right-0 flex size-8 items-center justify-center rounded-full bg-orange-500 text-white shadow-md"
              >
                <PencilToLineIcon />
              </Button>
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <div>
              <Label className="mb-1.5 block font-medium text-sm text-foreground-muted">
                {t("toliq_ism")}
              </Label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-muted h-10 dark:bg-muted-dark shadow-none"
                fullWidth
              />
            </div>

            <ClickableField
              label={t("telefon_raqam")}
              value={user.phone || ""}
              onClick={() => setPhoneModalOpen(true)}
            />

            <ClickableField
              label={t("elektron_pochta")}
              value={user.email || ""}
              onClick={() => setEmailModalOpen(true)}
            />

            <div className="grid grid-cols-2 gap-3">
              <RadioGroup
                value={gender}
                onChange={(value) => setGender(value as "male" | "female")}
                className="flex flex-col gap-1.5"
              >
                <Label className="text-sm font-medium text-foreground-muted">
                  {t("jins")}
                </Label>
                <div className="flex gap-2">
                  <Radio
                    value="male"
                    className="flex flex-1 items-center gap-2 rounded-xl bg-muted mt-0 h-10 dark:bg-muted-dark px-3 py-2 cursor-pointer"
                  >
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content className="text-sm">
                      {t("erkak")}
                    </Radio.Content>
                  </Radio>
                  <Radio
                    value="female"
                    className="flex flex-1 items-center gap-2 rounded-xl bg-muted mt-0 h-10 dark:bg-muted-dark px-3 py-2 cursor-pointer"
                  >
                    <Radio.Control>
                      <Radio.Indicator />
                    </Radio.Control>
                    <Radio.Content className="text-sm">
                      {t("ayol")}
                    </Radio.Content>
                  </Radio>
                </div>
              </RadioGroup>

              <I18nProvider locale="en-GB">
                <DatePicker
                  value={birthDate}
                  onChange={(v) => setBirthDate(v as CalendarDate | null)}
                >
                  <Label className="block font-medium text-sm mb-0.5 text-foreground-muted">
                    {t("tugilgan_sana")}
                  </Label>
                  <DateField.Group className="flex bg-muted dark:bg-muted-dark shadow-none h-10 items-center gap-0.5">
                    <DateField.Input>
                      {(segment) =>
                        segment.type === "literal" ? (
                          <span aria-hidden className="px-0">
                            .
                          </span>
                        ) : (
                          <DateField.Segment segment={segment}>
                            {({ type, text, isPlaceholder }) => {
                              if (isPlaceholder) {
                                if (type === "day") return "kk";
                                if (type === "month") return "oo";
                                if (type === "year") return "yyyy";
                              }
                              return text;
                            }}
                          </DateField.Segment>
                        )
                      }
                    </DateField.Input>
                    <DateField.Suffix>
                      <CalendarIcon />
                    </DateField.Suffix>
                  </DateField.Group>
                </DatePicker>
              </I18nProvider>
            </div>

            <Select
              selectedKey={job || null}
              onSelectionChange={(key) => setJob(key ? String(key) : "")}
            >
              <Label className="mb-0.5 block text-sm text-foreground-muted">
                {t("kasb")}
              </Label>
              <Select.Trigger className="bg-muted dark:bg-muted-dark h-10 shadow-none">
                <Select.Value>
                  {({ defaultChildren, isPlaceholder }) =>
                    isPlaceholder ? t("tanlang") : defaultChildren
                  }
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox>
                  {jobChoices.map((choice) => (
                    <ListBox.Item
                      key={choice.key}
                      id={choice.key}
                      textValue={choice.label}
                    >
                      {choice.label}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                </ListBox>
              </Select.Popover>
            </Select>
          </div>
        </div>

        <div className="rounded-[20px] bg-white dark:bg-black p-4">
          <h2 className="text-xl font-semibold">{t("manzil")}</h2>

          <div className="mt-4 space-y-4">
            <Select
              selectedKey={geo.country ? String(geo.country) : null}
              onSelectionChange={(key) =>
                onCountryChange(key ? Number(key) : undefined)
              }
            >
              <Label className="mb-0.5 block text-sm text-foreground-muted">
                {t("mamlakat")}
              </Label>
              <Select.Trigger className="bg-muted dark:bg-muted-dark h-10 shadow-none">
                <Select.Value>
                  {({ defaultChildren, isPlaceholder }) =>
                    isPlaceholder ? t("tanlang") : defaultChildren
                  }
                </Select.Value>
                <Select.Indicator />
              </Select.Trigger>
              <Select.Popover>
                <ListBox
                  onScroll={onCountriesScroll}
                  className="max-h-60 overflow-auto"
                >
                  {countries.map((country) => (
                    <ListBox.Item
                      key={country.id}
                      id={String(country.id)}
                      textValue={country.name}
                    >
                      {country.name}
                      <ListBox.ItemIndicator />
                    </ListBox.Item>
                  ))}
                  {isFetchingMoreCountries && (
                    <div className="px-3 py-2 text-center text-xs text-gray-500">
                      {t("yuklanmoqda")}
                    </div>
                  )}
                </ListBox>
              </Select.Popover>
            </Select>

            {isUzbekistan && (
              <>
                <RegionSelect
                  label={t("hudud")}
                  placeholder={t("tanlang")}
                  value={geo.region}
                  onChange={onRegionChange}
                  isRegion
                  enabled={isUzbekistan}
                />
                {geo.region != null && (
                  <RegionSelect
                    label={t("tuman")}
                    placeholder={t("tanlang")}
                    value={geo.district}
                    onChange={onDistrictChange}
                    parent={geo.region}
                    enabled
                  />
                )}
                {geo.district != null && (
                  <RegionSelect
                    label={t("mahalla")}
                    placeholder={t("tanlang")}
                    value={geo.neighborhood}
                    onChange={onNeighborhoodChange}
                    parent={geo.district}
                    enabled
                  />
                )}
              </>
            )}
          </div>
        </div>

        <Button
          onPress={onSubmit}
          isDisabled={isPending}
          className="w-full rounded-full! bg-orange-500 text-white hover:bg-orange-600 h-12"
        >
          {isPending ? t("yuklanmoqda") : t("saqlash")}
        </Button>
      </div>

      <EditPhoneModal
        isOpen={phoneModalOpen}
        onClose={() => setPhoneModalOpen(false)}
        currentPhone={user.phone}
      />
      <EditEmailModal
        isOpen={emailModalOpen}
        onClose={() => setEmailModalOpen(false)}
        currentEmail={user.email}
      />
    </div>
  );
};

export const PersonalInfoPage = () => {
  const { isAuthenticated } = useAuth();
  const { data: user } = useProfileDetail(isAuthenticated);

  if (!user) return null;
  return <PersonalInfoForm user={user} />;
};
