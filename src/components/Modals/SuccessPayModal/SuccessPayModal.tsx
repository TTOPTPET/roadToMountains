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

function SuccessPayModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successPayModal"));
  };
  return (
    <Dialog
      className="successPayModal"
      onClose={() => dispatch(setModalInactive("successPayModal"))}
      open={isModalActive("successPayModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Вы успешно оплатили тур!
        </Typography>
        <Typography variant={"caption"}>Увидимся 13 марта 2023!</Typography>
        {/* TODO: подставить дату */}

        <Stack direction={"row"} justifyContent={"end"} marginTop={"30px"}>
          <Button onClick={handlerCloseClick}>К бронированию</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessPayModal;
