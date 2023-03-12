import { useEffect, useState } from "react";
import { ICreatorList } from "../../../models/adminModels/ICreatorList";
import { getCreatorList } from "../../../submitFunctions/adminAPI";
import { Stack } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";

export const AdminVerifyTouroperatorPage = () => {
  const [creatorList, setCreatorList] = useState<ICreatorList[]>([]);

  useEffect(() => {
    getCreatorList((value) => setCreatorList(value), undefined, true);
  }, []);

  return (
    <Stack padding={1} gap={1}>
      {creatorList &&
        creatorList.map((item, index) => (
          <AdminComponent type="creator" {...item} key={index} />
        ))}
    </Stack>
  );
};
