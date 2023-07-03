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

export interface ICardInfo {
  cardId?: string;
  statusConnectCard?: StatusConnectCard;
}

export interface IBankAccount {
  accauntAmount?: number;
  accauntTransactions?: AccauntTransactions[];
}
