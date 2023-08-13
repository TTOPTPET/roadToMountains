import axios from "axios";
import { ICardInfo } from "../../models/paymentSettingsModels/IPaymentSettings";
import { StatusConnectCard } from "../../models/paymentSettingsModels/IPaymentSettings";
import { CreatorType } from "../../models/userModels/IUserInfo";
import { creatorUrl } from "../../config/config";

const cardInfoDefault: ICardInfo = {
  creatorType: CreatorType.OOO,
  fieldsPaymentCreator: {
    cardId: "0000000000000000",
    statusConnectCard: StatusConnectCard.linked,
    bik: "123456789",
    accountNumber: "12345678987654321234",
  },
};

export const getCardInfo = async (
  successCallback: (prop: ICardInfo) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(cardInfoDefault);
    return;
  }
  try {
    let response = await axios.get(creatorUrl + `/finance`);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
