import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { FC, useState, Dispatch, SetStateAction } from "react";
import { redColor, whiteColor } from "../../../config/MUI/color/color";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";
import BookingInfoModal from "../../Modals/BookingInfoModal/BookingInfoModal";
import TouristOrder from "./TouristOrder/TouristOrder";

type Props = {
  selectedPublic: IPublicTour;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  errorMessage: string;
};

export default function CalendarSidebar({
  selectedPublic,
  setErrorMessage,
  errorMessage,
}: Props) {
  const dispatch = useDispatch();

  console.log(selectedPublic);

  return (
    <>
      <Stack direction={"column"} gap={2}>
        <Typography variant={"h5"}>
          {selectedPublic?.tour?.tourName ?? "Название тура"}
        </Typography>
        <Typography variant={"caption"} mt={3}>
          {selectedPublic?.tourDate?.from && selectedPublic?.tourDate?.to
            ? dayjs(selectedPublic?.tourDate?.from).format("D MMMM YYYY") +
              " - " +
              dayjs(selectedPublic?.tourDate?.to).format("D MMMM YYYY")
            : "Дата начала - Дата конца"}
        </Typography>
        <Typography variant={"caption"}>
          {(selectedPublic?.personNum ?? 0) + " человек"}
        </Typography>
        <Typography variant={"caption"}>
          {selectedPublic?.tourAmount ?? 0}₽
        </Typography>
        <Stack direction={"column"}>
          <Typography variant={"caption"}>Стоимость на платформе:</Typography>
          <Typography variant={"caption"}>
            {" "}
            {selectedPublic?.tourAmount ?? 0}₽
          </Typography>
        </Stack>
        <Stack direction={"column"} width={"55%"} gap={1} alignSelf={"end"}>
          <Button
            disabled={
              !selectedPublic || Object.keys(selectedPublic).length === 0
            }
            onClick={() => dispatch(setModalActive("newPublicModal"))}
          >
            Редактировать
          </Button>
          <Typography variant={"caption"} align={"right"}>
            {selectedPublic?.tourDate?.from
              ? dayjs(selectedPublic?.tourDate?.from)
                  .add(-3, "day")
                  .format("D MMMM YYYY")
              : "Дата конца ред."}
          </Typography>
          <Button
            disabled={
              !selectedPublic || Object.keys(selectedPublic).length === 0
            }
            onClick={() =>
              dispatch(
                setModalActive("confirmCancelPostedTourModal", {
                  multiply: false,
                  publicTourId: selectedPublic?.publicTourId,
                })
              )
            }
          >
            Отменить тур
          </Button>
          <Typography variant={"caption"} align={"right"}>
            {selectedPublic?.tourDate?.from
              ? dayjs(selectedPublic?.tourDate?.from)
                  .add(-1, "day")
                  .format("D MMMM YYYY")
              : "Дата конца отмены"}
          </Typography>
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
        <Typography variant={"h6"}>
          Заказы{" ("}
          {selectedPublic?.bookingInfo ? selectedPublic?.bookingInfo.length : 0}
          {")"}
        </Typography>
        <Stack direction={"column"} gap={2} mt={2}>
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
        <Typography variant={"h6"} mt={5}>
          Доход
        </Typography>
        <Box>
          <Paper
            sx={{ backgroundColor: whiteColor, borderRadius: 6, padding: 3 }}
          >
            <Typography variant={"button"} align={"center"}>
              {selectedPublic?.publicTourProfit ?? 0}₽
            </Typography>
          </Paper>
        </Box>
      </Stack>
      <BookingInfoModal />
    </>
  );
}
