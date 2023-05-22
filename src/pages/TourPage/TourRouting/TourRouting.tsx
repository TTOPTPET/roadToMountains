import { FC } from "react";
import { tourStepsMap } from "../TourPage";
import { useNavigate } from "react-router-dom";
import { Stack, Button } from "@mui/material";

interface TourRoutingProps {
  page: tourStepsMap;
  setPage: (prop: any) => void;
}

export const TourRouting: FC<TourRoutingProps> = ({ page, setPage }) => {
  const navigate = useNavigate();

  return (
    <>
      <Stack
        direction={"row"}
        justifyContent={"space-between"}
        sx={{ position: "absolute", top: "-55px" }}
      >
        <Button
          variant="textButton"
          onClick={() =>
            setPage((page: tourStepsMap) => {
              if (page > 0) {
                return page - 1;
              } else {
                navigate("/tours/all");
                return page;
              }
            })
          }
        >
          {"< "} Назад
        </Button>
      </Stack>
    </>
  );
};
