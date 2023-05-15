import dayjs, { Dayjs } from "dayjs";
import { IPublicTour } from "../../../../models/calendarModels/IPublicTour";
import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { Box, Paper, Typography } from "@mui/material";
import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
} from "../../../../config/MUI/color/color";
import { INewPublic } from "../../../../models/calendarModels/INewPublic";
import { setModalActive } from "../../../../redux/Modal/ModalReducer";
import { useDispatch } from "react-redux";

type Props = {
  publicTour: IPublicTour[];
  date: Dayjs;
  setNewPublic: Dispatch<SetStateAction<INewPublic>>;
};

export default function CalendarRenderObjects({
  publicTour,
  date,
  setNewPublic,
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
      {publicTour.map((tour) => {
        if (
          date.isBetween(tour.tourDate.from, tour.tourDate.to, "date", "[]")
        ) {
          return (
            <Box
              onClick={(e) => {
                e.stopPropagation();
                setNewPublic(tour as INewPublic);
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
