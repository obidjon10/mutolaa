"use client";

import { useEffect } from "react";

import { $api } from "@/lib";

import { getDeviceId } from "../utils/get-device-id";

// Change this to adjust how often a session is recorded (in milliseconds)
const SESSION_INTERVAL_MS = 24 * 60 * 60 * 1000; // 1 day
const SESSION_DELAY_MS = 10_000;
const SESSION_LAST_SENT_KEY = "mutolaa_session_last_sent";

const isDue = (): boolean => {
  const last = localStorage.getItem(SESSION_LAST_SENT_KEY);
  if (!last) return true;
  return Date.now() - Number(last) >= SESSION_INTERVAL_MS;
};

const postSession = (session_time_type: 1 | 10) => {
  $api
    .post("/common/SessionCreate/", {
      device_id: getDeviceId(),
      session_time_type,
    })
    .catch(() => {});
};

export const SessionInit = () => {
  useEffect(() => {
    if (!isDue()) return;

    localStorage.setItem(SESSION_LAST_SENT_KEY, String(Date.now()));
    postSession(1);

    const timer = setTimeout(() => postSession(10), SESSION_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  return null;
};
