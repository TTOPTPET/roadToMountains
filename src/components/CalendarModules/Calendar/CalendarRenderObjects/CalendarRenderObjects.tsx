import dayjs, { Dayjs } from "dayjs";
import { IPublicTour } from "../../../../models/calendarModels/IPublicTour";
import { useState, useEffect } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
} from "../../../../config/MUI/color/color";

type Props = { publicTour: IPublicTour[]; date: Dayjs };

export default function CalendarRenderObjects({ publicTour, date }: Props) {
  // useEffect(() => {
  //   publicTour.forEach((tour) => {
  //     if (date.isBetween(tour.tourDate.from, tour.tourDate.to, "date", "[]")) {
  //       setToursThisDay((tours) =>
  //         tours
  //           .concat(tour)
  //           .sort(
  //             (tour1, tour2) =>
  //               dayjs(tour1.tourDate.from).unix() -
  //               dayjs(tour2.tourDate.from).unix()
  //           )
  //       );
  //     } else if(dayjs(tour.tourDate.from).isAfter()){false}
  //   });
  //   return () => {
  //     setToursThisDay([]);
  //   };
  // }, [publicTour, date]);

  return (
    <Box
      key={date.toString()}
      sx={{
        position: "absolute",
        top: "32px",
        left: 0,
        width: "calc(100% + 2px)",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {publicTour.map((tour) => {
        if (
          date.isBetween(tour.tourDate.from, tour.tourDate.to, "date", "[]")
        ) {
          return (
            <Box
              sx={{
                borderTopLeftRadius:
                  date.isSame(tour.tourDate.from, "D") && "10px",
                borderBottomLeftRadius:
                  date.isSame(tour.tourDate.from, "D") && "10px",
                borderTopRightRadius:
                  date.isSame(tour.tourDate.to, "D") && "10px",
                borderBottomRightRadius:
                  date.isSame(tour.tourDate.to, "D") && "10px",
                backgroundColor: darkTurquoiseColor,
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
                  }}
                >
                  {tour.tour.tourName}
                </Typography>
              )}
            </Box>
          );
        } else {
          return (
            <Box
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
