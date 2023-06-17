import { Box, Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { addTour } from "../../../API/addTourAPI/addTourAPI";
import { editTour } from "../../../API/creatorAPI/editTour";
import { addTourStepsMap } from "../AddTourPage";
import { Dispatch, SetStateAction } from "react";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
  isEditing: boolean;
  tourId: string;
  setAddError: Dispatch<SetStateAction<boolean>>;
}

export default function AddTourRouting({
  page,
  tourInfo,
  setTourInfo,
  setPage,
  isEditing,
  tourId,
  setAddError,
}: addTourRoutingProps) {
  const navigate = useNavigate();

  const handlerSendTourClick = () => {
    if (isEditing) {
      console.log(tourInfo);
      editTour(tourId, tourInfo, () => {
        navigate("/creator/lk");
      });
    } else {
      console.log(tourInfo);
      addTour(
        () => {
          navigate("/creator/lk");
        },
        tourInfo,
        () => setAddError(true),
        false
      );
    }
  };

  return (
    <Box sx={{ mb: "20px" }}>
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Button
          variant="textButton"
          onClick={() =>
            setPage((page: addTourStepsMap) => {
              if (page > 0) {
                return page - 1;
              } else {
                navigate("/creator/lk");
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
