import { useEffect, useState } from "react";
import { ITouristList } from "../../../models/adminModels/ITouristList";
import { getTouristList, userBan } from "../../../submitFunctions/adminAPI";

export const AdminAccessTouristPage = () => {
  const [TouristList, SetTouristList] = useState<ITouristList[]>();

  useEffect(() => {
    getTouristList((value) => SetTouristList(value), undefined, true);
  }, []);
  console.log(TouristList);

  const [UserBan, SetUserBan] = useState<string>();
  const banClick = (touristId: string) => {
    userBan((value) => SetUserBan(value), touristId, undefined, true);
  };
  return (
    <>
      <h1>Управление доступом туристов</h1>
      <input type="button" onClick={() => banClick("1")} value="BAN!!!" />
      <h5>{UserBan}</h5>
    </>
  );
};
