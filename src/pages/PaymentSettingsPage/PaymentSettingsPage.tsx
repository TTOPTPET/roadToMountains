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
    getCardInfo((value) => {
      setCardInfo(value);
    });
    getBankAccInfo(
      (value) => {
        setBankAccInfo(value);
      },
      undefined,
      true
    );
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ mb: "50px" }}>
        Оплата
      </Typography>
      <Grid container justifyContent={"space-between"}>
        <Grid item xs={5.5}>
          {cardInfo && (
            <CardInfo
              cardId={cardInfo.cardId}
              statusConnectCard={cardInfo.statusConnectCard}
            />
          )}
          <MoneyOutput accauntAmount={bankAccInfo.accauntAmount} />
        </Grid>
        <Grid item xs={5}>
          <MoneyAmount accauntAmount={bankAccInfo.accauntAmount} />
          <RecentOperations
            accauntTransactions={bankAccInfo.accauntTransactions}
          />
        </Grid>
      </Grid>
      <CardLostModal />
      <DeleteCardModal />
    </>
  );
}

export default PaymentSettingsPage;
