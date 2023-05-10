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
  const [toursThisDay, setToursThisDay] = useState<IPublicTour[]>([]);

  useEffect(() => {
    publicTour.forEach((tour) => {
      if (date.isBetween(tour.tourDate.from, tour.tourDate.to, "date", "[]")) {
        setToursThisDay((tours) => tours.concat(tour));
      }
    });
    return () => {
      setToursThisDay([]);
    };
  }, [publicTour, date]);

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
      {toursThisDay.map((tour) => (
        <>
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
          ></Box>
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
        </>
      ))}
    </Box>
  );
}
