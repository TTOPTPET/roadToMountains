import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import { getUserMessages } from "../../../submitFunctions/adminAPI";

export const AdminMessagesPage = () => {
  const [UserMessages, SetUserMessages] = useState<IUserMessage[]>();
  useEffect(() => {
    getUserMessages((value) => SetUserMessages(value), undefined, true);
  }, []);

  console.log(UserMessages);
  return <>Сообщения от пользователей</>;
};
