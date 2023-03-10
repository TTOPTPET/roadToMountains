import { useEffect, useState } from "react";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { getAdminList } from "../../../submitFunctions/adminAPI";

export const AdminConfirmAdminPage = () => {
  const [AdminList, SetAdminList] = useState<IAdminList[]>();
  useEffect(() => {
    getAdminList((value) => SetAdminList(value), undefined, true);
  });

  console.log(AdminList);
  return <>Подтверждение регистрации администраторов</>;
};
