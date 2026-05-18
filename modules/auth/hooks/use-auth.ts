"use client";

import { useCallback } from "react";

import { removeTokenCookie, setTokenCookie, useAppDispatch, useAppSelector } from "@/lib";

import { clearTokens, setTokens } from "../store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

interface ILoginTokens {
  access: string;
  refresh: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state?.auth?.accessToken);
  const refreshToken = useAppSelector((state) => state?.auth?.refreshToken);
  const isHydrated = useAppSelector((state) => state?.auth?.isHydrated);

  const login = useCallback(
    ({ access, refresh }: ILoginTokens) => {
      dispatch(setTokens({ access, refresh }));
      if (typeof window !== "undefined") {
        localStorage.setItem(ACCESS_TOKEN_KEY, access);
        localStorage.setItem(REFRESH_TOKEN_KEY, refresh);
        setTokenCookie(access);
      }
    },
    [dispatch],
  );

  const logout = useCallback(() => {
    dispatch(clearTokens());
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      removeTokenCookie();
    }
  }, [dispatch]);

  return {
    accessToken,
    refreshToken,
    isAuthenticated: Boolean(accessToken),
    isHydrated,
    login,
    logout,
  };
};
