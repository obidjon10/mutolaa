import { useQuery } from '@tanstack/react-query'

import { $api } from '@/lib'
import { IQueryResponse } from '@/modules/common'

import { TRANSACTION_LIMIT, transactionQueryKeys } from '../constants'
import { ITransactionHistory } from '../models'

export const useTransactionHistory = (page: number) =>
  useQuery({
    queryKey: [transactionQueryKeys.HISTORY, page],
    queryFn: async (): Promise<IQueryResponse<ITransactionHistory>> => {
      const { data } = await $api.get<IQueryResponse<ITransactionHistory>>(
        '/users/TransactionHistory/',
        { params: { limit: TRANSACTION_LIMIT, offset: (page - 1) * TRANSACTION_LIMIT } },
      )
      return data
    },
  })
