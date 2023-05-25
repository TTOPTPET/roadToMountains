import {
  Button,
  Dialog,
  DialogContent,
  Typography,
  Stack,
  TextField,
} from "@mui/material";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { confirmUserRegistration } from "../../../API/authAPI";
import { getUserInfo } from "../../../API/commonAPI";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";

type Props = {
  successCallback: (resp?: any) => void;
};

function EnterMobileCodeModal({ successCallback }: Props) {
  const [confirmCode, setConfirmCode] = useState<string>("");

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlerConfirmClick = () => {
    confirmUserRegistration({ confirmationCode: +confirmCode }, (resp) => {
      successCallback(resp);
    });
  };

  return (
    <Dialog
      className="enterMobileCodeModal"
      onClose={() => {
        dispatch(setModalInactive("enterMobileCodeModal"));
        setConfirmCode("");
      }}
      open={isModalActive("enterMobileCodeModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Вам отправлен одноразовый код подтверждения
        </Typography>
        <TextField
          placeholder="Код из SMS"
          color="secondary"
          value={confirmCode}
          type={"number"}
          onChange={(e) => setConfirmCode(e.target.value)}
        />

        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={"27px"}
          gap="5px"
        >
          <Button onClick={() => handlerConfirmClick()}>Отправить код</Button>
          <Button
            variant="weakTextButton"
            onClick={() => handlerConfirmClick()}
          >
            Не приходит код?
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default EnterMobileCodeModal;
