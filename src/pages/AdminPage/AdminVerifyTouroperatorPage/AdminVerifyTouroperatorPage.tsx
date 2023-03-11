import { useEffect, useState } from "react";
import { ICreatorList } from "../../../models/adminModels/ICreatorList";
import {
  getCreatorList,
  userBan,
  verifyCreator,
} from "../../../submitFunctions/adminAPI";

export const AdminVerifyTouroperatorPage = () => {
  const [CreatorList, SetCreatorList] = useState<ICreatorList[]>();

  useEffect(() => {
    getCreatorList((value) => SetCreatorList(value), undefined, true);
  }, []);
  console.log(CreatorList);

  const [UserBan, SetUserBan] = useState<string>();
  const banClick = (operatorId: string) => {
    userBan((value) => SetUserBan(value), operatorId, undefined, true);
  };

  const [VerifyUser, SetVerifyUser] = useState<string>();
  const verifyClick = (operatorId: string) => {
    verifyCreator((value) => SetVerifyUser(value), operatorId, undefined, true);
  };
  return (
    <>
      <h1>Управление доступом туристов</h1>
      <input type="button" onClick={() => banClick("1")} value="BAN!!!" />
      <h5>{UserBan}</h5>
      <input type="button" onClick={() => verifyClick("2")} value="Verify" />
      <h5>{VerifyUser}</h5>
    </>
  );
};
