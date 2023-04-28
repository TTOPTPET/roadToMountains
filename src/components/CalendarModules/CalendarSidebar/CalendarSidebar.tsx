import { Box, Button, Paper, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import dayjs from "dayjs";
import { FC } from "react";
import { whiteColor } from "../../../config/MUI/color/color";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";
import { TouristOrder } from "./TouristOrder/TouristOrder";

export const CalendarSidebar: FC<IPublicTour> = (publicTour) => {
  return (
    <Stack direction={"column"} gap={2}>
      <Typography variant={"h5"}>
        {publicTour?.tour?.tourName ?? "Название тура"}
      </Typography>
      <Typography variant={"caption"} mt={3}>
        {dayjs(publicTour?.tourDate?.from).format("D MMMM YYYY") +
          " - " +
          dayjs(publicTour?.tourDate?.to).format("D MMMM YYYY")}
      </Typography>
      <Typography variant={"caption"}>
        {(publicTour?.personNum ?? 0) + " человек"}
      </Typography>
      <Typography variant={"caption"}>
        {publicTour?.tourAmount ?? 0}₽
      </Typography>
      <Stack direction={"column"}>
        <Typography variant={"caption"}>Стоимость на платформе:</Typography>
        <Typography variant={"caption"}>
          {" "}
          {publicTour?.tourAmount ?? 0}₽
        </Typography>
      </Stack>
      <Stack direction={"column"} width={"55%"} gap={1} alignSelf={"end"}>
        <Button>Редактировать</Button>
        <Typography variant={"caption"} align={"right"}>
          {dayjs(publicTour?.tourDate?.from)
            .add(-3, "day")
            .format("D MMMM YYYY")}
        </Typography>
        <Button>Отменить тур</Button>
        <Typography variant={"caption"} align={"right"}>
          {dayjs(publicTour?.tourDate?.from)
            .add(-1, "day")
            .format("D MMMM YYYY")}
        </Typography>
      </Stack>
      <Typography variant={"h6"}>
        Заказы{" ("}
        {publicTour?.bookingInfo ? publicTour?.bookingInfo.length : 0}
        {")"}
      </Typography>
      <Stack direction={"column"} gap={2} mt={2}>
        {publicTour?.bookingInfo &&
          publicTour?.bookingInfo.map((booking, index) => (
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
            {publicTour?.publicTourProfit ?? 0}₽
          </Typography>
        </Paper>
      </Box>
    </Stack>
  );
};
