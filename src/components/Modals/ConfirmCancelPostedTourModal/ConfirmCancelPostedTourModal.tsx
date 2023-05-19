import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { SetStateAction, Dispatch } from "react";
import { IPublicTour } from "../../../models/calendarModels/IPublicTour";

import {
  isModalActive,
  setModalInactive,
  setModalActive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { ITour } from "../../../models/tourCardModel/ITour";
import { deletePostedTour } from "../../../API/creatorAPI/deletePostedTour";

type ConfirmCancelPostedTourModalProps = {
  setPublicTours?: Dispatch<SetStateAction<IPublicTour[]>>;
  setSelectedPublic?: Dispatch<SetStateAction<IPublicTour>>;
  setErrorMessage?: Dispatch<SetStateAction<string>>;
  publicTourId?: string;
  postedTours?: ITour[];
};

function ConfirmCancelPostedTourModal({
  setPublicTours,
  setSelectedPublic,
  setErrorMessage,
  publicTourId,
  postedTours,
}: ConfirmCancelPostedTourModalProps) {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const modal = activeModals.find(
    (modal) => modal.id === "confirmCancelPostedTourModal"
  );

  const handlerBackClick = () => {
    dispatch(setModalInactive("confirmCancelPostedTourModal"));
  };

  const handlerDeleteAllClick = () => {
    dispatch(setModalInactive("confirmCancelPostedTourModal"));
    postedTours &&
      postedTours.map((tour: ITour) => {
        deletePostedTour(
          tour.publicTourId,
          (value) => {
            dispatch(setModalInactive("сancelPostedToursModal"));
            dispatch(setModalInactive("deleteTourModal"));
            dispatch(
              setModalActive("successCancelPostedTourModal", { multiply: true })
            );
          },
          () => {
            setErrorMessage("Ошибка! Попробуйте позже!");
          }
        );
      });
  };

  const handlerDeleteClick = () => {
    publicTourId &&
      deletePostedTour(
        publicTourId,
        (value) => {
          setPublicTours((publicTours) =>
            publicTours.filter((tour) => tour.publicTourId !== publicTourId)
          );
          setSelectedPublic(undefined);

          dispatch(setModalInactive("confirmCancelPostedTourModal"));
          dispatch(
            setModalActive("successCancelPostedTourModal", { multiply: false })
          );
        },
        () => {
          dispatch(setModalInactive("confirmCancelPostedTourModal"));
          setErrorMessage("Ошибка! Попробуйте позже!");
        }
      );
  };

  return (
    <Dialog
      className="confirmCancelPostedTourModal"
      onClose={() => dispatch(setModalInactive("confirmCancelPostedTourModal"))}
      open={isModalActive("confirmCancelPostedTourModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение отмены {modal?.props?.multiply ? "туров" : "тура"}
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите отменить{" "}
          {modal?.props?.multiply ? "туры" : "тур"}?
          <br /> Все денежные средства будут <br />
          возвращены покупателям
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button
            onClick={
              modal?.props?.multiply
                ? handlerDeleteAllClick
                : handlerDeleteClick
            }
          >
            Да, отменить
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmCancelPostedTourModal;