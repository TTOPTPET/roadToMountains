import { useEffect, useState } from "react";
import { ITouristList } from "../../../models/adminModels/ITouristList";
import { getTouristList } from "../../../API/adminAPI";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";
import { Stack } from "@mui/material";

export const AdminAccessTouristPage = () => {
  const [touristList, setTouristList] = useState<ITouristList[]>();

  useEffect(() => {
    getTouristList((value) => setTouristList(value), undefined, false);
  }, []);

  return (
    <Stack padding={1} gap={1}>
      {touristList &&
        touristList.map((item, index) => (
          <AdminComponent
            key={index}
            props={{ ...item, type: "tourist" }}
            arrayProps={touristList}
            setProps={setTouristList}
          />
        ))}
    </Stack>
  );
};
