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

function LostPasswordModal() {
  const [login, setLogin] = useState<string>("");
  const [mobileCode, setMobileCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );

  const [errorMessage, setErrorMessage] = useState("123");
  const [codeSent, setCodeSent] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [errReg, setErrReg] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handlerConfirmClick = () => {
    codeSent ? setResetPassword(true) : setCodeSent(true);
  };

  const handlerCodeClick = () => {};

  return (
    <Dialog
      className="lostPasswordModal"
      onClose={() => {
        dispatch(setModalInactive("lostPasswordModal"));
        setLogin("");
        setMobileCode("");
        setCodeSent(false);
        setResetPassword(false);
      }}
      open={isModalActive("lostPasswordModal", activeModals)}
      fullWidth
      maxWidth={"sm"}
    >
      <DialogContent>
        <Typography variant={"h5"} sx={{ mb: "30px" }}>
          Забыли пароль?
        </Typography>
        {!resetPassword ? (
          <Stack direction={"column"} gap={"10px"}>
            <TextField
              label="Логин"
              color="secondary"
              value={login}
              type={"number"}
              onChange={(e) => setLogin(e.target.value)}
            />

            {codeSent && (
              <TextField
                label="Одноразовый код"
                color="secondary"
                value={mobileCode}
                type={"number"}
                onChange={(e) => setMobileCode(e.target.value)}
              />
            )}
          </Stack>
        ) : (
          <TextField
            label="Новый пароль"
            color="secondary"
            value={newPassword}
            type={"number"}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        )}
        {errReg && (
          <Typography
            variant="caption"
            className="author__error"
            sx={{ color: redColor, textAlign: "center", mt: "15px" }}
          >
            {errorMessage}
          </Typography>
        )}

        <Stack
          direction={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          marginTop={errReg ? "15px" : "27px"}
          gap="5px"
        >
          <Button onClick={() => handlerConfirmClick()}>
            {codeSent ? "Изменить пароль" : "Отправить код"}
          </Button>
          {!resetPassword && (
            <Button variant="weakTextButton" onClick={() => handlerCodeClick()}>
              Не приходит код?
            </Button>
          )}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default LostPasswordModal;
