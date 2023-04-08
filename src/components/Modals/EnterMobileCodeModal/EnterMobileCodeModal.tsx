import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  TextField,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

function EnterMobileCodeModal() {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("enterMobileCodeModal"));
  };
  return (
    <Dialog
      className="enterMobileCodeModal"
      onClose={() => dispatch(setModalInactive("enterMobileCodeModal"))}
      open={isModalActive("enterMobileCodeModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Вам отправлен одноразовый код подтверждения
        </Typography>
        <TextField placeholder="Код из SMS" color="secondary" />

        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"27px"}
          gap="5px"
        >
          <Button onClick={handlerConfirmClick}>Отправить код</Button>
          <Button variant="weakTextButton" onClick={handlerConfirmClick}>
            Не приходит код?
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default EnterMobileCodeModal;
