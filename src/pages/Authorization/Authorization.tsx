import { ChangeEvent, useRef, useState } from "react";
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

const loginDefault: IUserLogin = {
  login: undefined,
  password: undefined,
};

const registerDefault: IUserRegister = {
  email: undefined,
  password: undefined,
  phone: undefined,
  typeUser: undefined,
  passwordSecond: undefined,
};

type RegisterErrors = {
  [key in keyof Omit<IUserRegister, "typeUser" | "passwordSecond">]: boolean;
};

const registerErrorsDefault: RegisterErrors = {
  email: false,
  password: false,
  phone: false,
};

function Authorization() {
  const [cookies, setCookies] = useCookies([
    TOKEN,
    REFRESH_TOKEN,
    BAN_STATUS,
    USER_ROLE,
  ]);

  const [userLoginData, setUserLoginData] = useState<IUserLogin>(loginDefault);
  const [userRegisterData, setUserRegisterData] =
    useState<IUserRegister>(registerDefault);
  const [regState, setRegState] = useState<boolean>(true);
  const [errAuth, setErrAuth] = useState(false);
  const [errReg, setErrReg] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [passwordErrorStatus, setPasswordErrorStatus] =
    useState<boolean>(false);
  const [registerInputError, setRegisterInputError] = useState<RegisterErrors>(
    registerErrorsDefault
  );

  const refBtn = useRef<HTMLButtonElement | null>(null);

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

  const registerValidation = (
    type: string,
    value: string,
    key: string
  ): boolean => {
    switch (type) {
      case "number":
        if (value === "") {
          return false;
        }
        return value.length > 10 ? false : true;
      case "email":
        if (value === "") {
          return false;
        }
        let re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return !re.test(value);
      default:
        return false;
    }
  };

  const handlerRegisterErrorChange = (
    key: keyof RegisterErrors,
    error: boolean
  ) => {
    setRegisterInputError({ ...registerInputError, [key]: error });
  };

  const handlerOnTransition = () => {
    setUserLoginData(loginDefault);
    setUserRegisterData(registerDefault);
    setRegState(!regState);
  };

  const handlerRegisterClick = () => {
    registerUser(
      () => {
        dispatch(setModalActive("enterMobileCodeModal"));
      },
      userRegisterData,
      (e) => {
        setErrReg(true);
        setErrorMessage("Что-то пошло не так, попробуйте позже!");
      },
      false
    );
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
    if (
      userRegisterData.password !== userRegisterData?.passwordSecond &&
      userRegisterData.password !== "" &&
      userRegisterData?.passwordSecond !== ""
    ) {
      setPasswordErrorStatus(true);
      setRegisterInputError({ ...registerInputError, password: true });
      setErrorMessage("Пароли не совпадают!");
    } else {
      setPasswordErrorStatus(false);
      setRegisterInputError({ ...registerInputError, password: false });
      setErrorMessage("");
    }
    setErrAuth(false);
  }, [userRegisterData, userLoginData]);

  useEffect(() => {
    const listener = (e) => {
      const event = new MouseEvent("click", {
        view: window,
        bubbles: true,
        cancelable: true,
      });
      e.code === "Enter" &&
        refBtn.current &&
        refBtn.current.dispatchEvent(event);
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Stack sx={{ m: "0 auto", gap: "50px" }}>
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
                    error={
                      errAuth ||
                      userLoginData[key as keyof ILoginComponent] === ""
                    }
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
                      key in registerErrorsDefault
                        ? registerInputError[key]
                        : false
                    }
                    required={value.required}
                    value={userRegisterData[key as keyof IRegisterComponent]}
                    onChange={(e) => {
                      if (key in registerErrorsDefault && key !== "password") {
                        handlerRegisterErrorChange(
                          key as keyof RegisterErrors,
                          registerValidation(value.type, e.target.value, key)
                        );
                      }
                      handlerUpdateRegisterField(key as keyof IUserRegister, e);
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
          {(passwordErrorStatus || errAuth || errReg) && (
            <Typography
              variant="caption"
              className="author__error"
              sx={{ color: redColor, mb: "15px" }}
            >
              {errorMessage}
            </Typography>
          )}

          {regState ? (
            <Button ref={refBtn} onClick={() => handlerLoginClick()}>
              Вход
            </Button>
          ) : (
            <Button
              ref={refBtn}
              onClick={() => handlerRegisterClick()}
              disabled={Object.values(registerInputError).some(
                (value) => value === true
              )}
            >
              Регистрация
            </Button>
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
