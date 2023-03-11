import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import {
  getUserMessages,
  changeMessageStatus,
} from "../../../submitFunctions/adminAPI";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";

export const AdminMessagesPage = () => {
  const [UserMessages, SetUserMessages] = useState<IUserMessage[]>();
  useEffect(() => {
    getUserMessages((value) => SetUserMessages(value), undefined, true);
  }, []);

  console.log(UserMessages);
  const [MessageStatus, SetMessageStatus] = useState<IChangeStatus>();
  const changeStatusClick = (message: IChangeStatus) => {
    changeMessageStatus(
      (value) => SetMessageStatus(value),
      message,
      undefined,
      true
    );
  };
  const message: IChangeStatus = {
    messageId: "1",
    statusMessage: "ABOBA",
  };
  return (
    <>
      <h1>Сообщения от пользователей</h1>
      <input
        type="button"
        onClick={() => changeStatusClick(message)}
        value="CHANGE STATUS"
      />
      <h5>{MessageStatus?.messageId}</h5>
      <h5>{MessageStatus?.statusMessage}</h5>
    </>
  );
};
