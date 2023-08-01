import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

function SuccessBookingModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const modal = activeModals.find(
    (modal) => modal.id === "successBookingModal"
  );

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successBookingModal"));
    navigate("/tourist/lk");
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
          Обратите внимание: бронирование необходимо оплатить до{" "}
          {dayjs(modal?.props?.paymentDeadline).format("hh:mm:ss")}. Времени
          осталось {dayjs().to(modal?.props?.paymentDeadline, true)}.
        </Typography>

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
