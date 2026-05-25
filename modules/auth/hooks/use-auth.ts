"use client";

import { useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { removeTokenCookie, setTokenCookie, useAppDispatch, useAppSelector } from "@/lib";

import { clearTokens, resetAuth, setTokens } from "../store";

const ACCESS_TOKEN_KEY = "access_token";
const REFRESH_TOKEN_KEY = "refresh_token";

interface ILoginTokens {
  access: string;
  refresh: string;
}

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
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
      queryClient.invalidateQueries();
    },
    [dispatch, queryClient],
  );

  const logout = useCallback(() => {
    dispatch(clearTokens());
    dispatch(resetAuth());
    queryClient.clear();
    if (typeof window !== "undefined") {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      removeTokenCookie();
    }
  }, [dispatch, queryClient]);

  return {
    accessToken,
    refreshToken,
    isAuthenticated: Boolean(accessToken),
    isHydrated,
    login,
    logout,
  };
};
