import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
  setModalActive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { ITour } from "../../../models/tourCardModel/ITour";
import { deletePostedTour } from "../../../API/creatorAPI/deletePostedTour";

function ConfirmCancelPostedTourModal() {
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
    modal?.props?.postedTours &&
      modal?.props?.postedTours.map((tour: ITour) => {
        const { publicTourId } = tour;
        deletePostedTour(
          publicTourId,
          (value) => {
            dispatch(setModalInactive("сancelPostedToursModal"));
            dispatch(setModalInactive("deleteTourModal"));
            dispatch(
              setModalActive("successCancelPostedTourModal", { arr: true })
            );
          },
          () => {
            modal?.props?.setErrorMessage("Ошибка! Попробуйте позже!");
          }
        );
      });
  };

  const handlerDeleteClick = () => {
    dispatch(setModalInactive("confirmCancelPostedTourModal"));
    modal?.props?.publicTourId &&
      deletePostedTour(
        modal?.props?.publicTourId,
        (value) => {
          modal?.props?.setPostedTours([
            ...modal?.props?.postedTours.filter(
              (tour) => tour.publicTourId !== modal?.props?.publicTourId
            ),
          ]);
          dispatch(
            setModalActive("successCancelPostedTourModal", { arr: false })
          );
        },
        () => {
          modal?.props?.setErrorMessage("Ошибка! Попробуйте позже!");
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
          Подтверждение отмены {modal?.props?.arr ? "туров" : "тура"}
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите отменить {modal?.props?.arr ? "туры" : "тур"}?
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
              modal?.props?.arr ? handlerDeleteAllClick : handlerDeleteClick
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
