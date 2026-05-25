export const SUBSCRIPTION_STATUS = {
  TRIALING: "trialing",
  ACTIVE: "active",
  AWAITING_PAYMENT: "awaiting_payment",
  AWAITING_RETRY: "awaiting_retry",
  CANCELED: "canceled",
  EXPIRED: "expired",
  FAILED: "failed",
} as const;

export type SubscriptionStatusType =
  (typeof SUBSCRIPTION_STATUS)[keyof typeof SUBSCRIPTION_STATUS];

export const SUBSCRIPTION_STATE = {
  ACTIVE: "ACTIVE",
  TEMPORARY_ACTIVE: "TEMPORARY_ACTIVE",
  INACTIVE: "INACTIVE",
} as const;

export type SubscriptionStateType =
  (typeof SUBSCRIPTION_STATE)[keyof typeof SUBSCRIPTION_STATE];

export const manageSubscriptionQueryKeys = {
  SUBSCRIPTION_DETAIL: "subscription-detail",
  CANCEL_REASONS: "cancel-reasons",
} as const;
