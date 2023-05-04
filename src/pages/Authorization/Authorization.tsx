import { ChangeEvent, useState } from "react";
import {
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import { AuthComponent } from "../../components/AuthorizationModules/AuthFabric/AuthFabic";
import { IUserLogin } from "../../models/authModels/IUserLogin";
import { IUserRegister } from "../../models/authModels/IUserRegister";
import {
  ILoginComponent,
  IRegisterComponent,
  ITextProps,
} from "../../components/AuthorizationModules/AuthFabric/AuthTypes/AuthTypes";
import {
  confirmUserRegistration,
  loginUser,
  registerUser,
} from "../../API/authAPI";
import { lightTurquoiseColor } from "../../config/MUI/color/color";

function Authorization() {
  const loginDefault: IUserLogin = {
    login: "",
    password: "",
  };
  const registerDefault: IUserRegister = {
    login: "",
    name: "",
    password: "",
    passwordSecond: "",
    typeUser: "tourist",
  };
  const [userLoginData, setUserLoginData] = useState<IUserLogin>(loginDefault);
  const [userRegisterData, setUserRegisterData] =
    useState<IUserRegister>(registerDefault);
  const [confirmCode, setConfirmCode] = useState<string>("");
  const [regState, setRegState] = useState<boolean>(true);
  const [isConfirmCode, setIsConfirmCode] = useState<boolean>(false);

  const handlerUpdateLoginField = (
    key: keyof IUserLogin,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserLoginData({ ...userLoginData, [key]: e.target.value });
  };

  const handlerUpdateRegisterField = (
    key: keyof IUserRegister,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserRegisterData({ ...userRegisterData, [key]: e.target.value });
  };

  const handlerOnTransition = () => {
    setUserLoginData(loginDefault);
    setUserRegisterData(registerDefault);
    setRegState(!regState);
  };

  const handlerRegisterClick = () => {
    let codeStatus;
    registerUser(
      (value) => {
        codeStatus = value;
      },
      userRegisterData,
      undefined,
      false
    );
    console.log(codeStatus);
    setIsConfirmCode(true);

    if (codeStatus === 201 || codeStatus === 200) {
      setIsConfirmCode(true);
    }
  };

  const handlerLoginClick = () => {
    loginUser(userLoginData, undefined, undefined, false);
  };

  const handlerConfirmCodeClick = () => {
    confirmUserRegistration(
      { confirmationCode: +confirmCode },
      undefined,
      undefined
    );
  };

  return (
    <Stack sx={{ m: "0 auto", mt: "95px", gap: "50px" }}>
      <Typography variant="h3">{regState ? "Вход" : "Регистрация"}</Typography>
      <Box>
        <Paper
          variant="bigPadding"
          sx={{
            bgcolor: lightTurquoiseColor,
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Stack sx={{ width: "450px", gap: "15px", mb: "15px" }}>
            {regState
              ? Object.entries<ITextProps>(
                  AuthComponent("login") as unknown as {
                    [s: string]: ITextProps;
                  }
                ).map(([key, value], index) => (
                  <TextField
                    color="secondary"
                    key={index}
                    placeholder={value.name}
                    type={value.type}
                    required={value.required}
                    value={userLoginData[key as keyof ILoginComponent]}
                    onChange={(e) =>
                      handlerUpdateLoginField(key as keyof ILoginComponent, e)
                    }
                  />
                ))
              : Object.entries<ITextProps>(
                  AuthComponent("register") as unknown as {
                    [s: string]: ITextProps;
                  }
                ).map(([key, value], index) => (
                  <TextField
                    color="secondary"
                    key={index}
                    placeholder={value.name}
                    type={value.type}
                    required={value.required}
                    value={userRegisterData[key as keyof IRegisterComponent]}
                    onChange={(e) =>
                      handlerUpdateRegisterField(
                        key as keyof IRegisterComponent,
                        e
                      )
                    }
                  />
                ))}
          </Stack>
          {isConfirmCode && !regState ? (
            <Stack sx={{ width: "450px", gap: "15px", mb: "15px" }}>
              <Typography variant={"h5"} sx={{ textAlign: "center" }}>
                На Вашу почту отправлен <br /> одноразовый код подтверждения
              </Typography>
              <TextField
                color="secondary"
                placeholder={"Код с почты"}
                type={"text"}
                required
                value={confirmCode}
                onChange={(e) => setConfirmCode(e.target.value)}
              />
            </Stack>
          ) : (
            <></>
          )}
          <Box sx={{ mt: "15px" }}>
            {regState ? (
              <Button onClick={handlerLoginClick}>Вход</Button>
            ) : (
              <>
                {isConfirmCode ? (
                  <Button onClick={handlerConfirmCodeClick}>
                    Отправить код
                  </Button>
                ) : (
                  <Button onClick={handlerRegisterClick}>Регистрация</Button>
                )}
              </>
            )}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
            <Typography variant="caption">
              {regState ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            </Typography>
            <Button variant="weakTextButton" onClick={handlerOnTransition}>
              {regState ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
}

export default Authorization;
