import axios from "axios";
import { creatorUrl } from "../../config/config";
import { IBankAccount } from "../../models/paymentSettingsModels/IPaymentSettings";

import { AccauntTransactionsType } from "../../models/paymentSettingsModels/IPaymentSettings";

const responseDefault: IBankAccount = {
  accauntAmount: 100000,
  accauntTransactions: [
    {
      type: AccauntTransactionsType.payment,
      success: true,
      createAt: "03-07-2023",
      description: "qqqqqqqqqqqqqqqqqqqqqqqqqqqqqq",
      price: "6000",
    },
    {
      type: AccauntTransactionsType.penalty,
      success: true,
      createAt: "03-07-2023",
      description: "Алтай такой",
      price: "16000",
    },
    {
      type: AccauntTransactionsType.withdrawal,
      success: true,
      createAt: "01-12-2022",
      description: "Алтай сякой",
      price: "3000",
    },
    {
      type: AccauntTransactionsType.penalty,
      success: true,
      createAt: "03-07-2023",
      description: "Пивко за школой",
      price: "306000",
    },
    {
      type: AccauntTransactionsType.penalty,
      success: true,
      createAt: "03-07-2023",
      description: "Пивко за школой",
      price: "306000",
    },
    {
      type: AccauntTransactionsType.penalty,
      success: true,
      createAt: "03-07-2023",
      description: "Пивко за школой",
      price: "306000",
    },
    {
      type: AccauntTransactionsType.penalty,
      success: true,
      createAt: "03-07-2023",
      description: "Пивко за школой",
      price: "306000",
    },
  ],
};

export const getBankAccInfo = async (
  successCallback: (prop: IBankAccount) => void,
  errorCallback?: () => void,
  useDefault?: boolean
) => {
  if (useDefault) {
    successCallback(responseDefault);
    return;
  }
  try {
    let response = await axios.get(creatorUrl + `/finance/bankAccount`);
    successCallback(response?.data);
  } catch (e) {
    console.error(e);
    errorCallback && errorCallback();
  }
};
