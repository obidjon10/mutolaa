"use client";

import { ReactNode, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Skeleton, Table } from "@heroui/react";

import { ThemedLogo } from "@/modules/common";
import { ChevronRightIcon, CreditCardIcon, SearchIcon } from "@/modules/icons";

import { TRANSACTION_CONTENT_TYPE, TRANSACTION_LIMIT } from "../constants";
import { useTransactionHistory } from "../hooks";
import type { ITransactionHistory } from "../models";

type TranslatorType = ReturnType<typeof useTranslations>;

const formatDate = (iso?: string) => {
  if (!iso) return "—";
  const [datePart] = iso.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}.${month}.${year}`;
};

const formatAmount = (amount?: string) => {
  if (!amount) return "—";
  const n = Number(amount);
  if (Number.isNaN(n)) return "—";
  return `${Math.floor(n).toLocaleString("ru")} UZS`;
};

const PROVIDER_CONFIG: Record<string, ReactNode> = {
  click: (
    <ThemedLogo
      src="/click.svg"
      darkSrc="/click-dark.svg"
      alt="CLICK"
      width={54}
      height={15}
    />
  ),
  payme: (
    <ThemedLogo
      src="/payme.svg"
      darkSrc="/payme-dark.svg"
      alt="PAYME"
      width={56}
      height={16}
    />
  ),
  xazna: (
    <ThemedLogo
      src="/xazna.svg"
      darkSrc="/xazna-dark.svg"
      alt="XAZNA"
      width={74}
      height={15}
    />
  ),
  octo: <span className="font-medium">OCTO BANK</span>,
};

const renderName = (tx: ITransactionHistory, t: TranslatorType) => {
  let label: string;
  if (tx?.content_type === TRANSACTION_CONTENT_TYPE.BOOK_ORDER) {
    label = tx?.order?.book?.title ?? "—";
  } else if (tx?.order?.card) {
    label = t("mutolaa_premium_obunasi");
  } else {
    const tariff = tx?.order?.tariff_name?.toLowerCase();
    label = tariff
      ? t("mutolaa_premium_one_time", { tariff })
      : t("mutolaa_premium");
  }
  return <div className="text-foreground dark:text-white">{label}</div>;
};

const renderProductType = (tx: ITransactionHistory, t: TranslatorType) => {
  let label: string;
  if (tx?.content_type === TRANSACTION_CONTENT_TYPE.BOOK_ORDER) {
    const { is_ebook_purchased: isEbook, is_audiobook_purchased: isAudio } =
      tx?.order?.book ?? {};
    if (isEbook && isAudio) label = t("elektron_va_audio_kitob");
    else if (isEbook) label = t("elektron_kitob");
    else if (isAudio) label = t("audiokitob");
    else label = "—";
  } else {
    label = tx?.order?.card
      ? t("tariff_obuna", { tariff: tx?.order?.tariff_name ?? "" })
      : t("bir_martalik_xarid");
  }
  return <span className="text-foreground-muted">{label}</span>;
};

const renderPaymentMethod = (tx: ITransactionHistory) => {
  if (tx?.order?.card) {
    return (
      <span className="inline-flex items-center gap-2">
        <CreditCardIcon size={20} />
        <span>{tx?.order?.card?.card_number}</span>
      </span>
    );
  }
  return PROVIDER_CONFIG[tx?.order?.provider ?? ""] ?? <span className="text-foreground dark:text-white">—</span>;
};

const COLUMNS = [
  { id: "name", labelKey: "nomi", render: renderName },
  { id: "type", labelKey: "turi", render: renderProductType },
  {
    id: "date",
    labelKey: "sana",
    render: (tx: ITransactionHistory) => (
      <span className="text-foreground-muted">{formatDate(tx.paid_at)}</span>
    ),
  },
  {
    id: "price",
    labelKey: "narx",
    render: (tx: ITransactionHistory) => (
       <span className="text-foreground dark:text-white">{ formatAmount(tx?.order?.amount)}</span>
    ),
  },
  { id: "payment", labelKey: "tolov_turi", render: renderPaymentMethod },
] as const;

export function Main() {
  const t = useTranslations();
  const { push } = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransactionHistory(page);

  const transactions = data?.results ?? [];
  const totalCount = data?.count ?? 0;
  const totalPages = Math.ceil(totalCount / TRANSACTION_LIMIT);

  type RowType =
    | { id: string; kind: "skeleton" }
    | { id: number; kind: "data"; tx: ITransactionHistory };

  const rows: RowType[] =  isLoading
    ? Array.from({ length: TRANSACTION_LIMIT }, (_, i) => ({
        id: `skeleton-${i}`,
        kind: "skeleton",
      }))
    : transactions.map((tx) => ({ id: tx.id, kind: "data", tx }));

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 min-h-[94.3vh] rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-6 cursor-pointer w-fit"
        onClick={() => push("/profile")}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <h1 className="text-2xl font-semibold">{t("tolov_tarixi")}</h1>
      </div>

      <Table className="bg-muted dark:bg-muted-dark">
        <Table.ScrollContainer>
          <Table.Content aria-label={t("tolov_tarixi")}>
            <Table.Header columns={COLUMNS} className="bg-muted! dark:bg-muted-dark!">
              {(col) => (
                <Table.Column
                  id={col.id}
                  className="text-foreground-muted"
                  isRowHeader={col.id === "name"}
                >
                  {t(col.labelKey)}
                </Table.Column>
              )}
            </Table.Header>
            <Table.Body
              items={rows}
              renderEmptyState={() => (
                <div className="flex flex-col bg-white dark:bg-black rounded-2xl min-h-[68vh] items-center justify-center py-24 text-center">
                  <SearchIcon size={32} className="text-foreground-muted" />
                  <p className="mt-3 text-base font-medium">
                    {t("malumot_topilmadi")}
                  </p>
                  <p className="mt-1 text-sm font-medium text-foreground-muted">
                    {t("sizda_hech_qanday_tolov_mavjud_emas")}
                  </p>
                </div>
              )}
            >
              {(row) => (
                <Table.Row columns={COLUMNS}>
                  {(col) => (
                    <Table.Cell className="p-4.5! bg-white! dark:bg-black!">
                      {row.kind === "skeleton" ? (
                        <Skeleton className="h-5 w-24 rounded-lg" />
                      ) : (
                        col.render(row.tx, t)
                      )}
                    </Table.Cell>
                  )}
                </Table.Row>
              )}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>
        {totalCount > 0 && (
          <Table.Footer className="justify-between border-t border-muted dark:border-[#27272A]">
            <p className="text-sm text-foreground-muted">
              {t("pagination_count", {
                from: (page - 1) * TRANSACTION_LIMIT + 1,
                to: Math.min(page * TRANSACTION_LIMIT, totalCount),
                total: totalCount,
              })}
            </p>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="ghost"
                className="text-sm"
                isDisabled={page === 1}
                onPress={() => setPage((p) => Math.max(1, p - 1))}
              >
                <ChevronRightIcon className="rotate-180" size={14} />
                {t("oldingi")}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="text-sm"
                isDisabled={page === totalPages}
                onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                {t("keyingi")}
                <ChevronRightIcon size={14} />
              </Button>
            </div>
          </Table.Footer>
        )}
      </Table>
    </div>
  );
}
