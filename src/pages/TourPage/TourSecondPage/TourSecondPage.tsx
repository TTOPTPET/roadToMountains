import { TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Dispatch, SetStateAction, FC, useEffect } from "react";
import { AddTouristButton } from "../../../components/AddTourModules/AddTouristButton/AddTouristButton";
import { TourDetails } from "../../../components/MyTours/TourSummary/TourDetails";
import { TourBooking } from "../../../components/TourInfo/TourBooking/TourBooking";
import { TouristBooking } from "../../../components/TourInfo/TouristBooking/TouristBooking";
import {
  lightTurquoiseColor,
  whiteColor,
} from "../../../config/MUI/color/color";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface ITourSecondPageProps {
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  setPage: (prop: any) => void;
  bookingDate: ITourBookingDate[];
  selectedDate: ITourBookingDate;
  setSelectedDate: Dispatch<SetStateAction<ITourBookingDate>>;
}
let touristInfo: JSX.Element[] = [];

export const TourSecondPage: FC<ITourSecondPageProps> = ({
  bookingData,
  setBookingData,
  setPage,
  tourInfo,
  bookingDate,
  selectedDate,
  setSelectedDate,
}) => {
  console.log(touristInfo.length);
  useEffect(() => {
    if (
      touristInfo.length < bookingData.size ||
      touristInfo.length > bookingData.size
    ) {
      setBookingData({
        ...bookingData,
        touristsInfo: new Array(bookingData.size).fill({}),
      });
    }
  }, [bookingData.size]);
  console.log(bookingData.touristsInfo);
  touristInfo = bookingData.touristsInfo.map((item, index) => (
    <TouristBooking
      key={index}
      bookingData={bookingData}
      touristData={item}
      setBookingData={setBookingData}
      index={index}
    />
  ));
  return (
    <Stack gap={2}>
      <TourBooking
        tourInfo={tourInfo}
        bookingData={bookingData}
        setBookingData={setBookingData}
        setPage={setPage}
        bookingDate={bookingDate}
        isFirstPage={false}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <Box
        sx={{ width: "100%", backgroundColor: whiteColor }}
        borderRadius={10}
        padding={2}
      >
        <TourDetails
          record={{ ...tourInfo, type: "tourInfo" }}
          bookingData={bookingData}
          selectedDate={selectedDate}
        />
      </Box>
      <Stack direction={"column"} gap={2}>
        {bookingData.touristsInfo.map((item, index) => (
          <TouristBooking
            key={index}
            bookingData={bookingData}
            touristData={item}
            setBookingData={setBookingData}
            index={index}
          />
        ))}
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
          value={bookingData?.comment}
          onChange={(e) =>
            setBookingData({ ...bookingData, comment: e.target.value })
          }
        ></TextField>
      </Box>
    </Stack>
  );
};
