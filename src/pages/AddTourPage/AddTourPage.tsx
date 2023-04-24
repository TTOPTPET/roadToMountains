import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourSkeleton/AddTourSkeleton";
import { setTourField } from "../../redux/AddTour/AddTourReducer";
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
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      getTourInfo(tourId, (value) => dispatch(setTourField(value))).then(() =>
        setLoading(false)
      );
    }
  }, []);

  if (isLoading) {
    return <AddTourSkeleton />;
  }
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
