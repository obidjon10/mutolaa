"use client";

import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Spinner } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";

import { useBookDetail } from "@/modules/book-detail";
import { decryptAes } from "@/modules/common";

import {
  useEbookReadTimeReporter,
  // useHighlights,
  useReaderPrefs,
} from "../hooks";
import { IReaderBook } from "../models";

import { ReaderView } from "./reader-view";

const AES_KEY = process.env.NEXT_PUBLIC_AES_KEY!;

const extractFragmentUrl = (fragment: unknown): string => {
  if (typeof fragment === "string") return fragment;
  if (fragment && typeof fragment === "object") {
    const f = fragment as { url?: unknown; file?: unknown };
    if (typeof f.url === "string") return f.url;
    if (typeof f.file === "string") return f.file;
  }
  return "";
};

export function Main() {
  const params = useParams<{ slug: string }>();
  const slug = params?.slug;
  const t = useTranslations();

  useEbookReadTimeReporter();

  const { bookDetail, isLoading, isError } = useBookDetail(slug);
  const { prefs, hydrated, setFontFamily, setFontSize, setTheme } =
    useReaderPrefs();
  // const { highlights, addHighlight } = useHighlights(slug);

  const hasAccess = !!bookDetail?.user_book_rights?.has_ebook_access;
  const encryptedFile = bookDetail?.ebook?.file ?? null;
  const fragmentUrl = bookDetail
    ? extractFragmentUrl(bookDetail.ebook_fragment)
    : "";

  const { data: decryptedUrl, isFetching: decrypting } = useQuery({
    queryKey: ["decrypted-epub", encryptedFile],
    queryFn: () =>
      decryptAes(encryptedFile as string, AES_KEY).catch(() => null),
    enabled: hasAccess && !!encryptedFile,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  const epubUrl =
    hasAccess && encryptedFile
      ? (decryptedUrl ?? "") || fragmentUrl
      : fragmentUrl;

  if (isLoading || !hydrated || decrypting) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3">
        <Spinner />
        <span className="text-sm text-foreground-muted">
          {t("yuklanmoqda")}
        </span>
      </div>
    );
  }

  if (isError || !bookDetail || !epubUrl) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-foreground-muted">
          {t("xatolik_yuz_berdi")}
        </p>
      </div>
    );
  }

  const book: IReaderBook = {
    id: bookDetail.id,
    slug: bookDetail.slug,
    title: bookDetail.title,
    authors: bookDetail.authors.map((a) => ({ id: a.id, name: a.name })),
    epub_url: epubUrl,
    last_location: null,
  };

  return (
    <div
      className={
        prefs.theme === "dark"
          ? "relative min-h-screen pt-6 bg-muted-dark"
          : "relative min-h-screen pt-6 bg-[#D6D3D1]"
      }
    >
      <ReaderView
        book={book}
        // highlights={highlights}
        // onCreateHighlight={(payload) => addHighlight.mutate(payload)}
        fontFamily={prefs.fontFamily}
        fontSize={prefs.fontSize}
        theme={prefs.theme}
        onFontFamilyChange={setFontFamily}
        onFontSizeChange={setFontSize}
        onThemeChange={setTheme}
      />
    </div>
  );
}
