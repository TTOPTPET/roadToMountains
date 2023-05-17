import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { FC } from "react";
import { whiteColor } from "../../../config/MUI/color/color";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";
import { TouristOrder } from "./TouristOrder/TouristOrder";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";

export const CalendarSidebar: FC<IPublicTour> = (selectedPublic) => {
  const dispatch = useDispatch();
  return (
    <Stack direction={"column"} gap={2}>
      <Typography variant={"h5"}>
        {selectedPublic?.tour?.tourName ?? "Название тура"}
      </Typography>
      <Typography variant={"caption"} mt={3}>
        {dayjs(selectedPublic?.tourDate?.from).format("D MMMM YYYY") +
          " - " +
          dayjs(selectedPublic?.tourDate?.to).format("D MMMM YYYY")}
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
          disabled={Object.keys(selectedPublic).length === 0}
          onClick={() => dispatch(setModalActive("newPublicModal"))}
        >
          Редактировать
        </Button>
        <Typography variant={"caption"} align={"right"}>
          {dayjs(selectedPublic?.tourDate?.from)
            .add(-3, "day")
            .format("D MMMM YYYY")}
        </Typography>
        <Button disabled={Object.keys(selectedPublic).length === 0}>
          Отменить тур
        </Button>
        <Typography variant={"caption"} align={"right"}>
          {dayjs(selectedPublic?.tourDate?.from)
            .add(-1, "day")
            .format("D MMMM YYYY")}
        </Typography>
      </Stack>
      <Typography variant={"h6"}>
        Заказы{" ("}
        {selectedPublic?.bookingInfo ? selectedPublic?.bookingInfo.length : 0}
        {")"}
      </Typography>
      <Stack direction={"column"} gap={2} mt={2}>
        {selectedPublic?.bookingInfo &&
          selectedPublic?.bookingInfo.map((booking, index) => (
            <TouristOrder key={index} {...booking} />
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
  );
};
