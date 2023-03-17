import { Typography } from "@mui/material";
import { useContext } from "react";
import { RoutingContext, pagesMap } from "../AddTourRouting/AddTourRouting";

export const AddTourDefault = () => {
  const { setPage } = useContext(RoutingContext);
  return (
    <>
      AddTourDefault
      <Typography
        variant={"button"}
        component={"button"}
        onClick={() => setPage(pagesMap.description)}
      >
        Добавить тур
      </Typography>
    </>
  );
};
