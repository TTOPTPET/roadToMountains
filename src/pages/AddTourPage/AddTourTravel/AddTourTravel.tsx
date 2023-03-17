import { Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { RoutingContext, pagesMap } from "../AddTourRouting/AddTourRouting";

export const AddTourTravel = () => {
  const { page, setPage } = useContext(RoutingContext);

  return (
    <Stack>
      {page}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage(pagesMap.description)}
        >
          {"< "} Назад
        </Typography>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage(pagesMap.control)}
        >
          Вперёд {" >"}
        </Typography>
      </Stack>
    </Stack>
  );
};
