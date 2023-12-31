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

function SuccessCancellingBookingModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successCancellingBookingModal"));
  };
  return (
    <Dialog
      className="successCancellingBookingModal"
      onClose={() =>
        dispatch(setModalInactive("successCancellingBookingModal"))
      }
      open={isModalActive("successCancellingBookingModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ваше бронирование успешно отменено!
        </Typography>
        <Typography variant={"caption"}>До новых встреч!</Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>К турам</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessCancellingBookingModal;
