import { Paper, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { FC } from "react";
import {
  darkTurquoiseColor,
  whiteColor,
} from "../../../../config/MUI/color/color";
import {
  IBookingInfo,
  IPublicTour,
} from "../../../../models/calendarModels/IPublicTour";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../../redux/Modal/ModalReducer";

type Props = {
  bookingInfo: IBookingInfo;
  selectedPublic: IPublicTour;
  index: number;
};

export default function TouristOrder({
  bookingInfo,
  selectedPublic,
  index,
}: Props) {
  const dispatch = useDispatch();

  return (
    <Box
      sx={{
        backgroundColor: whiteColor,
        borderRadius: 10,
        cursor: "pointer",
      }}
      onClick={() => {
        dispatch(
          setModalActive("bookingInfoModal", {
            index: index,
          })
        );
      }}
    >
      <Paper sx={{ backgroundColor: whiteColor, borderRadius: 8, padding: 2 }}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          alignItems={"center"}
        >
          <Stack direction={"row"} alignItems={"center"}>
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: 30,
                backgroundColor: darkTurquoiseColor,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography variant={"button"} align={"center"} color={"white"}>
                {bookingInfo?.touristsInfo.length || 0}
              </Typography>
            </Box>
            <Stack direction={"column"} sx={{ ml: "10px" }} gap={"5px"}>
              <Typography variant={"h6"}>
                №{bookingInfo?.bookingId || "0"}
              </Typography>
              <Typography
                variant={"caption"}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {bookingInfo?.userInfo?.name || "Пользователь не указан"}
              </Typography>
            </Stack>
          </Stack>
          <Typography variant={"caption"} mr={2}>
            {bookingInfo?.tourAmount / 100 || 0}₽
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
