import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourModules/AddTourSkeleton/AddTourSkeleton";
import {
  clearTourFields,
  setTourField,
} from "../../redux/AddTour/AddTourReducer";
import { getTourInfo } from "../../API/tourAPI/getTourInfo";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../API/tourListAPI";

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

  useEffect(() => {
    getFilters((value) => setFilters(value), undefined, false);
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isEditing) {
      getTourInfo(tourId, (value) => dispatch(setTourField(value))).then(() =>
        setLoading(false)
      );
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
      />
      <AddTourSteps
        page={page}
        files={files}
        setFiles={setFiles}
        filters={filters}
        isEditing={isEditing}
      />
    </>
  );
}

export default AddTourPage;
