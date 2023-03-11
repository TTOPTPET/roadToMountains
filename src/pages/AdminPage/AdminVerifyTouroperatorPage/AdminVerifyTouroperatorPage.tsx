import { useEffect, useState } from "react";
import { ICreatorList } from "../../../models/adminModels/ICreatorList";
import {
  getCreatorList,
  userBan,
  verifyCreator,
} from "../../../submitFunctions/adminAPI";

export const AdminVerifyTouroperatorPage = () => {
  const [creatorList, setCreatorList] = useState<ICreatorList[]>([]);
  const [userBanId, setUserBan] = useState<string>();
  const [verifyUser, setVerifyUser] = useState<string>();

  useEffect(() => {
    getCreatorList((value) => setCreatorList(value), undefined, true);
    console.log(creatorList);
  }, [creatorList]);

  const banClick = (operatorId: string) => {
    userBan((value) => setUserBan(value), operatorId, undefined, true);
  };

  const verifyClick = (operatorId: string) => {
    verifyCreator((value) => setVerifyUser(value), operatorId, undefined, true);
  };

  return (
    <>
      <h1>Управление доступом туристов</h1>
      <input type="button" onClick={() => banClick("1")} value="BAN!!!" />
      <h5>{userBanId}</h5>
      <input type="button" onClick={() => verifyClick("2")} value="Verify" />
      <h5>{verifyUser}</h5>
    </>
  );
};
