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

function SuccessEditUserInfoModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerCloseClick = () => {
    dispatch(setModalInactive("successEditUserInfoModal"));
  };
  return (
    <Dialog
      className="successEditUserInfoModal"
      onClose={() => dispatch(setModalInactive("successEditUserInfoModal"))}
      open={isModalActive("successEditUserInfoModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Ваши данные успешно отправлены!
        </Typography>
        <Typography variant={"caption"}>
          Проверка предоставленной информации займёт до 7 рабочих дней,
          по окончании проверки Вам придёт электронное письмо с результатом,
          а статус верификации в личном кабинете обновится.
        </Typography>

        <Stack direction={"row"} justifyContent={"end"} marginTop={"15px"}>
          <Button onClick={handlerCloseClick}>В личный кабинет</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SuccessEditUserInfoModal;
