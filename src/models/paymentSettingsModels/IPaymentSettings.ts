export enum StatusConnectCard {
  notLinked = "notLinked",
  linked = "linked",
  waitingBank = "waitingBank",
  failedLink = "failedLink",
}

export interface IPaymentSettings {
  cardId?: string;
  statusConnectCard?: StatusConnectCard;
}
