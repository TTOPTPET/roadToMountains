import { ICardInfo } from "../../models/paymentSettingsModels/IPaymentSettings";
import { StatusConnectCard } from "../../models/paymentSettingsModels/IPaymentSettings";

const cardInfoDefault: ICardInfo = {
  cardId: "0000000000000000",
  statusConnectCard: StatusConnectCard.linked,
};

export const getCardInfo = async (
  successCallback: (prop: ICardInfo) => void
) => {
  successCallback(cardInfoDefault);
  return;
};
