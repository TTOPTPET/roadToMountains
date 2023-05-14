import {
  Stack,
  Typography,
  TextField,
  Box,
  Button,
  Skeleton,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FC, Dispatch, SetStateAction, useState, useEffect } from "react";
import { lightTurquoiseColor, redColor } from "../../../config/MUI/color/color";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";
import { tourStepsMap } from "../../../pages/TourPage/TourPage";
import * as locales from "react-date-range/dist/locale";
import { booking } from "../../../API/touristAPI/booking";
import isBetween from "dayjs/plugin/isBetween";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";

dayjs.extend(isBetween);

interface ITourBookingProps {
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  setPage: (prop: any) => void;
  bookingDate: ITourBookingDate[];
  selectedDate: ITourBookingDate;
  setSelectedDate: Dispatch<SetStateAction<ITourBookingDate>>;
  isFirstPage: boolean;
}

const handlerDateConverter = (dates: ITourBookingDate[]) => {
  return [
    ...dates.map((item, index) => ({
      ["selection" + index]: {
        startDate: dayjs(item.date.from).toDate(),
        endDate: dayjs(item.date.to).toDate(),
        key: "selection" + index,
      },
    })),
  ];
};

export const TourBooking: FC<ITourBookingProps> = ({
  tourInfo,
  bookingData,
  setBookingData,
  setPage,
  bookingDate,
  selectedDate,
  setSelectedDate,
  isFirstPage,
}) => {
  const [datePickerValue, setDatePickerValue] = useState(
    handlerDateConverter(bookingDate)
  );

  const [errSize, setErrSize] = useState<boolean>(false);
  useEffect(() => {
    if (bookingData?.size >= 50) {
      setBookingData((data) => ({
        ...data,
        size: 50,
      }));
    }
    if (bookingData?.size > selectedDate?.bookingNumber) {
      setErrSize(true);
    } else {
      setErrSize(false);
    }
  }, [bookingData?.size]);

  useEffect(() => {
    if (bookingDate.length) {
      setDatePickerValue(handlerDateConverter(bookingDate));
      setSelectedDate(bookingDate[0]);
    }
  }, [bookingDate]);

  const dateValidation = (value: string) => {
    bookingDate.forEach((item, index) => {
      const fsaf: boolean = dayjs(value).isBetween(
        dayjs(item.date.from),
        dayjs(item.date.to),
        "day",
        "[]"
      );
      if (fsaf) {
        setBookingData({
          ...bookingData,
          tourDate: {
            from: dayjs(item?.date?.from).toISOString(),
            to: dayjs(item?.date?.to).toISOString(),
          },
          publicTourId: item?.publicTourId,
          tourAmount: item?.price,
        });
        setSelectedDate(item);
      }
    });
  };
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
      <Stack direction={"row"} gap={10} flexWrap={"wrap"} mt={5}>
        <div className="date">
          {datePickerValue.length !== 0 ? (
            <DateRange
              editableDateInputs={true}
              showDateDisplay={false}
              locale={locales["ru"]}
              dragSelectionEnabled={false}
              showPreview={false}
              onChange={(item) => {
                const selectionName = Object.keys(item).filter((key) => {
                  return item[key];
                });
                console.log(item);
                dateValidation(item[selectionName[0]].endDate.toString());
              }}
              moveRangeOnFirstSelection={false}
              ranges={[
                ...datePickerValue.map(
                  (item, index) => item["selection" + index]
                ),
              ]}
            />
          ) : (
            <Skeleton
              width={330}
              height={310}
              animation={"wave"}
              variant={"rounded"}
            />
          )}
        </div>
        <Stack direction={"column"} gap={2} mt={5}>
          <DatePicker
            value={dayjs(selectedDate?.date?.from)}
            onChange={(newValue) => handleDateChange("from", newValue)}
            disableOpenPicker={true}
            disabled={true}
            renderInput={(props) => (
              <TextField
                {...props}
                error={props.error && props.inputProps.value !== ""}
                inputProps={{
                  ...props.inputProps,
                  placeholder: "Дата заезда",
                }}
                sx={{ color: "black" }}
              />
            )}
          />
          <DatePicker
            value={dayjs(selectedDate?.date?.to)}
            onChange={(newValue) => handleDateChange("to", newValue)}
            disableOpenPicker={true}
            disabled={true}
            renderInput={(props) => (
              <TextField
                {...props}
                error={props.error && props.inputProps.value !== ""}
                inputProps={{
                  ...props.inputProps,
                  placeholder: "Дата выезда",
                }}
                sx={{ color: "black" }}
              />
            )}
          />
          <Stack direction={"column"}>
            <TextField
              placeholder={"Количество человек"}
              type={"number"}
              InputProps={{ inputProps: { min: 0, max: 50 } }}
              error={errSize}
              value={bookingData?.size || undefined}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  size: +e.target.value,
                })
              }
            />
            <Typography variant={"caption"}>
              Мест свободно: {selectedDate?.bookingNumber ?? 0}
            </Typography>
            {errSize && (
              <Typography
                variant="caption"
                className="size__error"
                sx={{ color: redColor, mb: "15px" }}
              >
                Превышен лимит туристов
              </Typography>
            )}
          </Stack>
        </Stack>
        <Box
          sx={{
            width: "380px",
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
              ? (dayjs(selectedDate?.date?.from).format("D MMMM YYYY") ?? "") +
                " - " +
                (dayjs(selectedDate?.date?.to).format("D MMMM YYYY") ?? "")
              : ""}
          </Typography>
          <Typography variant={"h5"} mt={2}>
            {selectedDate?.price ?? 0}₽
          </Typography>
          <Typography variant={"caption"}>
            Оплатить бронирование необходимо в течение 3 часов
          </Typography>
          {isFirstPage ? (
            <Button
              variant={"contained"}
              sx={{ marginTop: 1 }}
              onClick={() => {
                setPage((page: tourStepsMap) => (page < 2 ? page + 1 : page));
              }}
            >
              Забронировать
            </Button>
          ) : (
            <Stack direction={"row"} gap={2}>
              <Button
                onClick={() => {
                  booking(true, bookingData, undefined);
                }}
              >
                Оплатить
              </Button>
              <Button
                onClick={() => {
                  booking(false, bookingData, undefined);
                }}
              >
                Оплатить потом
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
    </LocalizationProvider>
  );
};
