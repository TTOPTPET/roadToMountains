import { Stack } from "@mui/system";
import { INotification } from "../../models/notificationModels/INotification";
import { Notification } from "./Notification/Notification";

type Props = {
  notifications: INotification[];
};

export const NotificationList = ({ notifications }: Props) => {
  return (
    <Stack width={"100%"} gap={3} marginTop={5}>
      {notifications &&
        notifications.map((notification, index) => (
          <Notification key={index} {...notification} />
        ))}
    </Stack>
  );
};
