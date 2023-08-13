import { CreatorType } from "../userModels/IUserInfo";

export enum StatusConnectCard {
  notLinked = "notLinked",
  linked = "linked",
  waitingBank = "waitingBank",
  failedLink = "failedLink",
}

export enum AccauntTransactionsType {
  payment = "payment",
  withdrawal = "withdrawal",
  penalty = "penalty",
}

export interface AccauntTransactions {
  type?: AccauntTransactionsType;
  success?: boolean;
  createAt?: string;
  description?: string;
  price?: string;
}

export interface fieldsPaymentCreator {
  bik?: string;
  accountNumber?: string;
  cardId?: string;
  statusConnectCard?: StatusConnectCard;
}

export interface ICardInfo {
  creatorType: CreatorType;
  fieldsPaymentCreator: fieldsPaymentCreator;
}

export interface IBankAccount {
  accauntAmount?: number;
  accauntTransactions?: AccauntTransactions[];
}
