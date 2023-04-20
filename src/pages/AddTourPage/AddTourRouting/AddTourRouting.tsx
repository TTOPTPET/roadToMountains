import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { addTour } from "../../../submitFunctions/addTourAPI/addTourAPI";
import { addTourStepsMap } from "../AddTourPage";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
}

export default function AddTourRouting({ page, setPage }: addTourRoutingProps) {
  const navigate = useNavigate();
  const newTour = useSelector((state: RootState) => state.addTour);

  const handlerSendTourClick = () => {
    console.log(newTour);
    addTour(undefined, newTour.tourFields, undefined, false);
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
                navigate("/creatorLk");
                return page;
              }
            })
          }
        >
          {"< "} Назад
        </Button>
        {page === addTourStepsMap.third ? (
          <Button variant="contained" onClick={handlerSendTourClick}>
            Добавить тур
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
