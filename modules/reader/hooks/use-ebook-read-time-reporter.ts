"use client";

import { useCallback, useEffect, useRef } from "react";

import { $api } from "@/lib";
import { getToday, IReadTimePayload, useSetReadTime } from "@/modules/common";

const INTERVAL_MS = 3 * 60 * 1000;

const sendDirect = (payload: IReadTimePayload) =>
  $api.post("/stats/ReadTimeBulkCreate/", [payload]).catch(() => {});

export const useEbookReadTimeReporter = () => {
  const { mutate } = useSetReadTime();

  const startRef = useRef(0);
  const accRef = useRef(0);
  const mutateRef = useRef(mutate);

  useEffect(() => { mutateRef.current = mutate; }, [mutate]);
  useEffect(() => { startRef.current = Date.now(); }, []);

  // useCallback with [] is stable; all values are read through refs at call time.
  const flush = useCallback((direct = false) => {
    const now = Date.now();
    if (startRef.current > 0) {
      accRef.current += now - startRef.current;
    }
    startRef.current = now;

    const seconds = Math.floor(accRef.current / 1000);
    accRef.current = 0;
    if (seconds <= 0) return;

    const payload: IReadTimePayload = { read_time: seconds, date: getToday() };
    if (direct) sendDirect(payload);
    else mutateRef.current(payload);
  }, []);

  useEffect(() => {
    const id = setInterval(() => flush(), INTERVAL_MS);
    return () => clearInterval(id);
  }, [flush]);

  useEffect(() => () => flush(true), [flush]);
};
