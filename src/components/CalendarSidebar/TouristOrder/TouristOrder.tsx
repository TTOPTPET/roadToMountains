import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import {
  darkTurquoiseColor,
  whiteColor,
} from "../../../config/MUI/color/color";
import { IBookingInfo } from "../../../models/calendarModels/IPublicTour";

export const TouristOrder: FC<IBookingInfo> = (bookingInfo) => {
  return (
    <Box sx={{ backgroundColor: whiteColor, borderRadius: 10 }}>
      <Paper sx={{ backgroundColor: whiteColor, borderRadius: 8, padding: 2 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: 30,
              backgroundColor: darkTurquoiseColor,
              color: "white",
            }}
          >
            <Typography
              variant={"button"}
              align={"center"}
              marginY={"35%"}
              color={"white"}
            >
              {bookingInfo?.touristsInfo.length ?? 0}
            </Typography>
          </Box>
          <Stack direction={"column"}>
            <Typography variant={"h6"}>
              №{bookingInfo?.bookingId ?? "0"}
            </Typography>
            <Typography variant={"caption"}>
              {bookingInfo?.userInfo?.name ?? "Пользователь не указан"}
            </Typography>
          </Stack>
          <Typography variant={"caption"} mr={2}>
            {bookingInfo?.tourAmount ?? 0}₽
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
};
