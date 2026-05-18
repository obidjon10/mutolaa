import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getServerIsAuthenticated } from "@/lib/server-auth";
import {
  getCategories,
  getFeaturedBooks,
  getTopSectionList,
  HomePage,
  queryKeys,
} from "@/modules/home";

export const revalidate = 604800;

export default async function Page() {
  const [initialIsAuthenticated] = await Promise.all([
    getServerIsAuthenticated(),
  ]);

  const queryClient = new QueryClient();

  await Promise.allSettled([
    queryClient.prefetchQuery({
      queryKey: [queryKeys.TOP_SECTION_LIST, {}],
      queryFn: getTopSectionList(),
    }),
    queryClient.prefetchQuery({
      queryKey: [queryKeys.CATEGORIES],
      queryFn: getCategories(),
    }),
    queryClient.prefetchQuery({
      queryKey: [queryKeys.FEATURED_BOOKS],
      queryFn: getFeaturedBooks(),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HomePage initialIsAuthenticated={initialIsAuthenticated} />
    </HydrationBoundary>
  );
}
