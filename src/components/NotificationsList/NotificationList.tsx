import { Stack } from "@mui/system";
import { useState, useEffect } from "react";
import { INotification } from "../../models/notificationModels/INotification";
import { getNotifications } from "../../API/notificationAPI/getNotifications";
import { Notification } from "./Notification/Notification";

export const NotificationList = () => {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  useEffect(() => {
    getNotifications((value) => setNotifications(value), undefined, true);
  }, []);

  return (
    <Stack width={"100%"} gap={3} marginTop={5}>
      {notifications &&
        notifications.map((notification, index) => (
          <Notification key={index} {...notification} />
        ))}
    </Stack>
  );
};
