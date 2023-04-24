import { Stack, Typography, TextField, Box, Button } from "@mui/material";
import { LocalizationProvider, DateField } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FC, Dispatch, SetStateAction, useState } from "react";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { tourStepsMap } from "../../../pages/TourPage/TourPage";

interface ITourBookingProps {
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  page: tourStepsMap;
  setPage: (prop: any) => void;
}

export const TourBooking: FC<ITourBookingProps> = ({
  tourInfo,
  bookingData,
  setBookingData,
  page,
  setPage,
}) => {
  const [datePickerValue, setDatePickerValue] = useState([
    {
      startDate: dayjs(bookingData.tourDate.from).toDate(),
      endDate: dayjs(bookingData.tourDate.to).toDate(),
      key: "selection",
    },
  ]);
  const handleDateChange = (type: "from" | "to", value: Dayjs) => {
    try {
      const stringDate = value ? value.toISOString() : "";
      switch (type) {
        case "from": {
          setBookingData({
            ...bookingData,
            tourDate: { ...bookingData.tourDate, from: stringDate },
          });
          break;
        }
        case "to": {
          setBookingData({
            ...bookingData,
            tourDate: { ...bookingData.tourDate, to: stringDate },
          });
          break;
        }
        default:
          break;
      }
    } catch (error) {
      console.log("invalid Data format");
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        flexWrap={"wrap"}
        mt={5}
      >
        <div className="date">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => {
              setDatePickerValue([
                item.selection as {
                  startDate: Date;
                  endDate: Date;
                  key: string;
                },
              ]);
              setBookingData({
                ...bookingData,
                tourDate: {
                  from: dayjs(item.selection.startDate).toDate().toString(),
                  to: dayjs(item.selection.endDate).toDate().toString(),
                },
              });
            }}
            moveRangeOnFirstSelection={false}
            ranges={datePickerValue}
          />
        </div>
        <Stack direction={"column"} gap={2} mt={5}>
          <DateField
            value={dayjs(bookingData.tourDate.from)}
            onChange={(newValue) => handleDateChange("from", newValue)}
            label={"Дата заезда"}
          />
          <DateField
            value={dayjs(bookingData.tourDate.to)}
            onChange={(newValue) => handleDateChange("to", newValue)}
            label={"Дата выезда"}
          />
          <Stack direction={"column"}>
            <TextField
              label={"Количество человек"}
              type={"number"}
              InputProps={{ inputProps: { min: 0 } }}
            />
            <Typography variant={"caption"}>Мест свободно: {8}</Typography>
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "350px",
            height: "270px",
            backgroundColor: lightTurquoiseColor,
            borderRadius: 5,
          }}
          padding={4}
        >
          <Typography variant={"h5"}>
            {tourInfo?.tourName ?? "Название тура"}
          </Typography>
          <Typography variant={"caption"}>
            {"nearestDate" in tourInfo
              ? (dayjs(tourInfo?.nearestDate?.from).format("D MMMM YYYY") ??
                  "") +
                " - " +
                (dayjs(tourInfo?.nearestDate?.to).format("D MMMM YYYY") ?? "")
              : ""}
          </Typography>
          <Typography variant={"h5"} mt={2}>
            {tourInfo?.prices?.from ?? 0}₽
          </Typography>
          <Typography variant={"caption"}>
            Оплатить бронирование необходимо в течение 3 часов
          </Typography>
          <Button
            variant={"contained"}
            sx={{ marginTop: 1 }}
            onClick={() =>
              setPage((page: tourStepsMap) => (page < 2 ? page + 1 : page))
            }
          >
            Забронировать
          </Button>
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};
