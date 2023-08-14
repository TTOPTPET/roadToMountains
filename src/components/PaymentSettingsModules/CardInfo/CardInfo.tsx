import { useState } from "react";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";

import { whiteColor } from "../../../config/MUI/color/color";

import {
  ICardInfo,
  StatusConnectCard,
} from "../../../models/paymentSettingsModels/IPaymentSettings";

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
import { CreatorType } from "../../../models/userModels/IUserInfo";
import { postFinanceInfo } from "../../../API/paymentAPI/postFinanceInfo";

type CardInfoProps = {
  submitFuntion?: () => void;
  cardInfo?: ICardInfo;
};

type CardInfoErrors = {
  bik: boolean;
  accountNumber: boolean;
};

const CardInfoErrorsDefault: CardInfoErrors = {
  bik: false,
  accountNumber: false,
};

export default function CardInfo({ cardInfo }: CardInfoProps) {
  const [cardInfoInputError, setCardInfoInputError] = useState<CardInfoErrors>(
    CardInfoErrorsDefault
  );

  const cardInfoInputValidation = (
    type: keyof CardInfoErrors,
    value: string
  ): boolean => {
    switch (type) {
      case "bik":
        return value && value.length === 9 ? false : true;
      case "accountNumber":
        return value && value.length === 20 ? false : true;
      default:
        return false;
    }
  };

  const handlerCardInfoErrorChange = (
    key: keyof CardInfoErrors,
    error: boolean
  ) => {
    setCardInfoInputError((cardInfoInputError) => ({
      ...cardInfoInputError,
      [key]: error,
    }));
  };

  const dispatch = useDispatch();

  const [editedCardInfo, setEditedCardInfo] = useState(cardInfo);

  console.log(editedCardInfo);

  return (
    <>
      <Typography variant="h5">Информация о Вашем счёте</Typography>
      {cardInfo.creatorType === CreatorType.SELF ? (
        <Paper
          sx={{
            backgroundColor: whiteColor,
            mt: "10px",
            mb: "90px",
            p: "20px",
            position: "relative",
            boxShadow: "0",
          }}
        >
          {cardInfo?.fieldsPaymentCreator?.statusConnectCard &&
            cardInfo?.fieldsPaymentCreator?.statusConnectCard ===
              StatusConnectCard.waitingBank && (
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
            {cardInfo?.fieldsPaymentCreator?.statusConnectCard &&
            cardInfo?.fieldsPaymentCreator?.statusConnectCard ===
              StatusConnectCard.linked ? (
              <>
                <img src={checked} alt="successfull" />
                <Typography variant="h6">
                  Ваша карта успешно привязана
                </Typography>
              </>
            ) : cardInfo?.fieldsPaymentCreator?.statusConnectCard ===
              StatusConnectCard.failedLink ? (
              <>
                <img src={banIcon} alt="failed" />
                <Typography variant="h6">
                  Неуспешная попытка привязки
                </Typography>
              </>
            ) : cardInfo?.fieldsPaymentCreator?.statusConnectCard ===
              StatusConnectCard.notLinked ? (
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
          {cardInfo?.fieldsPaymentCreator?.cardId && (
            <Paper sx={{ boxShadow: "0", p: "30px 20px", mt: "7px" }}>
              <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Typography variant="caption">Карта</Typography>
                <Typography variant="button">
                  {cardInfo?.fieldsPaymentCreator?.cardId}
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
            {cardInfo?.fieldsPaymentCreator?.statusConnectCard ===
              StatusConnectCard.linked && (
              <Button
                onClick={() => {
                  dispatch(setModalActive("deleteCardModal"));
                }}
              >
                Отвязать карту
              </Button>
            )}
          </Stack>
        </Paper>
      ) : (
        <Paper
          sx={{
            backgroundColor: whiteColor,
            mt: "10px",
            mb: "57px",
            p: "20px",
            position: "relative",
            boxShadow: "0",
          }}
        >
          {cardInfo?.fieldsPaymentCreator?.statusConnectCard &&
            cardInfo?.fieldsPaymentCreator?.statusConnectCard ===
              StatusConnectCard.waitingBank && (
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
            {cardInfo?.fieldsPaymentCreator?.bik !==
              editedCardInfo?.fieldsPaymentCreator?.bik ||
            cardInfo?.fieldsPaymentCreator?.accountNumber !==
              editedCardInfo?.fieldsPaymentCreator?.accountNumber ? (
              <>
                <img src={clock} alt="waiting" />
                <Typography variant="h6">
                  Обновите информацию о счете
                </Typography>
              </>
            ) : cardInfo?.fieldsPaymentCreator?.bik &&
              cardInfo?.fieldsPaymentCreator?.accountNumber ? (
              <>
                <img src={checked} alt="successfull" />
                <Typography variant="h6">Информация обновлена</Typography>
              </>
            ) : (
              <>
                <img src={alert} alt="notlinked" />
                <Typography variant="h6">У Вас нет информации</Typography>
              </>
            )}
          </Stack>
          <TextField
            label="БИК"
            color="secondary"
            sx={{ mt: "10px" }}
            type="number"
            value={editedCardInfo?.fieldsPaymentCreator?.bik}
            onChange={(e) => {
              handlerCardInfoErrorChange(
                "bik",
                cardInfoInputValidation("bik", e.target.value)
              );
              setEditedCardInfo({
                ...editedCardInfo,
                fieldsPaymentCreator: {
                  ...editedCardInfo?.fieldsPaymentCreator,
                  bik: e.target.value,
                },
              });
            }}
            error={
              editedCardInfo?.fieldsPaymentCreator?.bik &&
              editedCardInfo?.fieldsPaymentCreator?.bik?.length !== 9
            }
          />
          <TextField
            label="ЛС"
            color="secondary"
            sx={{ mt: "10px" }}
            type="number"
            value={editedCardInfo?.fieldsPaymentCreator?.accountNumber}
            onChange={(e) => {
              handlerCardInfoErrorChange(
                "accountNumber",
                cardInfoInputValidation("accountNumber", e.target.value)
              );
              setEditedCardInfo({
                ...editedCardInfo,
                fieldsPaymentCreator: {
                  ...editedCardInfo?.fieldsPaymentCreator,
                  accountNumber: e.target.value,
                },
              });
            }}
            error={
              editedCardInfo?.fieldsPaymentCreator?.accountNumber &&
              editedCardInfo?.fieldsPaymentCreator?.accountNumber?.length !== 20
            }
          />
          <Stack
            direction={"row"}
            mt="20px"
            gap="10px"
            justifyContent={"flex-end"}
          >
            <Button
              onClick={() => {
                postFinanceInfo(cardInfo?.creatorType, {
                  accountNumber:
                    editedCardInfo?.fieldsPaymentCreator?.accountNumber,
                  bik: editedCardInfo?.fieldsPaymentCreator?.bik,
                });
              }}
              sx={{ width: "100%" }}
              disabled={
                (cardInfo?.fieldsPaymentCreator?.bik ===
                  editedCardInfo?.fieldsPaymentCreator?.bik &&
                  cardInfo?.fieldsPaymentCreator?.accountNumber ===
                    editedCardInfo?.fieldsPaymentCreator?.accountNumber) ||
                Object.values(cardInfoInputError).some(
                  (value) => value !== false
                ) ||
                !editedCardInfo?.fieldsPaymentCreator?.bik ||
                !editedCardInfo?.fieldsPaymentCreator?.accountNumber
              }
            >
              Обновить информацию о счете
            </Button>
          </Stack>
        </Paper>
      )}
    </>
  );
}
