import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearPhotoToDelete } from "../../../redux/Photo/PhotoReducer";
import { RootState } from "../../../redux/store";
import { addTour } from "../../../API/addTourAPI/addTourAPI";
import { editTour } from "../../../API/creatorAPI/editTour";
import { addTourStepsMap } from "../AddTourPage";
import { deletePhotoTour } from "../../../API/creatorAPI/daletePhotoTour";
import { Dispatch, SetStateAction } from "react";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
  files: any[];
  isEditing: boolean;
  tourId: string;
  setAddError: Dispatch<SetStateAction<boolean>>;
}

export default function AddTourRouting({
  page,
  setPage,
  files,
  isEditing,
  tourId,
  setAddError,
}: addTourRoutingProps) {
  const navigate = useNavigate();
  const newTour = useSelector((state: RootState) => state.addTour.tourFields);
  const photosToDelete = useSelector(
    (state: RootState) => state.photoToDelete.photo
  );
  const dispatch = useDispatch();

  const handlerSendTourClick = () => {
    if (isEditing) {
      editTour(tourId, newTour, files, () => {
        photosToDelete.forEach((file) => {
          deletePhotoTour({ tourId, fileUrl: file });
        });
        navigate("/creator/lk");
      });
    } else {
      addTour(
        () => {
          navigate("/creator/lk");
        },
        newTour,
        files,
        () => setAddError(true),
        false
      );
    }
  };

  return (
    <Box sx={{ position: "absolute", top: "-55px", width: "100%" }}>
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
    </Box>
  );
}
