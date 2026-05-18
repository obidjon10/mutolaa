export interface IUserCard {
  id: number;
  card_number: string;
  card_type: string;
  bank: { id: number; name: string };
}

export interface ICreateCardResponse {
  success: boolean;
  user_card_id: number;
  phone: string;
  message: string;
}

export interface IVerifyCardResponse {
  success: boolean;
  user_card: IUserCard;
  message: string;
}
