import { useEffect, useState } from "react";
import { IAdminList } from "../../../models/adminModels/IAdminList";
import { getAdminList } from "../../../API/adminAPI";
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
        adminList.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "admin" }}
            arrayProps={adminList}
            setProps={setAdminList}
          />
        ))}
    </Stack>
  );
};
