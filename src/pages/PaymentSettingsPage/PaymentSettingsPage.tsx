import { useEffect, useState } from "react";

import { ICardInfo } from "../../models/paymentSettingsModels/IPaymentSettings";
import { IBankAccount } from "../../models/paymentSettingsModels/IPaymentSettings";

import CardInfo from "../../components/PaymentSettingsModules/CardInfo/CardInfo";
import MoneyOutput from "../../components/PaymentSettingsModules/MoneyOutput/MoneyOutput";

import { getCardInfo } from "../../API/paymentAPI/getCardInfo";

import { Typography, Grid } from "@mui/material";
import { getBankAccInfo } from "../../API/paymentAPI/getBankAccInfo";
import MoneyAmount from "../../components/PaymentSettingsModules/MoneyAmount/MoneyAmount";
import RecentOperations from "../../components/PaymentSettingsModules/RecentOperations/RecentOperations";
import CardLostModal from "../../components/Modals/CardLostModal/CardLostModal";
import DeleteCardModal from "../../components/Modals/DeleteCardModal/DeleteCardmodal";

function PaymentSettingsPage() {
  const [cardInfo, setCardInfo] = useState<ICardInfo>();
  const [bankAccInfo, setBankAccInfo] = useState<IBankAccount>({});

  useEffect(() => {
    getCardInfo(
      (value) => {
        setCardInfo(value);
      },
      () => {},
      false
    );
    getBankAccInfo(
      (value) => {
        setBankAccInfo(value);
      },
      undefined,
      false
    );
  }, []);

  console.log(cardInfo);

  return (
    <>
      <Typography variant="h3" sx={{ mb: "50px" }}>
        Оплата
      </Typography>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={5.5}>
          {cardInfo && <CardInfo cardInfo={cardInfo} />}
          <MoneyOutput accauntAmount={bankAccInfo.accauntAmount} />
        </Grid>
        <Grid item xs={5}>
          <MoneyAmount accauntAmount={bankAccInfo.accauntAmount} />
          <RecentOperations
            accauntTransactions={bankAccInfo.accauntTransactions}
          />
        </Grid>
      </Grid>
      <CardLostModal creatorType={cardInfo?.creatorType} />
      <DeleteCardModal />
    </>
  );
}

export default PaymentSettingsPage;
