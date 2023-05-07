import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { deleteTour } from "../../../API/creatorAPI/deleteTour";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { ITour } from "../../../models/tourCardModel/ITour";
import { SetStateAction, Dispatch } from "react";

interface IDeleteTourModalProps {
  tourId: string;
  myTours: ITour[];
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
}

function DeleteTourModal({
  tourId,
  myTours,
  setMyTours,
}: IDeleteTourModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("deleteTourModal"));
  };

  const handlerConfirmClick = () => {
    deleteTour(tourId, (value) => {
      dispatch(setModalInactive("deleteTourModal"));
      setMyTours([...myTours.filter((tour) => tour.tourId !== tourId)]);
      if (value === 200 || 201) {
        dispatch(setModalActive("successDeleteTourModal"));
      }
    });
  };
  return (
    <Dialog
      className="deleteTourModal"
      onClose={() => dispatch(setModalInactive("deleteTourModal"))}
      open={isModalActive("deleteTourModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение удаления тура
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите удалить тур?
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button onClick={handlerConfirmClick}>Да, удалить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteTourModal;
