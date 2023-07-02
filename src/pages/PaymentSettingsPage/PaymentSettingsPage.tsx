import { useEffect, useState } from "react";

import { IPaymentSettings } from "../../models/paymentSettingsModels/IPaymentSettings";

import CardInfo from "../../components/PaymentSettingsModules/CardInfo/CardInfo";
import MoneyOutput from "../../components/PaymentSettingsModules/MoneyOutput/MoneyOutput";

import { getCardInfo } from "../../API/paymentAPI/getCardInfo";

import { Typography, Grid } from "@mui/material";

function PaymentSettingsPage() {
  const [cardInfo, setCardInfo] = useState<IPaymentSettings>();

  useEffect(() => {
    getCardInfo((value) => {
      setCardInfo(value);
    });
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ mb: "50px" }}>
        Оплата
      </Typography>
      <Grid container spacing={8}>
        <Grid item xs={5.5}>
          {cardInfo && (
            <CardInfo
              cardId={cardInfo.cardId}
              statusConnectCard={cardInfo.statusConnectCard}
            />
          )}
          <MoneyOutput />
        </Grid>
      </Grid>
    </>
  );
}

export default PaymentSettingsPage;
