import { useEffect, useState } from "react";
import { ITourList } from "../../../models/adminModels/ITourList";
import { getTourList } from "../../../submitFunctions/administrationAPI";

export const AdminAccessTourPage = () => {
  const [TourList, SetTourList] = useState<ITourList[]>();

  useEffect(() => {
    getTourList((value) => SetTourList(value), undefined, true);
  }, []);
  console.log(TourList);
  return <>Управление доступом к турам</>;
};
