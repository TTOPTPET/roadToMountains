import React, { useState } from "react";

import { Typography, Paper, TextField, Button, Stack } from "@mui/material";
import { redColor, whiteColor } from "../../../config/MUI/color/color";
import { postWithdrawal } from "../../../API/paymentAPI/postWithdrawal";
import { NumericFormat } from "react-number-format";
import MoneyOutputErrorModal from "../../Modals/MoneyOutputErrorModal/MoneyOutputErrorModal";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";
import SuccsessMoneyOutputModal from "../../Modals/SuccsessMoneyOutputModal/SuccsessMoneyOutputModal";

type MoneyOutputProps = {
  accauntAmount: number;
};

export default function MoneyOutput({ accauntAmount }: MoneyOutputProps) {
  const [amount, setAmount] = useState(100);
  const [errorMessage, setErrorMessage] = useState("");

  const materialUITextFieldProps = {
    color: "secondary",
    error:
      Number(accauntAmount) < Number(amount / 100) || Number(amount) < 10000,
    InputProps: { inputProps: { min: 0 } },
    label: "Сумма",
  };

  console.log(accauntAmount);

  const dispatch = useDispatch();

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
            console.log(values.floatValue);
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

        {Number(accauntAmount) < Number(amount / 100) && (
          <Typography
            variant="caption"
            sx={{ color: redColor, mt: "10px", textAlign: "center" }}
          >
            Слишком большая сумма
          </Typography>
        )}
        {Number(amount) < 10000 && (
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
              mt: Number(accauntAmount) < Number(amount / 100) ? "5px" : "30px",
            }}
            onClick={() =>
              postWithdrawal(
                { amount: Number(amount) },
                () => {
                  dispatch(setModalActive("succsessMoneyOutputModal"));
                },
                (e) => {
                  setErrorMessage(
                    e?.response?.data?.typeError === "UserError"
                      ? e?.response?.data?.errorMessage
                      : "Что-то пошло не так, попробуйте еще раз позже!"
                  );
                  dispatch(setModalActive("moneyOutputErrorModal"));
                }
              )
            }
            disabled={
              Number(accauntAmount) < Number(amount / 100) ||
              (amount && Number(amount) < 10000)
            }
          >
            Вывести
          </Button>
        </Stack>
        <SuccsessMoneyOutputModal />
        <MoneyOutputErrorModal errorMessage={errorMessage} />
      </Paper>
    </>
  );
}
