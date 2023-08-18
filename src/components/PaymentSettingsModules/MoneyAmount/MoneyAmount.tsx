import { Paper, Stack, Typography } from "@mui/material";
import React from "react";
import { whiteColor } from "../../../config/MUI/color/color";

type MoneyAmountProps = {
  accauntAmount: number;
};

export default function MoneyAmount({ accauntAmount }: MoneyAmountProps) {
  return (
    <Paper
      sx={{
        backgroundColor: whiteColor,
        boxShadow: "0",
        mt: { lg: "40px", xs: "20px" },
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="caption">Средств на счету:</Typography>

        <Typography variant="button">
          {accauntAmount
            ? new Intl.NumberFormat("ru-RU").format(accauntAmount / 100)
            : 0}
          ₽
        </Typography>
      </Stack>
    </Paper>
  );
}
