export const TRANSACTION_LIMIT = 12;

export const transactionQueryKeys = {
  HISTORY: "transaction-history",
} as const;

export const TRANSACTION_CONTENT_TYPE = {
  BOOK_ORDER: "bookorder",
  PREMIUM_ORDER: "premiumorder",
} as const;

export type TransactionContentType =
  (typeof TRANSACTION_CONTENT_TYPE)[keyof typeof TRANSACTION_CONTENT_TYPE];
