import { Button } from "@mui/material";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { addTourStepsMap } from "../AddTourPage";

interface addTourRoutingProps {
  page: addTourStepsMap;
  setPage: (prop: any) => void;
}

export default function AddTourRouting({ page, setPage }: addTourRoutingProps) {
  const navigate = useNavigate();
  // const newTour = useSelect(stat)

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
          <Button
            variant="contained"
            onClick={
              () => {
                return;
              }
              //TODO: Апи для создания тура
            }
          >
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
