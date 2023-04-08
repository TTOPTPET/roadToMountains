import { Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";
import { getPublicTours } from "../../submitFunctions/calendarAPI/getPublicTours";
import { CalendarSidebar } from "./CalendarSidebar/CalendarSidebar";

export const Calendar = () => {
  const [publicTour, setPublicTour] = useState<IPublicTour[]>([]);
  useEffect(() => {
    getPublicTours(
      { calendarDate: "2018-04-04T16:00:00.000Z" },
      (value) => setPublicTour(value),
      undefined,
      true
    );
  });
  return (
    <div>
      <Grid container>
        <Grid item md={8}></Grid>
        <Grid item md={4}>
          <CalendarSidebar {...publicTour[0]} />
          {/* Это говнище будет работать по клику, так что потом просто логику малесь переделать */}
        </Grid>
      </Grid>
    </div>
  );
};
