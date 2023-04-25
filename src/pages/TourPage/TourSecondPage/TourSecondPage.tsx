import { TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Dispatch, SetStateAction, FC, useState, useEffect } from "react";
import { AddTouristButton } from "../../../components/AddTouristButton/AddTouristButton";
import { TourDetails } from "../../../components/MyTours/TourSummary/TourDetails";
import { TourBooking } from "../../../components/TourInfo/TourBooking/TourBooking";
import { TouristBooking } from "../../../components/TourInfo/TouristBooking/TouristBooking";
import {
  lightTurquoiseColor,
  whiteColor,
} from "../../../config/MUI/color/color";
import {
  ITourBooking,
  ITouristBookingData,
} from "../../../models/tourModels/ITourBooking";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface ITourSecondPageProps {
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  setPage: (prop: any) => void;
}

const defaultTourist: ITouristBookingData = {
  name: "",
  age: "",
  sex: "",
};

export const TourSecondPage: FC<ITourSecondPageProps> = ({
  bookingData,
  setBookingData,
  setPage,
  tourInfo,
}) => {
  useEffect(() => {
    setBookingData({
      ...bookingData,
      touristsInfo: new Array(bookingData.size).fill(defaultTourist),
    });
  }, [bookingData.size]);

  const touristInfo: JSX.Element[] = [];
  for (let i = 0; i < bookingData.size; i++) {
    touristInfo.push(
      <TouristBooking
        key={i}
        bookingData={bookingData}
        setBookingData={setBookingData}
        index={i}
      />
    );
  }
  console.log(bookingData.touristsInfo);
  return (
    <Stack gap={2}>
      <TourBooking
        tourInfo={tourInfo}
        bookingData={bookingData}
        setBookingData={setBookingData}
        setPage={setPage}
        isFirstPage={false}
      />
      <Box
        sx={{ width: "100%", backgroundColor: whiteColor }}
        borderRadius={10}
        padding={2}
      >
        <TourDetails record={{ ...tourInfo, type: "tourInfo" }} />
      </Box>
      <Stack direction={"column"} gap={2}>
        {touristInfo.map((item) => item)}
      </Stack>
      <AddTouristButton
        bookingData={bookingData}
        setBookingData={setBookingData}
      />
      <Box
        sx={{ width: "100%", backgroundColor: lightTurquoiseColor }}
        borderRadius={10}
        padding={4}
      >
        <Typography variant={"h5"} mb={2}>
          Комментарий к заказу
        </Typography>
        <TextField
          placeholder={"Введите комментарий (не более 1500 символов)"}
          color={"secondary"}
        ></TextField>
      </Box>
    </Stack>
  );
};
