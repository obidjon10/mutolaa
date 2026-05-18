import qs from "query-string";

import { $api } from "@/lib";
import { IBook, IQueryResponse } from "@/modules/common";

interface IMostReadBooksParams {
  page?: number;
  page_size?: number;
}

export const getMostReadBooks =
  (params: IMostReadBooksParams = {}) =>
  async () => {
    const { data } = await $api.get<IQueryResponse<IBook>>(
      qs.stringifyUrl(
        {
          url: "/web/book/MostReadBookList/",
          query: params as qs.StringifiableRecord,
        },
        { skipNull: true, skipEmptyString: true },
      ),
    );

    return data;
  };
