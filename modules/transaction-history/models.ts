export interface ITransactionHistory {
  id: number
  content_type: string
  paid_at: string
  order: IOrder
}

export interface IOrder {
  amount: string
  wallet_amount: string
  provider_amount: string
  provider: string
  tariff_name: string
  card?: ICard
}

export interface ICard {
  id: number
  card_number: string
  card_type: string
}
