import { Button, Stack, Typography } from "@mui/material";
import { useContext } from "react";
import { RoutingContext, pagesMap } from "../AddTourRouting/AddTourRouting";

export const AddTourControl = () => {
  const { page, setPage } = useContext(RoutingContext);

  return (
    <Stack>
      {page}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage(pagesMap.travel)}
        >
          {"< "} Назад
        </Typography>
        <Button>Добавить</Button>
      </Stack>
    </Stack>
  );
};
