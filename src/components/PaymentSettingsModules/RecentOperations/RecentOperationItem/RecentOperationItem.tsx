import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { whiteColor } from "../../../../config/MUI/color/color";

import { AccauntTransactions } from "../../../../models/paymentSettingsModels/IPaymentSettings";
import { AccauntTransactionsType } from "../../../../models/paymentSettingsModels/IPaymentSettings";
import dayjs from "dayjs";

type RecentOperationItemProps = {
  accauntTransaction: AccauntTransactions;
};

export default function RecentOperationItem({
  accauntTransaction,
}: RecentOperationItemProps) {
  return (
    <>
      <Paper
        sx={{
          boxShadow: "0",
          bgcolor: whiteColor,
          p: "15px 30px 20px",
        }}
      >
        <Typography variant="h6">
          {accauntTransaction.type === AccauntTransactionsType.payment
            ? "Оплата по окончанию тура"
            : accauntTransaction.type === AccauntTransactionsType.penalty
            ? "Неустойка"
            : "Вывод средств"}
        </Typography>
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
                Number(accauntTransaction.price)
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
    </>
  );
}
