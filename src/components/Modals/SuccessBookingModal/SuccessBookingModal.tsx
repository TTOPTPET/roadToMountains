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

function SuccessBookingModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successBookingModal"));
  };

  const handlerPayClick = () => {
    dispatch(setModalInactive("successBookingModal"));
  };
  return (
    <Dialog
      className="successBookingModal"
      onClose={() => dispatch(setModalInactive("successBookingModal"))}
      open={isModalActive("successBookingModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Вы успешно забронировали тур!
        </Typography>
        <Typography variant={"caption"}>
          Обратите внимание: бронирование необходимо оплатить до 15:23:52.
          Времени осталось 2:58:26.
        </Typography>
        {/* TODO: подставить время */}

        <Stack
          direction={"row"}
          justifyContent={"end"}
          marginTop={"30px"}
          gap={1}
        >
          <Button onClick={handlerPayClick}>Оплатить</Button>
          <Button onClick={handlerCloseClick}>К бронированию</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessBookingModal;
