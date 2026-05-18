"use client";

import { useEffect } from "react";

import { useAppDispatch } from "@/lib";

import { clearTokens, setHydrated, setTokens } from "../store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

const readTokens = () => ({
  access: localStorage.getItem(ACCESS_TOKEN_KEY),
  refresh: localStorage.getItem(REFRESH_TOKEN_KEY),
});

export const AuthHydrator = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const hydrate = () => {
      const { access, refresh } = readTokens();
      if (access) {
        dispatch(setTokens({ access, refresh: refresh ?? "" }));
      } else {
        dispatch(clearTokens());
      }
    };

    hydrate();
    dispatch(setHydrated(true));

    const onStorage = (event: StorageEvent) => {
      if (event.key === ACCESS_TOKEN_KEY || event.key === REFRESH_TOKEN_KEY) {
        hydrate();
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [dispatch]);

  return null;
};
