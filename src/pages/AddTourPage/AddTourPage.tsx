import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AddTourSkeleton } from "../../components/AddTourModules/AddTourSkeleton/AddTourSkeleton";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";
import { IFilter } from "../../models/tourListModels/IFilter";
import { getFilters } from "../../API/tourListAPI";
import { getMyTourById } from "../../API/creatorAPI/getMyTourById";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { Fade, Snackbar } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { darkTurquoiseColor } from "../../config/MUI/color/color";

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

export type AddErrorSnackbarType = {
  open: boolean;
  Transition: React.ComponentType<
    TransitionProps & {
      children: React.ReactElement<any, any>;
    }
  >;
};

function AddTourPage({ isEditing }: { isEditing: boolean }) {
  const { tourId } = useParams();

  const [page, setPage] = useState<addTourStepsMap>(addTourStepsMap.first);
  const [tourInfo, setTourInfo] = useState<IAddTour>({});
  const [filters, setFilters] = useState<IFilter>(filterDefault);
  const [isLoading, setLoading] = useState(true);
  const [addError, setAddError] = useState<boolean>(false);
  const [snackbar, setSnackbar] = useState<AddErrorSnackbarType>({
    open: false,
    Transition: Fade,
  });

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

  const handlerSnackOnClose = () => {
    setSnackbar({
      ...snackbar,
      open: !snackbar.open,
    });
  };

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
        snackbar={snackbar}
        setSnackbar={setSnackbar}
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
      <Snackbar
        open={snackbar.open}
        onClose={handlerSnackOnClose}
        message={"Заполните недостающие поля"}
        key={snackbar.Transition.name}
        TransitionComponent={snackbar.Transition}
        ContentProps={{
          sx: {
            background: darkTurquoiseColor,
          },
        }}
      />
    </>
  );
}

export default AddTourPage;
