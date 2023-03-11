import { useEffect, useState } from "react";
import { ITouristList } from "../../../models/adminModels/ITouristList";
import { getTouristList, userBan } from "../../../submitFunctions/adminAPI";

export const AdminAccessTouristPage = () => {
  const [touristList, setTouristList] = useState<ITouristList[]>();
  const [userBanId, setUserBan] = useState<string>();

  useEffect(() => {
    getTouristList((value) => setTouristList(value), undefined, true);
    console.log(touristList);
  }, [touristList]);

  const handlerBanClick = (touristId: string) => {
    userBan((value) => setUserBan(value), touristId, undefined, true);
  };
  return (
    <>
      <h1>Управление доступом туристов</h1>
      <input
        type="button"
        onClick={() => handlerBanClick("1")}
        value="BAN!!!"
      />
      <h5>{userBanId}</h5>
    </>
  );
};
