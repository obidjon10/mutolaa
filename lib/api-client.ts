import axios from "axios";

import { routing } from "@/i18n/routing";

export const $api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

$api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      const pathLocale = window.location.pathname.split("/")[1];
      const locale = routing.locales.includes(pathLocale as any)
        ? pathLocale
        : routing.defaultLocale;

      config.headers["Accept-Language"] = locale;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

$api.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: drop 403 once backend stops returning it for unauthorized requests.
    const status = error.response?.status;
    if ((status === 401 || status === 403) && typeof window !== "undefined") {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      document.cookie = "access_token=; path=/; max-age=0; SameSite=Lax";

      const pathLocale = window.location.pathname.split("/")[1];
      const locale = routing.locales.includes(pathLocale as any)
        ? pathLocale
        : routing.defaultLocale;

      window.location.replace(`/${locale}/login`);
    }
    return Promise.reject(error);
  },
);
