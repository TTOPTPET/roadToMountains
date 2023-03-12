import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { getUserMessages } from "../../../submitFunctions/adminAPI";
import { Stack } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";

export const AdminMessagesPage = () => {
  const [userMessages, setUserMessages] = useState<IUserMessage[]>([]);

  useEffect(() => {
    getUserMessages((value) => setUserMessages(value), undefined, true);
    console.log(userMessages);
  }, [userMessages]);

  return (
    <Stack padding={1} gap={1}>
      {userMessages &&
        userMessages.map((item, index) => (
          <AdminComponent type="message" {...item} key={index} />
        ))}
    </Stack>
  );
};
