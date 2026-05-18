"use client"

import { useEffect, useRef } from "react";

import { $api } from "@/lib";

import { ITransactionStatusResponse } from "../models";

const POLL_INTERVAL_MS = 3_000;
const POLL_TIMEOUT_MS = 5 * 60 * 1_000;

export const useTransactionStatus = (
  orderId: number | null,
  onSuccess: () => void,
  onTimeout: () => void,
) => {
  const onSuccessRef = useRef(onSuccess);
  const onTimeoutRef = useRef(onTimeout);

  useEffect(() => {
    onSuccessRef.current = onSuccess;
    onTimeoutRef.current = onTimeout;
  });

  useEffect(() => {
    if (!orderId) return;

    const startTime = Date.now();
    let timerId: ReturnType<typeof setTimeout>;
    let cancelled = false;

    const poll = async () => {
      if (cancelled) return;

      try {
        const { data } = await $api.get<ITransactionStatusResponse>(
          `/payment/GetLastTransactionStatus/${orderId}/`,
          { params: { order_type: "premiumorder" } },
        );

        if (!cancelled && data?.status === "paid") {
          onSuccessRef.current();
          return;
        }
      } catch {
        // payment still pending — continue polling
      }

      if (cancelled) return;

      if (Date.now() - startTime >= POLL_TIMEOUT_MS) {
        onTimeoutRef.current();
        return;
      }

      timerId = setTimeout(poll, POLL_INTERVAL_MS);
    };

    timerId = setTimeout(poll, POLL_INTERVAL_MS);

    return () => {
      cancelled = true;
      clearTimeout(timerId);
    };
  }, [orderId]);
};
