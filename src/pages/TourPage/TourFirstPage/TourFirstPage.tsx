import { FC, SetStateAction, Dispatch } from "react";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { Stack, Typography, SvgIcon, TextField, Button } from "@mui/material";
import { ReactComponent as Icon } from "../../../media/logo.svg";
import { TourInfo } from "../../../components/TourInfo/TourInfo";
import dayjs, { Dayjs } from "dayjs";
import { DateCalendar, DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { Box } from "@mui/system";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";

interface TourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
}

export const TourFirstPage: FC<TourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
  bookingData,
  setBookingData,
}) => {
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
    <>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography variant={"h3"} marginBottom={1}>
          {tourInfo?.tourName ?? "Название тура"}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <SvgIcon fontSize={"large"} viewBox={"0 0 70 70"}>
            <Icon />
          </SvgIcon>
          <Typography variant={"button"}>ООО "Алтайский тур"</Typography>
        </Stack>
      </Stack>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo={false}
        tourInfo={tourInfo}
      />
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          mt={5}
        >
          <div className="date">
            <DateCalendar
              value={dayjs(bookingData.tourDate.from)}
              onChange={(newValue) => handleDateChange("to", newValue)}
            />
          </div>
          <Stack direction={"column"} gap={2} mt={5}>
            <DatePicker
              value={dayjs(bookingData.tourDate.from)}
              onChange={(newValue) => handleDateChange("from", newValue)}
              label={"Дата заезда"}
            />
            <DatePicker
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
              {tourInfo?.price?.from ?? 0}₽
            </Typography>
            <Typography variant={"caption"}>
              Оплатить бронирование необходимо в течение 3 часов
            </Typography>
            <Button variant={"contained"} sx={{ marginTop: 1 }}>
              Забронировать
            </Button>
          </Box>
        </Stack>
      </LocalizationProvider>
    </>
  );
};
