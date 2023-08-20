import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { useState, Dispatch, SetStateAction } from "react";
import { redColor, whiteColor } from "../../../config/MUI/color/color";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";
import TouristOrder from "./TouristOrder/TouristOrder";
import ConfirmCancelPostedTourModal from "../../Modals/ConfirmCancelPostedTourModal/ConfirmCancelPostedTourModal";
import SuccessCancelPostedTourModal from "../../Modals/SuccessCancelPostedTourModal/SuccessCancelPostedTourModal";

type Props = {
  selectedPublic: IPublicTour;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  errorMessage: string;
  setPublicTours?: Dispatch<SetStateAction<IPublicTour[]>>;
  setSelectedPublic?: Dispatch<SetStateAction<IPublicTour>>;
};

export default function CalendarSidebar({
  selectedPublic,
  setErrorMessage,
  errorMessage,
  setPublicTours,
  setSelectedPublic,
}: Props) {
  const dispatch = useDispatch();

  console.log(selectedPublic);

  return (
    <>
      <Typography variant={"h5"} sx={{ mb: 3, mt: 1 }}>
        {selectedPublic?.tour?.tourName || "Название тура"}
      </Typography>
      <Stack direction={"column"} gap={1} sx={{ height: "65vh" }}>
        <Typography variant={"caption"}>
          {selectedPublic?.tourDate?.from && selectedPublic?.tourDate?.to
            ? dayjs(selectedPublic?.tourDate?.from).format("D MMMM YYYY") +
              " - " +
              dayjs(selectedPublic?.tourDate?.to).format("D MMMM YYYY")
            : "Дата начала - Дата конца"}
        </Typography>
        <Typography variant={"caption"}>
          {(selectedPublic?.personNum || 0) + " человек"}
        </Typography>
        <Typography variant={"caption"}>
          {selectedPublic?.tourAmount / 100 || 0}₽
        </Typography>
        <Stack direction={"column"}>
          <Typography variant={"caption"}>Стоимость на платформе:</Typography>
          <Typography variant={"caption"}>
            {" "}
            {selectedPublic?.tourAmountWithCommission / 100 || 0}₽
          </Typography>
        </Stack>
        <Stack
          direction={"column"}
          gap={1}
          alignSelf={"end"}
          alignItems={"flex-end"}
        >
          <Button
            disabled={
              !selectedPublic ||
              Object.keys(selectedPublic).length === 0 ||
              dayjs(selectedPublic?.updateDeadline) <= dayjs(new Date())
            }
            onClick={() => dispatch(setModalActive("newPublicModal"))}
          >
            Редактировать
          </Button>
          <Stack direction={"column"}>
            {selectedPublic &&
              dayjs(selectedPublic?.updateDeadline) <= dayjs(new Date()) && (
                <Typography
                  variant={"caption"}
                  align={"right"}
                  sx={{ color: redColor }}
                >
                  Время редактирования истекло
                </Typography>
              )}
            <Typography variant={"caption"} align={"right"}>
              {selectedPublic?.updateDeadline
                ? dayjs(selectedPublic?.updateDeadline)
                    .add(-3, "day")
                    .format("D MMMM YYYY")
                : "Дата конца ред."}
            </Typography>
          </Stack>
          <Button
            disabled={
              !selectedPublic ||
              Object.keys(selectedPublic).length === 0 ||
              dayjs(selectedPublic?.cancelDeadline) <= dayjs(new Date())
            }
            onClick={() =>
              dispatch(
                setModalActive("confirmCancelPostedTourModal", {
                  multiply: false,
                })
              )
            }
          >
            Отменить тур
          </Button>
          <Stack direction={"column"}>
            {selectedPublic &&
              dayjs(selectedPublic?.cancelDeadline) <= dayjs(new Date()) && (
                <Typography
                  variant={"caption"}
                  align={"right"}
                  sx={{ color: redColor }}
                >
                  Время отмены тура истекло
                </Typography>
              )}
            <Typography variant={"caption"} align={"right"}>
              {selectedPublic?.cancelDeadline
                ? dayjs(selectedPublic?.cancelDeadline)
                    .add(-1, "day")
                    .format("D MMMM YYYY")
                : "Дата конца отмены"}
            </Typography>
          </Stack>
        </Stack>
        {errorMessage && (
          <Typography
            variant="caption"
            textAlign={"center"}
            sx={{ color: redColor }}
          >
            {errorMessage}
          </Typography>
        )}
        <Stack sx={{ height: "100%" }}>
          <Typography variant={"h6"}>
            Заказы{" ("}
            {selectedPublic?.bookingInfo
              ? selectedPublic?.bookingInfo.length
              : 0}
            {")"}
          </Typography>
          <Stack
            direction={"column"}
            gap={1}
            mt={2}
            flex={1}
            minHeight={"14vh"}
            overflow={"scroll"}
            sx={{ "&::-webkit-scrollbar": { width: "0" } }}
          >
            {selectedPublic?.bookingInfo &&
              selectedPublic?.bookingInfo.map((booking, index) => (
                <TouristOrder
                  key={index}
                  index={index}
                  bookingInfo={booking}
                  selectedPublic={selectedPublic}
                />
              ))}
          </Stack>
          <Typography variant={"h6"} mt={2}>
            Доход
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Paper
              sx={{ backgroundColor: whiteColor, borderRadius: 6, padding: 3 }}
            >
              <Typography variant={"button"} align={"center"}>
                {selectedPublic?.publicTourProfit / 100 || 0}₽
              </Typography>
            </Paper>
          </Box>
        </Stack>
        <ConfirmCancelPostedTourModal
          setErrorMessage={setErrorMessage}
          setPublicTours={setPublicTours}
          setSelectedPublic={setSelectedPublic}
          publicTourId={selectedPublic?.publicTourId}
        />
        <SuccessCancelPostedTourModal />
      </Stack>
    </>
  );
}
