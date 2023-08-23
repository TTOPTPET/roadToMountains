import { useEffect, useState } from "react";

import { ICardInfo } from "../../models/paymentSettingsModels/IPaymentSettings";
import { IBankAccount } from "../../models/paymentSettingsModels/IPaymentSettings";

import CardInfo from "../../components/PaymentSettingsModules/CardInfo/CardInfo";
import MoneyOutput from "../../components/PaymentSettingsModules/MoneyOutput/MoneyOutput";

import { getCardInfo } from "../../API/paymentAPI/getCardInfo";

import { Typography, Grid, CircularProgress, Box } from "@mui/material";
import { getBankAccInfo } from "../../API/paymentAPI/getBankAccInfo";
import MoneyAmount from "../../components/PaymentSettingsModules/MoneyAmount/MoneyAmount";
import RecentOperations from "../../components/PaymentSettingsModules/RecentOperations/RecentOperations";
import CardLostModal from "../../components/Modals/CardLostModal/CardLostModal";
import DeleteCardModal from "../../components/Modals/DeleteCardModal/DeleteCardmodal";

function PaymentSettingsPage() {
  const [cardInfo, setCardInfo] = useState<ICardInfo>();
  const [bankAccInfo, setBankAccInfo] = useState<IBankAccount>({});
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState({
    cardInfo: false,
    bankAccInfo: false,
  });

  useEffect(() => {
    setLoading({ cardInfo: true, bankAccInfo: true });
    getCardInfo(
      (value) => {
        setLoading((loading) => ({ ...loading, cardInfo: false }));
        setCardInfo(value);
      },
      () => {
        setLoading((loading) => ({ ...loading, cardInfo: false }));
      },
      false
    );
    getBankAccInfo(
      (value) => {
        setLoading((loading) => ({ ...loading, bankAccInfo: false }));
        setBankAccInfo(value);
      },
      () => {
        setLoading((loading) => ({ ...loading, bankAccInfo: false }));
      },
      false
    );
  }, []);

  return (
    <>
      <Typography variant="h3" sx={{ mb: "50px" }}>
        Оплата
      </Typography>
      {Object.values(loading).some((value) => value !== false) ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "40px",
          }}
        >
          <CircularProgress size={"80px"} />
        </Box>
      ) : (
        <Grid container justifyContent={"space-between"}>
          <Grid item xs={5.5}>
            {cardInfo && (
              <CardInfo
                cardInfo={cardInfo}
                setCardInfo={setCardInfo}
                errorMessage={errorMessage}
              />
            )}
            <MoneyOutput accauntAmount={bankAccInfo.accauntAmount / 100} />
          </Grid>
          <Grid item xs={5}>
            <MoneyAmount accauntAmount={bankAccInfo.accauntAmount / 100} />
            <RecentOperations
              accauntTransactions={bankAccInfo.accauntTransactions}
            />
          </Grid>
        </Grid>
      )}
      <CardLostModal creatorType={cardInfo?.creatorType} />
      <DeleteCardModal
        setCardInfo={setCardInfo}
        setErrorMessage={setErrorMessage}
      />
    </>
  );
}

export default PaymentSettingsPage;
