import { Stack, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { cancelBooking } from "../../../API/touristAPI/cancelBooking";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";
import { TourDetailsType } from "./tourDetailsType/tourDetailsType";

interface ITourDetailsProps {
  record: TourDetailsType;
  bookingData?: ITourBooking;
  selectedDate?: ITourBookingDate;
}

export const TourDetails: FC<ITourDetailsProps> = ({
  record,
  bookingData,
  selectedDate,
}) => {
  console.log(record);
  const freeTagConverter = (recordValue: TourDetailsType) => {
    switch (recordValue.type) {
      case "record":
        return recordValue.tour?.freeServices
          ? recordValue.tour?.freeServices.map((service, index) =>
              index === recordValue.tour?.freeServices.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      case "tourInfo":
        return recordValue?.tourServices?.freeServices
          ? recordValue?.tourServices?.freeServices.map((service, index) =>
              index === recordValue?.tourServices?.freeServices.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
    }
  };
  switch (record.type) {
    case "record":
      return (
        <Stack padding={3} gap={1}>
          <Stack
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            alignItems={"center"}
            direction={"row"}
          >
            <Typography variant={"h6"}>Количество человек</Typography>
            <Button
              disabled={
                record.bookingStatus.past || record.bookingStatus.cancellation
                  ? true
                  : false
              }
              onClick={() => cancelBooking(record.bookingId, undefined)}
            >
              Отменить бронирование
            </Button>
          </Stack>
          <Stack
            justifyContent={"space-between"}
            flexWrap={"wrap"}
            alignItems={"center"}
            direction={"row"}
          >
            <Typography variant={"caption"}>
              {record?.bookingNumber ?? 0} человека
            </Typography>
            <Typography variant={"caption"}>
              до{" "}
              {dayjs(record.tourDate.from)
                .subtract(1, "day")
                .format("D MMMM YYYY")}
            </Typography>
          </Stack>
          <Typography variant={"h6"}>Проживание</Typography>
          <Typography variant={"caption"}>
            {record.tour?.housingInclude &&
              (record.tour?.housingInclude.housingName ?? "") +
                ", " +
                (record.tour?.housingInclude.housingAddress ?? "") +
                ", " +
                (record.tour?.housingInclude.housingDescription ?? "")}
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
              {record.contactInformation}
            </Typography>
            <Button>Сообщить о проблеме</Button>
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
        </Stack>
      );

    case "tourInfo":
      return (
        <Stack padding={3} gap={1}>
          <Typography variant={"h6"}>Количество человек</Typography>
          <Typography variant={"caption"}>
            {bookingData?.size} человека
          </Typography>
          <Typography variant={"h6"}>Проживание</Typography>
          <Typography variant={"caption"}>
            {(record?.housingInclude?.housingName ?? "Отель") +
              ", " +
              (record?.housingInclude?.housingAddress ?? "Адрес") +
              ", " +
              (record?.housingInclude?.housingDescription ?? "Описание")}
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
        </Stack>
      );
    default:
      return <></>;
  }
};
