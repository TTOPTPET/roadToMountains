import { useEffect, useState } from "react";
import { IUserMessage } from "../../../models/adminModels/IUsersMessage";
import {
  getUserMessages,
  changeMessageStatus,
} from "../../../submitFunctions/adminAPI";
import { IChangeStatus } from "../../../models/adminModels/IChangeStatus";

export const AdminMessagesPage = () => {
  const [userMessages, setUserMessages] = useState<IUserMessage[]>([]);
  const [messageStatus, setMessageStatus] = useState<IChangeStatus>();
  useEffect(() => {
    getUserMessages((value) => setUserMessages(value), undefined, true);
    console.log(userMessages);
  }, [userMessages]);

  const handlerChangeStatusClick = (message: IChangeStatus) => {
    changeMessageStatus(
      (value) => setMessageStatus(value),
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
        onClick={() => handlerChangeStatusClick(message)}
        value="CHANGE STATUS"
      />
      <h5>{messageStatus?.messageId}</h5>
      <h5>{messageStatus?.statusMessage}</h5>
    </>
  );
};
