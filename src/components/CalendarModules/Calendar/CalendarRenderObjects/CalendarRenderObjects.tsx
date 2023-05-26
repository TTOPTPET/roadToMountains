import dayjs, { Dayjs } from "dayjs";
import { IPublicTour } from "../../../../models/calendarModels/IPublicTour";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
} from "../../../../config/MUI/color/color";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { is } from "date-fns/locale";
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

type Props = {
  publicTours: IPublicTour[];
  date: Dayjs;
  selectedPublic: IPublicTour;
  setSelectedPublic: Dispatch<SetStateAction<IPublicTour>>;
};

export default function CalendarRenderObjects({
  publicTours,
  date,
  selectedPublic,
  setSelectedPublic,
}: Props) {
  return (
    <Box
      key={date.toString()}
      sx={{
        position: "absolute",
        top: 0,
        pt: "32px",
        left: 0,
        width: "calc(100% + 2px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {publicTours.map((tour) => {
        if (
          date.isBetween(tour.tourDate.from, tour.tourDate.to, "date", "[]")
        ) {
          return (
            <Box
              className={tour.tour.tourName}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPublic(tour);
              }}
              sx={{
                borderTopLeftRadius:
                  date.isSame(tour.tourDate.from, "D") && "10px",
                borderBottomLeftRadius:
                  date.isSame(tour.tourDate.from, "D") && "10px",
                borderTopRightRadius:
                  date.isSame(tour.tourDate.to, "D") && "10px",
                borderBottomRightRadius:
                  date.isSame(tour.tourDate.to, "D") && "10px",
                backgroundColor:
                  selectedPublic?.publicTourId === tour?.publicTourId
                    ? "#00c7f6"
                    : darkTurquoiseColor,
                width: "100%",
                height: "17px",
                marginBottom: "2px",
              }}
            >
              {date.isSame(tour.tourDate.from, "D") && (
                <Typography
                  sx={{
                    position: "absolute",
                    left: "15px",
                    fontSize: "14px",
                    lineHeight: "100%",
                    color: "#ffffff",
                    zIndex: 100,
                    paddingTop: "1px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tour?.tour?.tourName}
                </Typography>
              )}
            </Box>
          );
        } else if (
          publicTours.some(
            (someTour) =>
              dayjs(someTour?.tourDate?.from).isSameOrAfter(
                tour?.tourDate?.from
              ) && dayjs(someTour?.tourDate?.from).isBefore(tour?.tourDate?.to)
          )
        ) {
          return (
            <Box
              className={tour.tour.tourName}
              sx={{
                width: "100%",
                height: "17px",
                marginBottom: "2px",
              }}
            ></Box>
          );
        }
      })}
    </Box>
  );
}

// const recursiveCollisionSearch = (publicTours, tourForCheck, date) => {
//   return publicTours.some((someTour) => {
//     if (
//       dayjs(someTour?.tourDate?.from).isSameOrBefore(
//         tourForCheck?.tourDate?.to
//       ) &&
//       dayjs(someTour?.tourDate?.to).isSameOrAfter(
//         tourForCheck?.tourDate?.from
//       ) &&
//       someTour.tourId !== tourForCheck.tourId &&
//       date.isBetween(someTour.tourDate.from, someTour.tourDate.to, "date", "[]")
//     ) {
//       return true;
//     } else if (
//       dayjs(someTour?.tourDate?.from).isSameOrBefore(
//         tourForCheck?.tourDate?.to
//       ) &&
//       dayjs(someTour?.tourDate?.to).isSameOrAfter(
//         tourForCheck?.tourDate?.from
//       ) &&
//       someTour.tourId !== tourForCheck.tourId
//     ) {
//       recursiveCollisionSearch(
//         publicTours.filter((tour) => tour.tourId !== tourForCheck.tourId),
//         someTour,
//         date
//       );
//     } else {
//       return false;
//     }
//   });
// };
