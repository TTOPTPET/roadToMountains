import {
  Stack,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Skeleton,
  Box,
} from "@mui/material";
import dayjs from "dayjs";
import { FC, Dispatch, SetStateAction } from "react";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";
import { TourDetailsType } from "./tourDetailsType/tourDetailsType";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import MapLeaflet from "../../MapLeaflet/MapLeaflet";
import { IUserRecord } from "../../../models/userModels/IUserRecord";

interface ITourDetailsProps {
  record: TourDetailsType;
  bookingData?: ITourBooking;
  selectedDate?: ITourBookingDate;
  records?: IUserRecord[];
  setRecords?: Dispatch<SetStateAction<IUserRecord[]>>;
}

export const TourDetails: FC<ITourDetailsProps> = ({
  record,
  bookingData,
  selectedDate,
  records,
  setRecords,
}) => {
  const dispatch = useDispatch();

  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const freeTagConverter = (recordValue: TourDetailsType) => {
    switch (recordValue.type) {
      case "record":
        if (
          Object.values(recordValue.tour?.freeServices).every(
            (item) => item === "" || undefined
          )
        ) {
          return "Ничего не включено";
        }
        return recordValue.tour?.freeServices
          ? recordValue.tour?.freeServices.map((service, index) =>
              index === recordValue.tour?.freeServices.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      case "tourInfo":
        if (
          Object.values(recordValue?.tourServices?.freeServices).every(
            (item) => item === "" || undefined
          )
        ) {
          return "Ничего не включено";
        }
        return recordValue?.tourServices?.freeServices
          ? recordValue?.tourServices?.freeServices.map((service, index) =>
              index === recordValue?.tourServices?.freeServices.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
    }
  };

  const housingIncludeConverter = (housingInclude: {
    housingName: string;
    housingAddress: string;
    housingDescription?: string;
  }): string => {
    if (housingInclude) {
      if (Object.values(housingInclude).every((item) => item === "")) {
        return "Проживание не включено";
      } else {
        let housingLabel = "";
        Object.values(housingInclude)
          .filter((item) => item !== "" || undefined)
          .forEach((item, index) => {
            if (index === Object.values(housingInclude).length - 1) {
              housingLabel += item;
              return;
            }
            housingLabel += item + ", ";
          });
        return housingLabel;
      }
    } else {
      return "";
    }
  };
  switch (record.type) {
    case "record":
      return (
        <Stack padding={lessThenSmall ? 1 : 3} gap={1}>
          <Stack
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            alignItems={"center"}
            direction={"row"}
          >
            <Typography variant={"h6"}>Количество человек</Typography>
            {!lessThenSmall && (
              <Button
                disabled={
                  dayjs(record.tourDate.from).subtract(1, "day") < dayjs()
                }
                onClick={() =>
                  dispatch(
                    setModalActive("confirmCancelBooking", {
                      bookingId: record.bookingId,
                      records: records,
                      setRecords: setRecords,
                    })
                  )
                }
              >
                Отменить бронирование
              </Button>
            )}
          </Stack>
          <Stack
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            alignItems={"center"}
            direction={"row"}
          >
            <Typography variant={"caption"}>
              {record?.bookingNumber || 0} человека
            </Typography>
            {!lessThenSmall && (
              <Typography variant={"caption"}>
                до{" "}
                {dayjs(record.tourDate.from)
                  .subtract(1, "day")
                  .format("D MMMM YYYY")}
              </Typography>
            )}
          </Stack>
          <Typography variant={"h6"}>Проживание</Typography>
          <Typography variant={"caption"}>
            {housingIncludeConverter(record?.tour?.housingInclude)}
          </Typography>
          <Typography variant={"h6"}>Страхование</Typography>
          <Typography variant={"caption"}>
            {record.tour?.insuranceInclude !== undefined ? (
              <>Страхование включено</>
            ) : (
              <>Страхование не включено</>
            )}
          </Typography>
          <Typography variant={"h6"}>Контакты</Typography>
          <Stack
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            alignItems={"center"}
            direction={"row"}
          >
            <Typography variant={"caption"}>
              {record?.contactInformation || "Контакты не указаны"}
            </Typography>
            {!lessThenSmall && (
              <Button
                onClick={() => {
                  console.log(true);
                  dispatch(
                    setModalActive("errorReportModal", {
                      tour: true,
                      record: record,
                    })
                  );
                }}
              >
                Сообщить о проблеме
              </Button>
            )}
          </Stack>
          <Typography variant={"h6"}>Сбор</Typography>
          <Typography variant={"caption"}>
            {record.meetingPoint +
              " в " +
              dayjs(record.meetingTime).format("hh:mm D MMMM YYYY")}
          </Typography>
          <Typography variant={"h6"}>Включено в стоимость</Typography>
          <Typography variant={"caption"}>
            {freeTagConverter(record)}
          </Typography>
          {lessThenSmall && (
            <Stack width={"200px"} gap="5px" margin={"0 auto"}>
              <Button
                sx={{ width: "100%" }}
                onClick={() => {
                  console.log(true);
                  dispatch(
                    setModalActive("errorReportModal", {
                      tour: true,
                      record: record,
                    })
                  );
                }}
              >
                Сообщить о проблеме
              </Button>
              <Stack gap="3px" alignItems={"flex-end"}>
                <Button
                  sx={{ width: "100%" }}
                  disabled={
                    dayjs(record.tourDate.from).subtract(1, "day") < dayjs()
                  }
                  onClick={() =>
                    dispatch(
                      setModalActive("confirmCancelBooking", {
                        bookingId: record.bookingId,
                      })
                    )
                  }
                >
                  Отменить бронирование
                </Button>
                <Typography variant={"caption"}>
                  до{" "}
                  {dayjs(record.tourDate.from)
                    .subtract(1, "day")
                    .format("D MMMM YYYY")}
                </Typography>
              </Stack>
            </Stack>
          )}
          {record?.tour?.mapPoints && record?.tour?.mapPoints.length === 0 ? (
            <Box sx={{ width: "100%", position: "relative" }}>
              <Skeleton
                variant="rounded"
                height={"330px"}
                sx={{ borderRadius: "10px" }}
              />
              <Typography
                variant={"h4"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  textAlign: "center",
                  transform: "translatey(-50%) translatex(-50%)",
                  color: "rgba(0, 0, 0, 0.2)",
                  textTransform: "uppercase",
                }}
              >
                Маршрут не выбран
              </Typography>
            </Box>
          ) : (
            <MapLeaflet
              width={"100%"}
              height={"330px"}
              accessType="observe"
              mapCenter={
                record?.tour?.mapPoints ? record?.tour?.mapPoints[0] : undefined
              }
              positions={record?.tour?.mapPoints}
            />
          )}
        </Stack>
      );

    case "tourInfo":
      return (
        <Stack padding={lessThenSmall ? 1 : 3} gap={1}>
          <Typography variant={"h6"}>Количество человек</Typography>
          <Typography variant={"caption"}>
            {bookingData?.size} человека
          </Typography>
          <Typography variant={"h6"}>Проживание</Typography>
          <Typography variant={"caption"}>
            {housingIncludeConverter(record?.housingInclude)}
          </Typography>
          <Typography variant={"h6"}>Страхование</Typography>
          <Typography variant={"caption"}>
            {record?.insuranceInclude !== undefined ? (
              <>Страхование включено</>
            ) : (
              <>Страхование не включено</>
            )}
          </Typography>
          <Typography variant={"h6"}>Контакты</Typography>
          <Typography variant={"caption"}>
            {selectedDate?.contactInformation}
          </Typography>
          <Typography variant={"h6"}>Сбор</Typography>
          <Typography variant={"caption"}>
            {selectedDate?.meetingPoint +
              " " +
              dayjs(selectedDate?.meetingTime).format("D MMMM YYYY").toString()}
          </Typography>
          <Typography variant={"h6"}>Включено в стоимость</Typography>
          <Typography variant={"caption"}>
            {freeTagConverter(record)}
          </Typography>
          <Typography variant={"h5"}>Маршрут</Typography>
          {record?.mapPoints && record?.mapPoints.length === 0 ? (
            <Box sx={{ width: "100%", position: "relative" }}>
              <Skeleton
                variant="rounded"
                height={"330px"}
                sx={{ borderRadius: "10px" }}
              />
              <Typography
                variant={"h4"}
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  textAlign: "center",
                  transform: "translatey(-50%) translatex(-50%)",
                  color: "rgba(0, 0, 0, 0.2)",
                  textTransform: "uppercase",
                }}
              >
                Маршрут не выбран
              </Typography>
            </Box>
          ) : (
            <MapLeaflet
              width={"100%"}
              height={"330px"}
              accessType="observe"
              mapCenter={record?.mapPoints ? record?.mapPoints[0] : undefined}
              positions={record?.mapPoints}
            />
          )}
        </Stack>
      );
    default:
      return <></>;
  }
};
