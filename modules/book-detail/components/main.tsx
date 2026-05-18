"use client";

import { useParams, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

import { useAuth } from "@/modules/auth";
import { ConditionalRender } from "@/modules/common";
import { ChevronRightIcon } from "@/modules/icons";

import { useBookDetail } from "../hooks";

import { AppRecommendation } from "./app-recommendation";
import { Cover } from "./book-cover";
import { BookDetailSkeleton } from "./book-detail-skeleton";
import { BookInfo } from "./book-info";
import { BookMetadata } from "./book-metadata";
import { BookPrices } from "./book-prices";
import { BookReviews } from "./book-reviews";
// import { MostReadBooks } from "./most-read-books";

export const Main = () => {
  const { back } = useRouter();
  const t = useTranslations();
  const { isAuthenticated } = useAuth();
  const { slug } = useParams<{ slug: string }>();
  const { bookDetail, isLoading } = useBookDetail(slug);

  if (isLoading || !bookDetail) return <BookDetailSkeleton />;

  return (
    <div className="mx-auto p-4 mr-4 my-4 rounded-2xl bg-white dark:bg-black sm:p-8 shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => back()}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <div className="text-2xl font-semibold">{t("ortga_qaytish")}</div>
      </div>
      <div className="flex flex-col sm:flex-row sm:gap-16">
        <div className="shrink-0 sm:w-73.75 pt-6">
          <div className="sm:sticky sm:top-8">
            <Cover alt={bookDetail?.title} cover={bookDetail?.image} />
            <AppRecommendation />
          </div>
        </div>

        <div className="pt-8 min-w-0 flex-1 sm:mt-0">
          <BookInfo
            slug={slug}
            id={bookDetail?.id}
            cover={bookDetail?.image}
            title={bookDetail?.title}
            isSaved={bookDetail?.has_saved}
            desc={bookDetail?.description}
            hasEBook={bookDetail?.has_ebook}
            hasAudio={bookDetail?.has_audiobook}
            authors={bookDetail?.authors}
            dubbers={bookDetail?.dubber}
            hasAudioBookAccess={
              bookDetail?.user_book_rights?.has_audiobook_access
            }
            hasEBookAccess={bookDetail?.user_book_rights?.has_ebook_access}
            audioFragment={bookDetail?.audiobook_fragment}
            audiobook={bookDetail?.audiobook}
          />

          <div className="mt-10 w-max">
            <BookMetadata book={bookDetail} />
          </div>
          <ConditionalRender
            if={
              isAuthenticated &&
              !bookDetail?.user_book_rights?.has_audiobook_access &&
              !bookDetail?.user_book_rights?.has_ebook_access
            }
          >
            <BookPrices
              allPrice={bookDetail?.price}
              ebookPrice={bookDetail?.ebook?.price}
              audioPrice={bookDetail?.audiobook?.price}
              isEBookPurchased={
                bookDetail?.user_book_rights?.is_ebook_purchased
              }
              isAudioBookPurchased={
                bookDetail?.user_book_rights?.is_audiobook_purchased
              }
            />
          </ConditionalRender>

          {/* <MostReadBooks /> */}
          <BookReviews
            bookId={bookDetail?.id}
            reviewsCount={bookDetail?.reviews_count}
          />
        </div>
      </div>
    </div>
  );
};
