import { Grid, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import dayjs from "dayjs";
import { INotification } from "../../../models/notificationModels/INotification";
import { whiteColor } from "../../../config/MUI/color/color";

export const Notification = (notification: INotification) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ backgroundColor: whiteColor }}>
        <Grid container justifyContent={"space-between"} padding={1}>
          <Grid item md={3.5}>
            <Typography variant={"h5"}>
              {(notification?.notifData?.tour?.tourName ?? "Название тура") +
                " №" +
                (notification?.notifData?.bookingId ?? "0")}
            </Typography>
            <Typography variant={"caption"} mt={2}>
              {notification?.notifData?.paymentStatus ?? "Бронирование"}
            </Typography>
          </Grid>
          <Grid item md={2.5}>
            <Typography variant={"caption"}>
              {dayjs(notification?.notifData?.tour?.tourDate?.from).format(
                "D MMMM YYYY"
              ) +
                " - " +
                dayjs(notification?.notifData?.tour?.tourDate?.to).format(
                  "D MMMM YYYY"
                )}
            </Typography>
          </Grid>
          <Grid item md={1.5}>
            <Typography variant={"caption"}>
              {dayjs(notification?.createAt).format("D MMM YYYY")}
            </Typography>
            <Typography variant={"button"} mt={2}>
              {(notification?.notifData?.amount ?? 0) + "₽"}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};
