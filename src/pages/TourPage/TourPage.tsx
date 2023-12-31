import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { setTourInfo } from "../../redux/TourInfo/TourInfoReducer";
import { ITourInfo } from "../../models/tourModels/ITourInfo";
import { getTourInfo } from "../../API/tourAPI/getTourInfo";
import { TourRouting } from "./TourRouting/TourRouting";
import { TourSteps } from "./TourSteps/TourSteps";
import { getBookingDate } from "../../API/tourAPI/getBookingDate";
import { ITourBookingDate } from "../../models/tourModels/ITourBookingDate";
import { Box } from "@mui/material";

export enum tourStepsMap {
  first,
  second,
}

function TourPage() {
  const { tourId } = useParams();
  const [page, setPage] = useState<tourStepsMap>(tourStepsMap.first);
  const [bookingDate, setBookingDate] = useState<ITourBookingDate[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const dispatch = useDispatch();
  const tourInfo = useSelector((state: RootState) => state.tourInfo.tourInfo);

  useEffect(() => {
    getTourInfo(
      tourId,
      (response: ITourInfo) => dispatch(setTourInfo(response)),
      undefined,
      false
    );
    getBookingDate(tourId, (value) => setBookingDate(value), undefined);

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <></>;
  }
  return (
    <Box sx={{ position: "relative" }}>
      <TourRouting page={page} setPage={setPage} />
      <TourSteps
        page={page}
        tourInfo={tourInfo}
        setPage={setPage}
        bookingDate={bookingDate}
      />
    </Box>
  );
}

export default TourPage;
