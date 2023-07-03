import React from "react";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";

import { whiteColor } from "../../../config/MUI/color/color";

import { StatusConnectCard } from "../../../models/paymentSettingsModels/IPaymentSettings";

import { deleteCard } from "../../../API/paymentAPI/deleteCard";

import {
  Typography,
  Paper,
  Stack,
  Box,
  TextField,
  Button,
} from "@mui/material";

import checked from "../../../media/checkedVerify.svg";
import clock from "../../../media/clockVerify.svg";
import alert from "../../../media/alertVerify.svg";
import banIcon from "../../../media/ban-status-icon.svg";
import reload from "../../../media/reloadIcon.svg";

type CardInfoProps = {
  submitFuntion?: () => void;
  cardId?: string;
  statusConnectCard?: StatusConnectCard;
};

export default function CardInfo({ cardId, statusConnectCard }: CardInfoProps) {
  const dispatch = useDispatch();

  return (
    <>
      <Typography variant="h5">Информация о Вашем счёте</Typography>
      <Paper
        sx={{
          backgroundColor: whiteColor,
          mt: "10px",
          p: "20px",
          position: "relative",
          boxShadow: "0",
        }}
      >
        {statusConnectCard &&
          statusConnectCard === StatusConnectCard.waitingBank && (
            <Box
              sx={{
                position: "absolute",
                top: "15px",
                right: "15px",
                cursor: "pointer",
              }}
            >
              <img src={reload} alt="reload icon" />
            </Box>
          )}
        <Stack direction={"row"} alignItems={"center"} gap={"10px"}>
          {statusConnectCard &&
          statusConnectCard === StatusConnectCard.linked ? (
            <>
              <img src={checked} alt="successfull" />
              <Typography variant="h6">Ваша карта успешно привязана</Typography>
            </>
          ) : statusConnectCard === StatusConnectCard.failedLink ? (
            <>
              <img src={banIcon} alt="failed" />
              <Typography variant="h6">Неуспешная попытка привязки</Typography>
            </>
          ) : statusConnectCard === StatusConnectCard.notLinked ? (
            <>
              <img src={alert} alt="notlinked" />
              <Typography variant="h6">У Вас нет активной карты</Typography>
            </>
          ) : (
            <>
              <img src={clock} alt="waiting" />
              <Typography variant="h6">Ждём ответа от банка</Typography>
            </>
          )}
        </Stack>
        {cardId && (
          <Paper sx={{ boxShadow: "0", p: "30px 20px", mt: "7px" }}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Typography variant="caption">Карта</Typography>
              <Typography variant="button">
                {cardId.slice(0, 4) +
                  " " +
                  "****" +
                  " " +
                  "****" +
                  " " +
                  cardId.slice(12, 16)}
              </Typography>
            </Stack>
          </Paper>
        )}
        <Stack
          direction={"row"}
          mt="20px"
          gap="10px"
          justifyContent={"flex-end"}
        >
          <Button
            onClick={() => {
              dispatch(setModalActive("cardLostModal"));
            }}
          >
            Привязать новую карту
          </Button>
          {statusConnectCard === StatusConnectCard.linked && (
            <Button onClick={() => deleteCard()}>Отвязать карту</Button>
          )}
        </Stack>
      </Paper>
    </>
  );
}
