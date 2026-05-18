"use client";

import { useCallback, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Button, ButtonGroup, toast } from "@heroui/react";

import { useRouter } from "@/i18n/navigation";
import { useAppDispatch } from "@/lib";
import { useAuth } from "@/modules/auth";
import {
  ConditionalRender,
  setAuthRequiredModal,
  useShare,
} from "@/modules/common";
import { CheckIcon, NodesRightIcon, PlusIcon } from "@/modules/icons";
import { usePlanToReadCreate, usePlanToReadRemove } from "@/modules/my-library";
import { type IPlayerChapter, useAudioActions } from "@/modules/player";

import type { IAudiobook, IAuthor, IDubber } from "../models";

import { PersonField } from "./person-field";

interface IProps {
  id?: number;
  desc?: string;
  slug?: string;
  cover?: string;
  title?: string;
  authors?: IAuthor[];
  dubbers?: IDubber[];
  isSaved?: boolean;
  hasAudio?: boolean;
  hasEBook?: boolean;
  audioFragment?: string;
  hasAudioBookAccess?: boolean;
  hasEBookAccess?: boolean;
  audiobook?: IAudiobook;
}

export const BookInfo: React.FC<IProps> = ({
  id,
  slug,
  desc,
  cover,
  title,
  authors,
  dubbers,
  isSaved,
  hasAudio,
  hasEBook,
  audioFragment,
  hasAudioBookAccess,
  hasEBookAccess,
  audiobook,
}) => {
  const locale = useLocale();
  const t = useTranslations();
  const { push } = useRouter();
  const { share } = useShare();
  const dispatch = useAppDispatch();
  const { loadTrack, openFullPlayer } = useAudioActions();
  const { isAuthenticated } = useAuth();
  const [isSavedState, setIsSavedState] = useState<boolean | undefined>(
    isSaved,
  );

  const requireAuth = (titleKey: string, action: () => void) => {
    if (!isAuthenticated) {
      dispatch(setAuthRequiredModal({ visible: true, title: titleKey }));
      return;
    }
    action();
  };

  const onListen = () => {
    const subtitle = [authors?.[0]?.name, dubbers?.[0]?.name]
      .filter(Boolean)
      .join(" • ");

    if (hasAudioBookAccess && audiobook?.files?.length) {
      const chapters: IPlayerChapter[] = audiobook.files.map((f) => ({
        id: f.id,
        title: f.title,
        duration: f.duration,
        url: f.hls_playlist_file,
        urlWithEffect: f.hls_playlist_file_with_sound_effect,
      }));

      loadTrack({
        id: id ?? title ?? "unknown",
        url: chapters[0].url,
        title: title ?? "",
        subtitle,
        cover: cover ?? "",
        slug,
        chapters,
        chapterIndex: 0,
        hasSoundEffect: audiobook.has_sound_effect,
      });
      openFullPlayer();
      return;
    }

    // Fragment fallback (no access)
    if (!audioFragment) return;
    loadTrack({
      id: id ?? title ?? "unknown",
      url: audioFragment,
      title: title ?? "",
      subtitle,
      cover: cover ?? "",
      slug,
    });
    openFullPlayer();
  };

  const onRead = () => {
    push(`/reader/${slug}`);
  };

  const { mutate: addToPlanToRead, isPending: isPlanToReadPending } =
    usePlanToReadCreate();
  const { mutate: removeFromPlanToRead, isPending: isRemoving } =
    usePlanToReadRemove();

  const onPlanToRead = () => {
    if (!id || isPlanToReadPending) return;
    addToPlanToRead(id, {
      onSuccess: () => {
        setIsSavedState(true);
        toast.success(t("rejalarga_qoshildi"));
      },
    });
  };

  const onRemove = () => {
    if (!id || isRemoving) return;
    removeFromPlanToRead(id, {
      onSuccess: () => {
        setIsSavedState(false);
        toast.success(t("rejalardan_olindi"));
      },
    });
  };

  const onShare = useCallback(async () => {
    if (!slug) return;
    await share({
      url: `${window.location.origin}/${locale}/book/${slug}`,
      title,
    });
  }, [slug, locale, share, title]);

  return (
    <div className="max-w-148.5">
      <h1 className="font-bold text-2xl text-gray-900 dark:text-white">
        {title}
      </h1>
      <div className="flex items-center gap-2 mt-1.5 mb-6">
        <PersonField
          label={t("muallif")}
          people={authors}
          searchParam="authors"
        />
        {!!authors?.length && !!dubbers?.length && (
          <div className="text-foreground-muted text-xs">•</div>
        )}
        <PersonField
          label={t("ovozlashtiruvchi")}
          people={dubbers}
          searchParam="dubbers"
        />
      </div>
      <p className="text-sm w-9/10 text-gray-700 dark:text-gray-300 leading-relaxed">
        {desc}
      </p>
      <div className="flex items-center gap-3 mt-6">
        <ButtonGroup>
          <ConditionalRender if={hasEBook}>
            <Button
              onPress={() =>
                requireAuth("mutolaa_qilish_uchun_tizimga_kiring", onRead)
              }
            >
              <ConditionalRender if={hasEBookAccess} else={t("parchani_oqish")}>
                {t("mutolaa_qilish")}
              </ConditionalRender>
            </Button>
          </ConditionalRender>
          <ConditionalRender if={hasAudio}>
            <Button
              onPress={() =>
                requireAuth("tinglash_uchun_tizimga_kiring", onListen)
              }
            >
              <ButtonGroup.Separator />
              <ConditionalRender
                if={hasAudioBookAccess}
                else={t("parchani_tinglash")}
              >
                {t("tinglash")}
              </ConditionalRender>
            </Button>
          </ConditionalRender>
        </ButtonGroup>
        <ConditionalRender
          if={!isSavedState}
          else={
            <Button
              variant="tertiary"
              className="text-[#2EAD62]"
              isPending={isRemoving}
              onPress={onRemove}
            >
              <CheckIcon /> {t("saqlangan")}
            </Button>
          }
        >
          <Button
            variant="tertiary"
            isPending={isPlanToReadPending}
            className="bg-muted dark:bg-muted-dark"
            onPress={() =>
              requireAuth("saqlash_uchun_tizimga_kiring", onPlanToRead)
            }
          >
            <PlusIcon /> {t("albatta_oqiyman")}
          </Button>
        </ConditionalRender>
        <Button
          isIconOnly
          onPress={onShare}
          variant="tertiary"
          className="bg-muted dark:bg-muted-dark"
        >
          <NodesRightIcon />
        </Button>
      </div>
    </div>
  );
};
