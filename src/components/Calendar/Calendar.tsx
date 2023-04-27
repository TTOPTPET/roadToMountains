import { Box, Grid, Paper, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";

// const WeekNameNode = () => ();

// const DayNode = () => ();

export const Calendar = () => {
  return (
    <Paper variant="whiteBlue" sx={{ width: "100%", height: "100%" }}>
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
                style={{ position: "absolute", top: "10px", right: "10px" }}
              >
                {index + 1}
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
