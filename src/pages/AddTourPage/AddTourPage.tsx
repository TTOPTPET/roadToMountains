import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setTourField } from "../../redux/AddTour/AddTourReducer";
import { RootState } from "../../redux/store";
import { getTourInfo } from "../../submitFunctions/tourAPI/getTourInfo";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";

export enum addTourStepsMap {
  first,
  second,
  third,
}

function AddTourPage({ isEditing }: { isEditing: boolean }) {
  const { tourId } = useParams();

  const [page, setPage] = useState<addTourStepsMap>(addTourStepsMap.first);
  const [files, setFiles] = useState<any[]>([]);

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      getTourInfo(tourId, (value) => dispatch(setTourField(value)));
    }
  }, []);

  console.log(tourInfo);
  return (
    <>
      <AddTourRouting
        page={page}
        setPage={setPage}
        files={files}
        isEditing={isEditing}
        tourId={tourId}
      />
      <AddTourSteps
        page={page}
        files={files}
        setFiles={setFiles}
        isEditing={isEditing}
      />
    </>
  );
}

export default AddTourPage;
