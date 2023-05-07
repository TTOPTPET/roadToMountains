import { Stack, Typography, TextField, Box, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FC, Dispatch, SetStateAction, useState } from "react";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange, DateRangePicker } from "react-date-range";
import { tourStepsMap } from "../../../pages/TourPage/TourPage";
import * as locales from "react-date-range/dist/locale";
import { registrateTour } from "../../../API/touristAPI/registrateTour";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

interface ITourBookingProps {
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  setPage: (prop: any) => void;
  isFirstPage: boolean;
}

interface typicalDate {
  date: {
    from: string;
    to: string;
  };
}

const dateRangeDefault: typicalDate[] = [
  {
    date: {
      from: dayjs(new Date()).toDate().toString(),
      to: dayjs(new Date()).add(4, "day").toDate().toString(),
    },
  },
  {
    date: {
      from: dayjs(new Date()).add(8, "day").toDate().toString(),
      to: dayjs(new Date()).add(15, "day").toDate().toString(),
    },
  },
  {
    date: {
      from: dayjs(new Date()).add(17, "day").toDate().toString(),
      to: dayjs(new Date()).add(28, "day").toDate().toString(),
    },
  },
];

const handlerDateConverter = () => {
  return [
    ...dateRangeDefault.map((item, index) => ({
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
  isFirstPage,
}) => {
  const [datePickerValue, setDatePickerValue] = useState(
    handlerDateConverter()
  );

  const dateValidation = (value: string) => {
    dateRangeDefault.forEach((item, index) => {
      const fsaf: boolean = dayjs(value).isBetween(
        dayjs(item.date.from),
        dayjs(item.date.to),
        null,
        "[]"
      );
      if (fsaf) {
        setBookingData({
          ...bookingData,
          tourDate: {
            from: dayjs(item.date.from).toISOString(),
            to: dayjs(item.date.to).toISOString(),
          },
        });
      }
    });
  };
  console.log(bookingData);
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

              dateValidation(item[selectionName[0]].endDate.toString());
            }}
            moveRangeOnFirstSelection={false}
            ranges={
              datePickerValue
                ? [
                    ...datePickerValue.map(
                      (item, index) => item["selection" + index]
                    ),
                  ]
                : []
            }
          />
        </div>
        <Stack direction={"column"} gap={2} mt={5}>
          <DatePicker
            value={dayjs(bookingData.tourDate.from)}
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
            value={dayjs(bookingData.tourDate.to)}
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
              InputProps={{ inputProps: { min: 0 } }}
              value={bookingData?.size || undefined}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  size: +e.target.value,
                })
              }
            />
            <Typography variant={"caption"}>Мест свободно: {8}</Typography>
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
              <Button>Оплатить</Button>
              <Button
                onClick={() => {
                  registrateTour(false, bookingData, undefined);
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
