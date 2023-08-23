import { Box, CircularProgress, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { NotificationList } from "../../components/NotificationsList/NotificationList";
import { getNotifications } from "../../API/notificationAPI/getNotifications";
import { INotification } from "../../models/notificationModels/INotification";

function NotificationsPage() {
  const [notifications, setNotifications] = useState<INotification[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getNotifications(
      (value) => {
        setNotifications(value);
        setLoading(false);
      },
      () => {
        setLoading(false);
      },
      false
    );
  }, []);

  return (
    <Stack mt={5}>
      <Typography variant={"h3"}>Уведомления</Typography>
      {loading ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            mt: "40px",
          }}
        >
          <CircularProgress size={"80px"} />
        </Box>
      ) : (
        <NotificationList notifications={notifications} />
      )}
    </Stack>
  );
}

export default NotificationsPage;
