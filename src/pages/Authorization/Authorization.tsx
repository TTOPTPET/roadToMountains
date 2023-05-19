import { ChangeEvent, useState } from "react";
import {
  Button,
  Stack,
  TextField,
  Typography,
  Box,
  Paper,
  Autocomplete,
} from "@mui/material";
import { AuthComponent } from "../../components/AuthorizationModules/AuthFabric/AuthFabic";
import { IUserLogin } from "../../models/authModels/IUserLogin";
import { IUserRegister } from "../../models/authModels/IUserRegister";
import {
  ILoginComponent,
  IRegisterComponent,
  ITextProps,
} from "../../components/AuthorizationModules/AuthFabric/AuthTypes/AuthTypes";
import { loginUser, registerUser } from "../../API/authAPI";
import { lightTurquoiseColor, redColor } from "../../config/MUI/color/color";
import EnterMobileCodeModal from "../../components/Modals/EnterMobileCodeModal/EnterMobileCodeModal";
import { useDispatch } from "react-redux";
import {
  setModalActive,
  setModalInactive,
} from "../../redux/Modal/ModalReducer";
import { UserType } from "../../models/userModels/IUserInfo";
import { useEffect } from "react";
import { setUserInfo } from "../../redux/UserInfo/UserInfoReducer";
import { getUserInfo } from "../../API/commonAPI";
import { useNavigate } from "react-router-dom";
import {
  BAN_STATUS,
  REFRESH_TOKEN,
  TOKEN,
  USER_ROLE,
} from "../../config/types";
import { useCookies } from "react-cookie";

const registerTypes = [
  { id: UserType.creator, name: "туросоздатель" },
  { id: UserType.tourist, name: "турист" },
];

function Authorization() {
  const [cookies, setCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
    BAN_STATUS,
    USER_ROLE,
  ]);

  const loginDefault: IUserLogin = {
    login: "",
    password: "",
  };
  const registerDefault: IUserRegister = {
    email: "",
    phone: "",
    password: "",
    passwordSecond: "",
    typeUser: null,
  };
  const [userLoginData, setUserLoginData] = useState<IUserLogin>(loginDefault);
  const [userRegisterData, setUserRegisterData] =
    useState<IUserRegister>(registerDefault);
  const [regState, setRegState] = useState<boolean>(true);
  const [errAuth, setErrAuth] = useState(false);
  const [errReg, setErrReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordErrorStatus, setPasswordErrorStatus] = useState(false);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const autocompleteChanged = (value: string) => {
    setUserRegisterData({ ...userRegisterData, typeUser: value as UserType });
  };
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
        dispatch(setModalActive("enterMobileCodeModal"));
      },
      userRegisterData,
      (e) => {
        setErrReg(true);
        setErrorMessage("Что-то пошло не так, попробуйте позже!");
      },
      false
    );
    console.log(codeStatus);
  };

  const handlerLoginClick = () => {
    loginUser(
      userLoginData,
      (resp) => {
        setCookies(TOKEN, resp.accessToken, { path: "/" });
        setCookies(REFRESH_TOKEN, resp.refreshToken, { path: "/" });
        setCookies(USER_ROLE, resp.role, { path: "/" });
        setCookies(BAN_STATUS, resp.status, { path: "/" });
        setErrAuth(false);
        setErrorMessage("");
        navigate("/tours/all");
      },
      (e) => {
        if (e.response.status >= 400 && e.response.status <= 500) {
          setErrAuth(true);
          setErrorMessage("Неверный логин или пароль!");
        } else {
          setErrAuth(true);
          setErrorMessage("Ошибка сервера, попробуйте позже!");
        }
      },
      false
    );
  };

  useEffect(() => {
    setErrAuth(false);
    setErrorMessage("");
  }, [regState]);

  useEffect(() => {
    console.log("userRegisterData");
    if (
      userRegisterData.password !== userRegisterData?.passwordSecond &&
      userRegisterData.password !== "" &&
      userRegisterData?.passwordSecond !== ""
    ) {
      setPasswordErrorStatus(true);
      setErrorMessage("Пароли не совпадают!");
    } else {
      setPasswordErrorStatus(false);
      setErrorMessage("");
    }
    setErrAuth(false);
  }, [userRegisterData, userLoginData]);

  console.log(userRegisterData);

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
                    error={errAuth}
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
                    error={
                      value.name === "Повторите пароль" && passwordErrorStatus
                    }
                    required={value.required}
                    value={userRegisterData[key as keyof IRegisterComponent]}
                    onChange={(e) => {
                      handlerUpdateRegisterField(
                        key as keyof IRegisterComponent,
                        e
                      );
                    }}
                  />
                ))}
            {!regState && (
              <Autocomplete
                id="rolePicker"
                onChange={(e, value) => autocompleteChanged(value?.id)}
                options={registerTypes}
                getOptionLabel={(option) => option.name}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    placeholder="Выбор роли"
                    color="secondary"
                  />
                )}
              />
            )}
          </Stack>
          {(passwordErrorStatus || errAuth || setErrReg) && (
            <Typography
              variant="caption"
              className="author__error"
              sx={{ color: redColor, mb: "15px" }}
            >
              {errorMessage}
            </Typography>
          )}

          {regState ? (
            <Button onClick={() => handlerLoginClick()}>Вход</Button>
          ) : (
            <Button onClick={() => handlerRegisterClick()}>Регистрация</Button>
          )}
          <EnterMobileCodeModal
            successCallback={(resp) => {
              setCookies(TOKEN, resp.accessToken, { path: "/" });
              setCookies(REFRESH_TOKEN, resp.refreshToken, { path: "/" });
              setCookies(USER_ROLE, resp.role, { path: "/" });
              setCookies(BAN_STATUS, resp.status, { path: "/" });
              dispatch(setModalInactive("enterMobileCodeModal"));
              navigate("/tours/all");
            }}
          />

          <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
            <Typography variant="caption">
              {regState ? "Нет аккаунта?" : "Уже есть аккаунт?"}
            </Typography>
            <Button
              variant="weakTextButton"
              onClick={handlerOnTransition}
              sx={{ textDecoration: "underline" }}
            >
              {regState ? "Зарегистрироваться" : "Войти"}
            </Button>
          </Box>
        </Paper>
      </Box>
    </Stack>
  );
}

export default Authorization;
