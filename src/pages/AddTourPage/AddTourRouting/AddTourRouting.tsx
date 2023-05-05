import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearPhotoToDelete } from "../../../redux/Photo/PhotoReducer";
import { RootState } from "../../../redux/store";
import { addTour } from "../../../API/addTourAPI/addTourAPI";
import { editTour } from "../../../API/creatorAPI/editTour";
import { addTourStepsMap } from "../AddTourPage";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
  files: any[];
  isEditing: boolean;
  tourId: string;
}

export default function AddTourRouting({
  page,
  setPage,
  files,
  isEditing,
  tourId,
}: addTourRoutingProps) {
  const navigate = useNavigate();
  const newTour = useSelector((state: RootState) => state.addTour.tourFields);
  const photosToDelete = useSelector(
    (state: RootState) => state.photoToDelete.photo
  );
  const dispatch = useDispatch();

  const handlerSendTourClick = () => {
    if (isEditing) {
      editTour(tourId, newTour, files, photosToDelete, undefined);
    } else {
      addTour(undefined, newTour, files, undefined, false);
    }
  };

  return (
    <>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button
          variant="textButton"
          onClick={() =>
            setPage((page: addTourStepsMap) => {
              if (page > 0) {
                return page - 1;
              } else {
                navigate("/creator/lk");
                dispatch(clearPhotoToDelete());
                return page;
              }
            })
          }
        >
          {"< "} Назад
        </Button>
        {page === addTourStepsMap.third ? (
          <Button variant="contained" onClick={handlerSendTourClick}>
            {isEditing ? "Редактировать тур" : "Добавить тур"}
          </Button>
        ) : (
          <Button
            variant="textButton"
            onClick={() =>
              setPage((page: addTourStepsMap) => (page < 2 ? page + 1 : page))
            }
          >
            Вперёд {" >"}
          </Button>
        )}
      </Stack>
    </>
  );
}
