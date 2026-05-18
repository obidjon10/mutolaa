import { InfiniteData, useInfiniteQuery } from "@tanstack/react-query";

import { $api } from "@/lib";

import { IQueryResponse } from "@/modules/common";
import { ICollection } from "../models";

const COLLECTION_LIMIT = 20;

export const useCollections = () => {
    const { data, ...args } = useInfiniteQuery<
        IQueryResponse<ICollection>,
        Error,
        InfiniteData<IQueryResponse<ICollection>, number>,
        string[],
        number
    >({
        queryKey: ["collections"],
        queryFn: async ({ pageParam }) => {
            const { data } = await $api.get("/book/CollectionList/", {
                params: { limit: COLLECTION_LIMIT, offset: pageParam },
            });

            return data;
        },
        initialPageParam: 0,
        getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage?.next ? lastPageParam + COLLECTION_LIMIT : undefined,
    });

    const collections =
        data?.pages?.flatMap((page) => page?.results ?? []) ?? [];
    const totalCount = data?.pages?.[0]?.count ?? 0;

    return { collections, totalCount, data, ...args };
};
