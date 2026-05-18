import qs from "query-string";

import { $api } from "@/lib";

import type { IBook } from "../types/book";
import type { IQueryResponse } from "../types/query-response";

export interface IBookListParams {
  age__in?: (number | string)[];
  publisher__in?: (number | string)[];
  category?: number | string;
  categories?: (number | string)[];
  authors?: (number | string)[];
  dubbers?: (number | string)[];
  topics?: (number | string)[];
  is_premium?: boolean;
  has_audiobook?: boolean;
  has_ebook?: boolean;
  in_market?: boolean;
  ordering?: string;
  limit?: number;
  offset?: number;
  search?: string;
}

export const getBookList =
  (params: IBookListParams = {}) =>
  async () => {
    const { data } = await $api.get<IQueryResponse<IBook>>(
      qs.stringifyUrl(
        {
          url: "/web/book/BookList/",
          query: params as qs.StringifiableRecord,
        },
        {
          skipNull: true,
          skipEmptyString: true,
          arrayFormat: "comma",
        },
      ),
    );

    return data;
  };
