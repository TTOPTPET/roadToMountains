import { useEffect, useState } from "react";
import { ITourList } from "../../../models/adminModels/ITourList";
import { getTourList, tourBan } from "../../../submitFunctions/adminAPI";

export const AdminAccessTourPage = () => {
  const [tourList, setTourList] = useState<ITourList[]>();
  const [tourBanId, setTourBan] = useState<string>();

  useEffect(() => {
    getTourList((value) => setTourList(value), undefined, true);
    console.log(tourList);
  }, [tourList]);

  const banClick = (touristId: string) => {
    tourBan((value) => setTourBan(value), touristId, undefined, true);
  };
  return (
    <>
      <h1>Управление доступом к турам</h1>
      <input type="button" onClick={() => banClick("1")} value="BAN!!!" />
      <h5>{tourBanId}</h5>
    </>
  );
};
