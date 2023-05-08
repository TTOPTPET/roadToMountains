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
import {
  ITourBooking,
  ITouristBookingData,
} from "../../../models/tourModels/ITourBooking";
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
  bookingDate,
  selectedDate,
  setSelectedDate,
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
          value={bookingData?.comment}
          onChange={(e) =>
            setBookingData({ ...bookingData, comment: e.target.value })
          }
        ></TextField>
      </Box>
    </Stack>
  );
};
