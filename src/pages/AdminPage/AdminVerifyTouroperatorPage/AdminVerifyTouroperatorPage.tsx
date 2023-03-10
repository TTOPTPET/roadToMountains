import { useEffect, useState } from "react";
import { ICreatorList } from "../../../models/adminModels/ICreatorList";
import { getCreatorList } from "../../../submitFunctions/administrationAPI";

export const AdminVerifyTouroperatorPage = () => {
  const [CreatorList, SetCreatorList] = useState<ICreatorList[]>();

  useEffect(() => {
    getCreatorList((value) => SetCreatorList(value), undefined, true);
  }, []);
  console.log(CreatorList);
  return <>Управление верификациями туроператоров</>;
};
