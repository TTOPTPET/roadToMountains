import { IPaymentSettings } from "../../models/paymentSettingsModels/IPaymentSettings";
import { StatusConnectCard } from "../../models/paymentSettingsModels/IPaymentSettings";

const cardInfoDefault: IPaymentSettings = {
  cardId: "0000000000000000",
  statusConnectCard: StatusConnectCard.linked,
};

export const getCardInfo = async (
  successCallback: (prop: IPaymentSettings) => void
) => {
  successCallback(cardInfoDefault);
  return;
};
