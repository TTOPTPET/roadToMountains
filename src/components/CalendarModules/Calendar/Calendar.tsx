import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import { useState, useEffect } from "react";

type Props = {
  viewMonth: Dayjs;
};

export const Calendar = ({ viewMonth }: Props) => {
  return (
    <Paper variant="whiteBlue" sx={{ width: "100%", height: "65vh" }}>
      <Grid container columns={21} sx={{ height: "100%" }}>
        <Grid container item xs={12} sx={{ height: "10%" }}>
          {[
            { name: "ПН" },
            { name: "ВТ" },
            { name: "СР" },
            { name: "ЧТ" },
            { name: "ПТ" },
            { name: "СБ" },
            { name: "ВС" },
          ].map((_, index) => (
            <Grid item key={index} xs>
              <Box
                sx={{
                  height: "100%",
                  borderRight: index === 6 ? "none" : "1px solid #154162",
                  borderBottom: "1px solid #154162",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Typography variant={"h5"} align={"center"}>
                  {_.name}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
        {[...Array(35)].map((_, index) => (
          <Grid item key={index} xs={3} sx={{ height: "16%" }}>
            <Box
              sx={{
                height: "100%",
                borderRight:
                  (index + 1) % 7 === 0 ? "none" : "1px solid #154162",
                borderBottom: "1px solid #154162",
                position: "relative",
              }}
            >
              <Typography
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  opacity:
                    calcDayIndex(viewMonth).add(index, "day").month() !==
                      viewMonth.month() && 0.6,
                }}
              >
                {calcDayIndex(viewMonth).add(index, "day").format("D")}
              </Typography>
            </Box>
          </Grid>
        ))}
        <Grid container item xs={12} sx={{ height: "10%" }}>
          {[...Array(7)].map((_, index) => (
            <Grid item key={index} xs>
              <Box
                sx={{
                  height: "100%",
                  borderRight: index === 6 ? "none" : "1px solid #154162",
                }}
              ></Box>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Paper>
  );
};

const calcDayIndex = (monthDate: Dayjs) => {
  const fixWeekIndex = (index: number) => {
    return index === 0 ? 7 : index - 1;
  };

  return monthDate
    .date(1)
    .subtract(fixWeekIndex(monthDate.date(1).day()), "day");
};
