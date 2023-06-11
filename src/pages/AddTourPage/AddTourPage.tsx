import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourModules/AddTourSkeleton/AddTourSkeleton";
import {
  clearTourFields,
  setTourField,
} from "../../redux/AddTour/AddTourReducer";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../API/tourListAPI";
import { getMyTourById } from "../../API/creatorAPI/getMyTourById";

export enum addTourStepsMap {
  first,
  second,
  third,
}

const filterDefault: IFilter = {
  regions: [],
  category: [],
  complexity: [],
  maxPrice: 0,
};

function AddTourPage({ isEditing }: { isEditing: boolean }) {
  const { tourId } = useParams();

  const [page, setPage] = useState<addTourStepsMap>(addTourStepsMap.first);
  const [filters, setFilters] = useState<IFilter>(filterDefault);
  const [files, setFiles] = useState<any[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [addError, setAddError] = useState<boolean>(false);

  useEffect(() => {
    getFilters((value) => setFilters(value), undefined, false);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      getMyTourById(tourId, (value) => {
        dispatch(setTourField(value));
        setLoading(false);
      });
    } else {
      dispatch(clearTourFields());
      setLoading(false);
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
        setAddError={setAddError}
      />
      <AddTourSteps
        page={page}
        files={files}
        setFiles={setFiles}
        filters={filters}
        isEditing={isEditing}
        addError={addError}
        setAddError={setAddError}
      />
    </>
  );
}

export default AddTourPage;
