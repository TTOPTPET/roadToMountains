import React, { useState } from "react";

import { Typography, Paper, TextField, Button, Stack } from "@mui/material";
import { redColor, whiteColor } from "../../../config/MUI/color/color";
import { postWithdrawal } from "../../../API/paymentAPI/postWithdrawal";
import { NumericFormat } from "react-number-format";

type MoneyOutputProps = {
  accauntAmount: number;
};

export default function MoneyOutput({ accauntAmount }: MoneyOutputProps) {
  const [amount, setAmount] = useState(100);

  const materialUITextFieldProps = {
    color: "secondary",
    error: Number(accauntAmount) < Number(amount),
    InputProps: { inputProps: { min: 0 } },
    label: "Сумма",
  };

  return (
    <>
      <Typography variant="h5">Вывод средств</Typography>
      <Paper
        sx={{
          backgroundColor: whiteColor,
          mt: "10px",
          p: "30px 20px 20px 30px",
          boxShadow: "0",
        }}
      >
        <Typography variant="h6">Сумма</Typography>
        {/* @ts-ignore */}
        <NumericFormat
          value={amount / 100 || 1}
          sx={{ mt: "20px" }}
          decimalScale={2}
          onValueChange={(values, sourceInfo) => {
            setAmount(values.floatValue * 100);
          }}
          thousandSeparator=" "
          customInput={TextField}
          {...materialUITextFieldProps}
        />
        {/* <TextField
          label="Сумма"
          color="secondary"
          sx={{ mt: "20px" }}
          type="number"
          value={amount / 100}
          onChange={(e) => setAmount(e.target.value * 100)}
          error={Number(accauntAmount) < Number(amount)}
        /> */}

        {Number(accauntAmount) < Number(amount) && (
          <Typography
            variant="caption"
            sx={{ color: redColor, mt: "10px", textAlign: "center" }}
          >
            Слишком большая сумма
          </Typography>
        )}
        {amount && Number(amount) < 10000 && (
          <Typography
            variant="caption"
            sx={{ color: redColor, mt: "10px", textAlign: "center" }}
          >
            Минимальная сумма вывода - 100 рублей
          </Typography>
        )}

        <Stack direction="row" justifyContent="flex-end">
          <Button
            sx={{
              mt: Number(accauntAmount) < Number(amount) ? "5px" : "30px",
            }}
            onClick={() => postWithdrawal({ amount: Number(amount) })}
            disabled={
              Number(accauntAmount) < Number(amount) ||
              (amount && Number(amount) < 10000)
            }
          >
            Вывести
          </Button>
        </Stack>
      </Paper>
    </>
  );
}
