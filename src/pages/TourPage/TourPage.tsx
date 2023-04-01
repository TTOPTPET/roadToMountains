import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { setTourInfo } from "../../redux/TourInfo/TourInfoReducer";
import { ITourInfo } from "../../models/tourModels/ITourInfo";
import { getTourInfo } from "../../submitFunctions/tourAPI/getTourInfo";
import { Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as Icon } from "../../media/logo.svg";

function TourPage() {
  const { tourId } = useParams();

  const dispatch = useDispatch();
  const tourInfo = useSelector((state: RootState) => state.tourInfo.tourInfo);

  useEffect(() => {
    getTourInfo(
      tourId,
      (response: ITourInfo) => dispatch(setTourInfo(response)),
      undefined,
      true
    );
  }, []);

  return (
    <Stack>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography variant={"h3"}>{tourInfo.tourName}</Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <SvgIcon fontSize={"large"} viewBox={"0 0 70 70"}>
            <Icon />
          </SvgIcon>
          <Typography variant={"button"}>ООО "Алтайский тур"</Typography>
        </Stack>
      </Stack>
    </Stack>
  );
}

export default TourPage;
