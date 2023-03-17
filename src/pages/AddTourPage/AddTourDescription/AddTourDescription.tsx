import { Stack, Typography } from "@mui/material";
import { AddTourImage } from "../../../components/AddTourImage/AddTourImage";
import { useContext, useState } from "react";
import { RoutingContext, pagesMap } from "../AddTourRouting/AddTourRouting";

export const AddTourDescription = () => {
  const [images, setImage] = useState<any[]>([]);

  const { page, setPage } = useContext(RoutingContext);

  return (
    <Stack>
      {page}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage("addTour")}
        >
          {"< "} Назад
        </Typography>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage(pagesMap.travel)}
        >
          Вперёд {" >"}
        </Typography>
      </Stack>

      <AddTourImage images={images} setImage={setImage} />
    </Stack>
  );
};
