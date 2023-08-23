import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { whiteColor } from "../../../../config/MUI/color/color";

import {
  AccauntTransactions,
  AccauntTransactionsSuccsess,
} from "../../../../models/paymentSettingsModels/IPaymentSettings";
import { AccauntTransactionsType } from "../../../../models/paymentSettingsModels/IPaymentSettings";
import dayjs from "dayjs";
import checked from "../../../../media/checkedVerify.svg";
import alert from "../../../../media/alertVerify.svg";
import clock from "../../../../media/clockVerify.svg";

type RecentOperationItemProps = {
  accauntTransaction: AccauntTransactions;
};

export default function RecentOperationItem({
  accauntTransaction,
}: RecentOperationItemProps) {
  console.log(accauntTransaction);

  const [expanded, setExpanded] = useState<string | false>(false);
  return (
    <Accordion
      defaultExpanded
      expanded={expanded === accauntTransaction.orderId}
      square={true}
      sx={{ width: "100%", boxShadow: "none" }}
    >
      <AccordionSummary
        sx={{
          padding: "0",
          height: { lg: "80px", xs: "69px" },
          borderRadius: "35px",
          boxShadow: "none",
        }}
      >
        <Paper
          sx={{
            width: "100%",
            boxShadow: "0",
            bgcolor: whiteColor,
            p: "15px 30px 20px",
          }}
        >
          <Stack
            direction={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Stack direction={"row"} alignItems={"top"} gap="4px">
              <Typography variant="h6">
                {accauntTransaction.type === AccauntTransactionsType.payment
                  ? "Оплата по окончанию тура"
                  : accauntTransaction.type === AccauntTransactionsType.penalty
                  ? "Неустойка"
                  : "Вывод средств"}
              </Typography>
              <Box
                sx={{
                  width: "15px",
                  height: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img
                  src={
                    accauntTransaction?.success ===
                    AccauntTransactionsSuccsess.successfully
                      ? checked
                      : accauntTransaction?.success ===
                        AccauntTransactionsSuccsess.notSuccessfully
                      ? alert
                      : clock
                  }
                  alt="accaunt transaction status"
                  style={{
                    objectFit: "contain",
                    width: "100%",
                    height: "100%",
                  }}
                />
              </Box>
            </Stack>
            {accauntTransaction?.success ===
              AccauntTransactionsSuccsess.notSuccessfully && (
              <Typography
                variant={"caption"}
                sx={{
                  color: "#6D6D6D",
                  fontFamily: "Montserrat",
                  fontSize: "11px",
                  fontWeight: 400,
                  lineHeight: "20px",
                }}
                onClick={() => {
                  setExpanded(
                    expanded === accauntTransaction.orderId
                      ? false
                      : accauntTransaction.orderId
                  );
                }}
              >
                {expanded ? "скрыть деали" : "показать детали"}
              </Typography>
            )}
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            sx={{ mt: "7px" }}
          >
            <Typography variant={"caption"}>
              {(accauntTransaction.type === AccauntTransactionsType.withdrawal
                ? "-"
                : "+") +
                new Intl.NumberFormat("ru-RU").format(
                  Number(accauntTransaction.price) / 100
                ) +
                "₽"}
            </Typography>
            <Typography
              variant={"caption"}
              sx={{
                width: "170px",
                textAlign: "center",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {accauntTransaction.description}
            </Typography>
            <Typography variant={"caption"}>
              {dayjs(accauntTransaction.createAt).format("DD.MM.YYYY")}
            </Typography>
          </Stack>
        </Paper>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          boxShadow: "none",
          bgcolor: "#F9F9F9",
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
        }}
      >
        <Typography
          sx={{
            color: "#154162",
            fontFamily: "Montserrat",
            fontSize: "11px",
            fontWeight: "400",
            lineHeight: "20px",
          }}
        >
          {accauntTransaction?.metaPayment?.errorMessage}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}
