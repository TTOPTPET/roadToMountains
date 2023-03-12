import { useEffect, useState } from "react";
import { ITourList } from "../../../models/adminModels/ITourList";
import { getTourList } from "../../../submitFunctions/adminAPI";
import { AdminComponent } from "../../../components/Admin/AdminFabric/AdminFabric";
import { Stack } from "@mui/material";

export const AdminAccessTourPage = () => {
  const [tourList, setTourList] = useState<ITourList[]>();

  useEffect(() => {
    getTourList((value) => setTourList(value), undefined, true);
    console.log(tourList);
  }, [tourList]);

  return (
    <Stack padding={1} gap={1}>
      {tourList &&
        tourList.map((item, index) => (
          <AdminComponent type="tour" {...item} key={index} />
        ))}
    </Stack>
  );
};
