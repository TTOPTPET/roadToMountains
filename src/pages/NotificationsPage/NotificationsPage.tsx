import { Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NotificationList } from "../../components/NotificationsList/NotificationList";
import { getNotifications } from "../../API/notificationAPI/getNotifications";
import { INotification } from "../../models/notificationModels/INotification";

function NotificationsPage() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    getNotifications((value) => setNotifications(value), undefined, false);
  }, []);

  return (
    <Stack mt={5}>
      <Typography variant={"h3"}>Уведомления</Typography>
      <NotificationList notifications={notifications} />
    </Stack>
  );
}

export default NotificationsPage;
