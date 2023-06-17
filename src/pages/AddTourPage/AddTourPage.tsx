import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourModules/AddTourSkeleton/AddTourSkeleton";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../API/tourListAPI";
import { getMyTourById } from "../../API/creatorAPI/getMyTourById";
import { IAddTour } from "../../models/addTourModels/IAddTour";

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
  const [tourInfo, setTourInfo] = useState<IAddTour>({});
  const [filters, setFilters] = useState<IFilter>(filterDefault);
  const [isLoading, setLoading] = useState(true);
  const [addError, setAddError] = useState<boolean>(false);

  useEffect(() => {
    getFilters((value) => setFilters(value), undefined, false);
  }, []);

  useEffect(() => {
    if (isEditing) {
      getMyTourById(tourId, (value) => {
        setTourInfo(value);
        setLoading(false);
      });
    } else {
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
        tourInfo={tourInfo}
        setTourInfo={setTourInfo}
        isEditing={isEditing}
        tourId={tourId}
        setAddError={setAddError}
      />
      <AddTourSteps
        page={page}
        filters={filters}
        tourInfo={tourInfo}
        setTourInfo={setTourInfo}
        isEditing={isEditing}
        addError={addError}
        setAddError={setAddError}
      />
    </>
  );
}

export default AddTourPage;
