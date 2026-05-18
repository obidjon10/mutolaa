"use client";

import { useState } from "react";
import { Toast } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Provider as ReduxProvider } from "react-redux";

import { ThemeProvider } from "@/lib/theme";
import { AuthHydrator, SessionInit } from "@/modules/auth";
import { AudioPlayerProvider, AudioPlayerRoot } from "@/modules/player";

import { store } from "lib";

export default function Providers({
  initialTheme,
  children,
}: {
  initialTheme?: "light" | "dark";
  children: React.ReactNode;
}) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <ReduxProvider store={store}>
      <AuthHydrator />
      <SessionInit />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider initialTheme={initialTheme}>
          <Toast.Provider />
          <AudioPlayerProvider>
            {children}
            <AudioPlayerRoot />
          </AudioPlayerProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === "development" && (
          <ReactQueryDevtools position="left" />
        )}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
