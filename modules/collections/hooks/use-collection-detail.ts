import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";
import { IBook, IQueryResponse } from "@/modules/common";

const COLLECTION_LIMIT = 20;

export const useCollectionDetail = (slug: string) => {
    const { data, ...args } = useInfiniteQuery<
        IQueryResponse<IBook>,
        Error,
        InfiniteData<IQueryResponse<IBook>, number>,
        string[],
        number
    >({
        queryKey: ["collection-detail", slug],
        queryFn: async ({ pageParam }) => {
            const { data } = await $api.get(`/web/book/CollectionDetail/${slug}`, {
                params: { limit: COLLECTION_LIMIT, offset: pageParam },
            });

            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage?.next ? lastPageParam + COLLECTION_LIMIT : undefined,
    });

    const collectionDetail =
        data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
    const totalCount = data?.pages?.[0]?.count ?? 0;
    const title = data?.pages?.[0]?.title;

    return { collectionDetail, totalCount, title, data, ...args };
};
