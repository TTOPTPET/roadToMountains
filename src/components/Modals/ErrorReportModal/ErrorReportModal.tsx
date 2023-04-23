import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
} from "@mui/material";

import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function ErrorReportModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerConfirmClick = () => {
    dispatch(setModalActive("successMessageSendModal"));
    //TODO: добавить проверку на успешное отправление сообщения
    dispatch(setModalInactive("errorReportModal"));
  };

  return (
    <Dialog
      className="errorReportModal"
      onClose={() => dispatch(setModalInactive("errorReportModal"))}
      open={isModalActive("errorReportModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"}>Сообщение о проблеме</Typography>
        <StyledTextAreaAutosize placeholder="Опишите Вашу проблему" />
        <Stack direction={"row"} justifyContent={"end"}>
          <Button onClick={handlerConfirmClick}>Отправить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default ErrorReportModal;
