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
import { confirmUserRegistration, registerUser } from "../../../API/authAPI";
import { getUserInfo } from "../../../API/commonAPI";

import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";
import { useNavigate } from "react-router-dom";
import { IUserRegister } from "../../../models/authModels/IUserRegister";
import { cloneDeep } from "lodash";
import { redColor } from "../../../config/MUI/color/color";

type Props = {
  successCallback: (resp?: any) => void;
  userRegisterData?: IUserRegister;
};

function EnterMobileCodeModal({ successCallback, userRegisterData }: Props) {
  const [confirmCode, setConfirmCode] = useState<string>("");

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const [errorMessage, setErrorMessage] = useState("");
  const [errReg, setErrReg] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlerConfirmClick = () => {
    confirmUserRegistration(
      { confirmationCode: +confirmCode },
      (resp) => {
        successCallback(resp);
      },
      () => {
        setErrReg(true);
        setErrorMessage("Неверный код, попробуйте еще раз!");
      }
    );
  };

  const handlerCodeClick = () => {
    const registerDataCopy = cloneDeep(userRegisterData);
    registerDataCopy.phone = registerDataCopy.phone.replace(/[() -+-]/g, "");
    registerDataCopy.phone = "8" + registerDataCopy.phone.substring(1);
    registerUser(
      () => {},
      registerDataCopy,
      (e) => {
        setErrReg(true);
        setErrorMessage("Что-то пошло не так, попробуйте позже!");
      },
      false
    );
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
          label="Код из почты"
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
          <Button variant="weakTextButton" onClick={() => handlerCodeClick()}>
            Не приходит код?
          </Button>
        </Stack>
        {errReg && (
          <Typography
            variant="caption"
            className="author__error"
            sx={{ color: redColor, textAlign: "center", mt: "5px" }}
          >
            {errorMessage}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default EnterMobileCodeModal;
