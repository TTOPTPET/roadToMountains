import {
  Stack,
  Typography,
  TextField,
  Box,
  Button,
  Skeleton,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { FC, Dispatch, SetStateAction, useState, useEffect, memo } from "react";
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
import SuccessPayModal from "../../Modals/SuccessPayModal/SuccessPayModal";
import SuccessBookingModal from "../../Modals/SuccessBookingModal/SuccessBookingModal";
import ErrorBookingModal from "../../Modals/ErrorBookingModal/ErrorBookingModal";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";
import { REFRESH_TOKEN, TOKEN } from "../../../config/types";
import { useCookies } from "react-cookie";
import NoLoginModal from "../../Modals/NoLoginModal/NoLoginModal";

import "./DateRange.css";

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
  setError: Dispatch<SetStateAction<boolean>>;
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
  setError,
}) => {
  const [datePickerValue, setDatePickerValue] = useState(
    handlerDateConverter(bookingDate)
  );

  const theme = useTheme();

  const lessThenBig = useMediaQuery(theme.breakpoints.down("lg"));
  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const [cookies] = useCookies([TOKEN, REFRESH_TOKEN]);

  const dispatch = useDispatch();

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
  }, [bookingData?.size, selectedDate?.bookingNumber, setBookingData]);

  useEffect(() => {
    if (bookingDate.length) {
      setDatePickerValue(handlerDateConverter(bookingDate));
      setSelectedDate(
        bookingDate.reduce(
          (a, b) =>
            Number(dayjs(a?.date?.from).toDate()) - Number(new Date()) <
            Number(dayjs(b?.date?.from).toDate()) - Number(new Date())
              ? a
              : b,
          bookingDate[0]
        )
      );
    }
  }, [bookingDate, setSelectedDate]);

  const dateValidation = (value: string) => {
    bookingDate.forEach((item, index) => {
      const isDateEnd: boolean = dayjs(value).isBetween(
        dayjs(item.date.from),
        dayjs(item.date.to),
        "day",
        "[]"
      );
      if (isDateEnd) {
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

  const handlerPurchaseClick = (momentPay: boolean) => {
    booking(
      momentPay,
      bookingData,
      (data) => {
        if (momentPay) {
          dispatch(setModalActive("successPayModal"));
        } else {
          dispatch(
            setModalActive("successBookingModal", {
              paymentDeadline: data?.paymentDeadline,
            })
          );
        }
      },
      () => {
        dispatch(setModalActive("errorBookingModal"));
        setError(true);
      }
    );
  };

  const DatePickerMemo = memo(() => {
    return (
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
          console.log(selectionName);
          dateValidation(item[selectionName[0]].endDate.toString());
        }}
        moveRangeOnFirstSelection={false}
        ranges={[
          ...datePickerValue.map((item, index) => item["selection" + index]),
        ]}
      />
    );
  });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Stack
        direction={"row"}
        // gap={10}
        flexWrap={"wrap"}
        alignItems={"start"}
        mt={5}
        justifyContent={"space-between"}
      >
        <div className="customDatePickerWidth">
          {datePickerValue.length !== 0 ? (
            <DatePickerMemo />
          ) : (
            <Skeleton
              width={330}
              height={310}
              animation={"wave"}
              variant={"rounded"}
            />
          )}
        </div>
        <Stack direction={"column"} gap={2} mt={"15px"}>
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
                  label: "Дата заезда",
                }}
                sx={{
                  color: "black",
                  width: { lg: "300px", xs: "260px" },
                }}
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
                  label: "Дата выезда",
                }}
                sx={{ color: "black", width: { lg: "300px", xs: "260px" } }}
              />
            )}
          />
          <Stack direction={"column"}>
            <TextField
              label={"Количество человек"}
              type={"number"}
              InputProps={{ inputProps: { min: 0, max: 50 } }}
              error={errSize}
              sx={{ width: { lg: "300px", xs: "260px" } }}
              value={bookingData?.size || undefined}
              onChange={(e) =>
                setBookingData({
                  ...bookingData,
                  size: +e.target.value,
                })
              }
            />
            <Typography
              variant={"caption"}
              fontSize={
                lessThenSmall
                  ? "11px"
                  : lessThenBig
                  ? "14px !important"
                  : "16px"
              }
              sx={{ m: "7px 15px 0" }}
            >
              Мест свободно: {selectedDate?.bookingNumber || 0}
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
            width: { lg: "380px", md: "268px", sm: "100%", xs: "260px" },
            height: { lg: "270px", md: "190px", xs: "170px" },
            backgroundColor: lightTurquoiseColor,
            borderRadius: 5,
            mt: "15px",
          }}
          padding={{ lg: "30px", md: "30px", xs: "20px" }}
        >
          <Typography variant={"h5"}>
            {tourInfo?.tourName || "Название тура"}
          </Typography>
          <Typography variant={"caption"}>
            {"nearestDate" in tourInfo
              ? (dayjs(selectedDate?.date?.from).format("D MMMM YYYY") || "") +
                " - " +
                (dayjs(selectedDate?.date?.to).format("D MMMM YYYY") || "")
              : ""}
          </Typography>
          <Typography variant={"h5"} mt={2}>
            {bookingData?.tourAmount || 0}₽
          </Typography>
          <Typography variant={"caption"}>
            Оплатить бронирование необходимо в течение 3 часов
          </Typography>
          {isFirstPage ? (
            <Button
              variant={"contained"}
              sx={{ marginTop: 1 }}
              onClick={() => {
                cookies.REFRESH_TOKEN && cookies.TOKEN
                  ? setPage((page: tourStepsMap) =>
                      page < 2 ? page + 1 : page
                    )
                  : dispatch(setModalActive("noLoginModal"));
              }}
            >
              Забронировать
            </Button>
          ) : (
            <Stack direction={"row"} gap={2}>
              <Button onClick={() => handlerPurchaseClick(true)}>
                Оплатить
              </Button>
              <Button onClick={() => handlerPurchaseClick(false)}>
                Оплатить потом
              </Button>
            </Stack>
          )}
        </Box>
      </Stack>
      <SuccessPayModal meetingTime={selectedDate?.meetingTime} />
      <SuccessBookingModal />
      <ErrorBookingModal />
      <NoLoginModal />
    </LocalizationProvider>
  );
};
