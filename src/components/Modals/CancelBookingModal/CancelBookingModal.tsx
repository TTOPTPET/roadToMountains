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
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function CancelBookingModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerBackClick = () => {
    dispatch(setModalInactive("cancelBookingModal"));
  };

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("cancelBookingModal"));
  };

  return (
    <Dialog
      className="cancelBookingModal"
      onClose={() => dispatch(setModalInactive("cancelBookingModal"))}
      open={isModalActive("cancelBookingModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Подтверждение отмены бронирования
        </Typography>
        <Typography variant={"caption"}>
          Вы уверены, что хотите отменить бронирование?
        </Typography>

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerBackClick}>Назад</Button>
          <Button onClick={handlerConfirmClick}>Да, отменить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default CancelBookingModal;
