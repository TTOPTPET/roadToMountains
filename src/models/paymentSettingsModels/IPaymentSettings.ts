import { CreatorType } from "../userModels/IUserInfo";

export enum StatusConnectCard {
  notLinked = "notLinked",
  linked = "linked",
  waitingBank = "waiting",
  failedLink = "failedLink",
}

export enum AccauntTransactionsType {
  payment = "payment",
  withdrawal = "withdrawal",
  penalty = "penalty",
}

export enum AccauntTransactionsSuccsess {
  successfully = "successfully",
  notSuccessfully = "notSuccessfully",
  waiting = "waiting",
}

export interface MetaPayment {
  errorMessage?: string;
}

export interface AccauntTransactions {
  type?: AccauntTransactionsType;
  success?: AccauntTransactionsSuccsess;
  createAt?: string;
  description?: string;
  price?: string;
  orderId?: string;
  metaPayment?: MetaPayment;
}

export interface fieldsPaymentCreator {
  bik?: string;
  accountNumber?: string;
  cardId?: string;
  statusConnectCard?: StatusConnectCard;
}

export interface ICardInfo {
  creatorType?: CreatorType;
  fieldsPaymentCreator?: fieldsPaymentCreator;
}

export interface IBankAccount {
  accauntAmount?: number;
  accauntTransactions?: AccauntTransactions[];
}
