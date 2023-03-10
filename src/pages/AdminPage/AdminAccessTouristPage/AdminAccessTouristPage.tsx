import { useEffect, useState } from "react";
import { ITouristList } from "../../../models/adminModels/ITouristList";
import { getTouristList } from "../../../submitFunctions/adminAPI";

export const AdminAccessTouristPage = () => {
  const [TouristList, SetTouristList] = useState<ITouristList[]>();

  useEffect(() => {
    getTouristList((value) => SetTouristList(value), undefined, true);
  }, []);
  console.log(TouristList);
  return <>Управление доступом туристов</>;
};
