import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React from "react";
import { NotificationList } from "../../components/NotificationsList/NotificationList";

function NotificationsPage() {
  return (
    <Stack mt={5}>
      <Typography variant={"h3"}>Уведомления</Typography>
      <NotificationList />
    </Stack>
  );
}

export default NotificationsPage;
