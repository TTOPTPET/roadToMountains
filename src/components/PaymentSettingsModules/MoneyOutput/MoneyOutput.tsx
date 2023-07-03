import React, { useState } from "react";

import { Typography, Paper, TextField, Button, Stack } from "@mui/material";
import { redColor, whiteColor } from "../../../config/MUI/color/color";
import { postWithdrawal } from "../../../API/paymentAPI/postWithdrawal";

type MoneyOutputProps = {
  accauntAmount: number;
};

export default function MoneyOutput({ accauntAmount }: MoneyOutputProps) {
  const [amount, setAmount] = useState("");

  return (
    <>
      <Typography variant="h5" sx={{ mt: "70px" }}>
        Вывод средств
      </Typography>
      <Paper
        sx={{
          backgroundColor: whiteColor,
          mt: "10px",
          p: "30px 20px 20px 30px",
          boxShadow: "0",
        }}
      >
        <Typography variant="h6">Сумма</Typography>

        <TextField
          placeholder="Сумма"
          color="secondary"
          sx={{ mt: "20px" }}
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          error={Number(accauntAmount) < Number(amount)}
        />

        {Number(accauntAmount) < Number(amount) && (
          <Typography
            variant="caption"
            sx={{ color: redColor, mt: "10px", textAlign: "center" }}
          >
            Слишком большая сумма
          </Typography>
        )}

        <Stack direction="row" justifyContent="flex-end">
          <Button
            sx={{
              mt: Number(accauntAmount) < Number(amount) ? "5px" : "30px",
            }}
            onClick={(amount) => postWithdrawal(String(amount))}
            disabled={Number(accauntAmount) < Number(amount)}
          >
            Вывести
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
