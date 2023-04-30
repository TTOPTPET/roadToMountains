import { Stack, Typography, Button } from "@mui/material";
import dayjs from "dayjs";
import { FC } from "react";
import { TourDetailsType } from "./tourDetailsType/tourDetailsType";

interface ITourDetailsProps {
  record: TourDetailsType;
}

export const TourDetails: FC<ITourDetailsProps> = ({ record }) => {
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
            <Button>Отменить бронирование</Button>
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
            {(record.tour?.housingInclude.housingName ?? "") +
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
            {record.meetingPoint + " в " + record.meetingTime}
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
          <Typography variant={"caption"}>3 человека</Typography>
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
            {/* {record.contactInformation} */ "контакты"}
          </Typography>
          <Typography variant={"h6"}>Сбор</Typography>
          <Typography variant={"caption"}>
            {
              /* {record.meetingPoint + " в " + record.meetingTime} */ "точка сбора"
            }
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
