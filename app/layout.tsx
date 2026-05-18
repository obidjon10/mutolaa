import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import Script from "next/script";

import { THEME_COOKIE } from "@/lib/theme";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mutolaa | Eng sara audio va elektron kitoblar",
  description:
    "O'zbek tilidagi eng yirik mobil kutubxonani hoziroq yuklab oling!",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme =
    cookieStore.get(THEME_COOKIE)?.value === "dark" ? "dark" : "light";

  return (
    <html
      className={`${inter.variable} antialiased ${theme}`}
      data-theme={theme}
      suppressHydrationWarning
    >
      <body>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=document.cookie.match(/(?:^|; )theme=(dark|light)/);var t=m?m[1]:"light";var r=document.documentElement;r.classList.remove("light","dark");r.classList.add(t);r.setAttribute("data-theme",t);}catch(e){}})()`,
          }}
        />
        {children}
      </body>
    </html>
  );
}
