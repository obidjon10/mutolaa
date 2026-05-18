import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

import { getServerToken } from "@/lib/server-auth";
import { MainLayout } from "@/modules/common";

const fetchProfile = async (token: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/web/users/GetProfile/`,
    { headers: { Authorization: `Bearer ${token}` }, cache: "no-store" },
  );
  if (!res.ok) return null;
  return res.json();
};

export default async function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = await getServerToken();
  const initialIsAuthenticated = !!token;

  const queryClient = new QueryClient();

  if (token) {
    await queryClient.prefetchQuery({
      queryKey: ["profile"],
      queryFn: () => fetchProfile(token),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MainLayout initialIsAuthenticated={initialIsAuthenticated}>
        {children}
      </MainLayout>
    </HydrationBoundary>
  );
}
