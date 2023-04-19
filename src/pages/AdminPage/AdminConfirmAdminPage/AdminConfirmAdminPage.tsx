import { useEffect, useState } from "react";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { getAdminList } from "../../../submitFunctions/adminAPI";
import { Stack } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";

export const AdminConfirmAdminPage = () => {
  const [adminList, setAdminList] = useState<IAdminList[]>();

  useEffect(() => {
    getAdminList((value) => setAdminList(value), undefined, false);
  }, []);

  return (
    <Stack padding={1} gap={1}>
      {adminList &&
        adminList.map((admin, index) => (
          <AdminComponent type="admin" {...admin} key={index} />
        ))}
    </Stack>
  );
};
