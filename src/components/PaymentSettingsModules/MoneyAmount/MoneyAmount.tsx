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
      }}
    >
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        alignItems={"center"}
      >
        <Typography variant="caption">Средств на счету:</Typography>

        <Typography variant="button">
          {new Intl.NumberFormat("ru-RU").format(accauntAmount)}₽
        </Typography>
      </Stack>
    </Paper>
  );
}
