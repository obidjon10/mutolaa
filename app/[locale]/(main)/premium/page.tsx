import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { getMostReadBooks, queryKeys } from "@/modules/home";
import { PremiumPage } from "@/modules/premium";

export const revalidate = 604800;

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [queryKeys.MOST_READ_BOOKS, {}],
    queryFn: getMostReadBooks(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PremiumPage />
    </HydrationBoundary>
  );
}
