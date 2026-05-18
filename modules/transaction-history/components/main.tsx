"use client";

import { ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Pagination, Skeleton } from "@heroui/react";

import { ChevronRightIcon } from "@/modules/icons";

import { TRANSACTION_LIMIT } from "../constants";
import { useTransactionHistory } from "../hooks";

const formatDate = (isoDate: string): string => {
  const [datePart] = isoDate.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}.${month}.${year}`;
};

function getPaginationItems(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const items: (number | "ellipsis")[] = [1];

  if (current > 3) items.push("ellipsis");

  for (
    let i = Math.max(2, current - 1);
    i <= Math.min(total - 1, current + 1);
    i++
  ) {
    items.push(i);
  }

  if (current < total - 2) items.push("ellipsis");

  items.push(total);

  return items;
}

const COLUMNS = [
  "sana",
  // "tur",
  "tarif",
  "tolov_usuli",
  "summa",
  "karta_raqami",
] as const;

const PROVIDER_CONFIG: Record<string, ReactNode | string> = {
  click: <Image src="/click.svg" alt="CLICK" width={54} height={15} />,
  payme: <Image src="/payme.svg" alt="PAYME" width={56} height={16} />,
  xazna: <Image src="/xazna.svg" alt="XAZNA" width={74} height={15} />,
  octo: "OCTO",
};

export function Main() {
  const t = useTranslations();
  const { push } = useRouter();
  const [page, setPage] = useState(1);

  const { data, isLoading } = useTransactionHistory(page);

  const transactions = data?.results ?? [];
  const totalPages = data ? Math.ceil(data.count / TRANSACTION_LIMIT) : 0;
  const paginationItems = getPaginationItems(page, totalPages);

  return (
    <div className="mx-auto my-4 mr-4 p-6 sm:p-8 rounded-2xl bg-white dark:bg-black shadow-card">
      <div
        className="flex items-center gap-3 mb-8 cursor-pointer"
        onClick={() => push("/profile")}
      >
        <div className="bg-muted dark:bg-muted-dark size-12 rounded-full flex items-center justify-center">
          <ChevronRightIcon size={24} className="rotate-180" />
        </div>
        <h1 className="text-xl font-semibold">{t("tolov_tarixi")}</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-muted dark:border-[#27272A]">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  className="px-4 py-3 text-left text-xs font-medium text-foreground-muted uppercase tracking-wider whitespace-nowrap"
                >
                  {t(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {isLoading
              ? Array.from({ length: TRANSACTION_LIMIT }).map((_, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <tr
                    key={i}
                    className="border-b border-muted dark:border-[#27272A]"
                  >
                    {COLUMNS.map((col) => (
                      <td key={col} className="px-4 py-3">
                        <Skeleton className="h-5 w-24 rounded-lg" />
                      </td>
                    ))}
                  </tr>
                ))
              : transactions.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-muted dark:border-[#27272A] last:border-0"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      {formatDate(tx.paid_at)}
                    </td>
                    {/* <td className="px-4 py-3 whitespace-nowrap">{tx.content_type}</td> */}
                    <td className="px-4 py-3 whitespace-nowrap">
                      {tx.order.tariff_name}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {PROVIDER_CONFIG[tx.order.provider]}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap font-medium">
                      {tx.order.amount}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-foreground-muted">
                      {tx.order.card?.card_number ?? "—"}
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>

        {!isLoading && transactions.length === 0 && (
          <p className="py-12 text-center text-foreground-muted">
            {t("hech_narsa_topilmadi")}
          </p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination>
            <Pagination.Content>
              <Pagination.Item>
                <Pagination.Previous
                  isDisabled={page === 1}
                  onPress={() => setPage((p) => Math.max(1, p - 1))}
                >
                  <Pagination.PreviousIcon />
                </Pagination.Previous>
              </Pagination.Item>

              {paginationItems.map((item, i) =>
                item === "ellipsis" ? (
                  // eslint-disable-next-line react/no-array-index-key
                  <Pagination.Item key={`ellipsis-${i}`}>
                    <Pagination.Ellipsis />
                  </Pagination.Item>
                ) : (
                  <Pagination.Item key={item}>
                    <Pagination.Link
                      isActive={item === page}
                      onPress={() => setPage(item)}
                    >
                      {item}
                    </Pagination.Link>
                  </Pagination.Item>
                ),
              )}

              <Pagination.Item>
                <Pagination.Next
                  isDisabled={page === totalPages}
                  onPress={() => setPage((p) => Math.min(totalPages, p + 1))}
                >
                  <Pagination.NextIcon />
                </Pagination.Next>
              </Pagination.Item>
            </Pagination.Content>
          </Pagination>
        </div>
      )}
    </div>
  );
}
