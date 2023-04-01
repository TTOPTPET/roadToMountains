import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState } from "../../redux/store";
import { setTourInfo } from "../../redux/TourInfo/TourInfoReducer";
import { ITourInfo } from "../../models/tourModels/ITourInfo";
import { getTourInfo } from "../../submitFunctions/tourAPI/getTourInfo";

function TourPage() {
  const { tourId } = useParams();

  const dispatch = useDispatch();
  const tourInfo = useSelector((state: RootState) => state.tourInfo.tourInfo);

  useEffect(() => {
    getTourInfo(tourId, (response: ITourInfo) =>
      dispatch(setTourInfo(response))
    );
  }, []);

  return <div>TourPage: {tourId}</div>;
}

export default TourPage;
