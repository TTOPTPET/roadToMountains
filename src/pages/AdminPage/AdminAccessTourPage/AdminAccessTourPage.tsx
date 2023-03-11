import { useEffect, useState } from "react";
import { ITourList } from "../../../models/adminModels/ITourList";
import { getTourList, tourBan } from "../../../submitFunctions/adminAPI";

export const AdminAccessTourPage = () => {
  const [TourList, SetTourList] = useState<ITourList[]>();

  useEffect(() => {
    getTourList((value) => SetTourList(value), undefined, true);
  }, []);
  console.log(TourList);

  const [TourBan, SetTourBan] = useState<string>();
  const banClick = (touristId: string) => {
    tourBan((value) => SetTourBan(value), touristId, undefined, true);
  };
  return (
    <>
      <h1>Управление доступом к турам</h1>
      <input type="button" onClick={() => banClick("1")} value="BAN!!!" />
      <h5>{TourBan}</h5>
    </>
  );
};
