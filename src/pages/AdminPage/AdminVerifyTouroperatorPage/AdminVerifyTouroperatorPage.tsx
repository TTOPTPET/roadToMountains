import { useEffect, useState } from "react";
import { ICreatorList } from "../../../models/adminModels/ICreatorList";
import { getCreatorList } from "../../../API/adminAPI";
import { Stack } from "@mui/material";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";

export const AdminVerifyTouroperatorPage = () => {
  const [creatorList, setCreatorList] = useState<ICreatorList[]>([]);

  useEffect(() => {
    getCreatorList((value) => setCreatorList(value), undefined, false);
  }, []);

  return (
    <Stack padding={1} gap={1}>
      {creatorList &&
        creatorList.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "creator" }}
            arrayProps={creatorList}
            setProps={setCreatorList}
          />
        ))}
    </Stack>
  );
};
