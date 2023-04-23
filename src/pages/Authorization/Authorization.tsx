// import React, { useState, useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import InputField from "../../components/InputField/InputField";
// import { login } from "../../components/submitFunctions/autorizationAPI";
// import { TOKEN } from "../../config/types";
// import { useCookies } from "react-cookie";
// import "./Authorization.css";

// function Authorization({}) {
//   const [cookies, setCookie, removeCookie] = useCookies();
//   let navigate = useNavigate();
//   let location = useLocation();
//   const [regState, setRegState] = useState(false);

//   const ref = useRef();
//   const refBtn = useRef();

//   //TODO: Сделать нормальный обработчик
//   useEffect(() => {
//     document.addEventListener("keydown", (e) => {
//       console.log("e", e);
//       const event = new MouseEvent("click", {
//         view: window,
//         bubbles: true,
//         cancelable: true,
//       });
//       location?.pathname === "/auth" &&
//         e.code === "Enter" &&
//         refBtn.current.dispatchEvent(event);
//     });
//   }, []);

//   const [userData, setUserData] = useState({
//     login: "",
//     password: "",
//     userName: "",
//   });
//   const [errAuth, setErrAuth] = useState(false);

//   //TODO: Переделать ошибки полей
//   useEffect(() => {
//     if (errAuth) {
//       setErrAuth(false);
//     }
//   }, [userData, regState]);

//   return (
//     <div className="author" ref={ref}>
//       <div className="author__wrapp">
//         {/* {tokenTimeOut ? (
//           <div className="author__time-out">Истекло время сессии</div>
//         ) : null} */}
//         <div className="author__text">{regState ? "Регистрация" : "Вход"}</div>
//         <div className="author__login">
//           <InputField
//             fieldID={"login"}
//             label={"Логин"}
//             style={{ width: "100%" }}
//             value={userData.login}
//             setValue={(value) => setUserData((ud) => ({ ...ud, login: value }))}
//           ></InputField>
//           <InputField
//             fieldID={"password"}
//             label={"Пароль"}
//             style={{ width: "100%" }}
//             value={userData.password}
//             setValue={(value) =>
//               setUserData((ud) => ({ ...ud, password: value }))
//             }
//           ></InputField>
//           <div
//             className="author__register"
//             style={regState ? null : { maxHeight: 0 }}
//           >
//             <InputField
//               fieldID={"userName"}
//               label={"Имя"}
//               style={{ width: "100%" }}
//               value={userData.userName}
//               setValue={(value) =>
//                 setUserData((ud) => ({ ...ud, userName: value }))
//               }
//             ></InputField>
//           </div>
//         </div>
//         <div className="author__error" style={{ height: errAuth ? "" : 0 }}>
//           {errAuth ? "Неверный логин или пароль" : ""}
//         </div>
//         <div
//           className="author__btn"
//           ref={refBtn}
//           onClick={() =>
//             login(userData, regState).then(
//               (resp) => {
//                 setCookie(TOKEN, resp?.data?.access_token);
//                 navigate("/");
//               },
//               (err) => console.error(err)
//             )
//           }
//         >
//           {regState ? "Зарегистрироваться" : "Войти"}
//         </div>
//         <div className="author__toggle" onClick={() => setRegState(!regState)}>
//           {regState ? "Вход" : "Регистрация"}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Authorization;

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
import { AuthComponent } from "../../components/AuthFabric/AuthFabic";
import { IUserLogin } from "../../models/authModels/IUserLogin";
import { IUserRegister } from "../../models/authModels/IUserRegister";
import {
  ILoginComponent,
  IRegisterComponent,
  ITextProps,
} from "../../components/AuthFabric/AuthTypes/AuthTypes";
import {
  confirmUserRegistration,
  loginUser,
  registerUser,
} from "../../submitFunctions/authAPI";
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
          <Stack sx={{ width: "450px", gap: "15px", mb: "30px" }}>
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
            <>
              <Typography variant={"h5"}>
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
            </>
          ) : (
            <></>
          )}
          <Box>
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
          <Stack direction={"row"}>
            {regState ? (
              <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
                <Typography variant="caption">Нет аккаунта?</Typography>
                <Button variant="weakTextButton" onClick={handlerOnTransition}>
                  Зарегистрироваться
                </Button>
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", mt: "10px" }}>
                  <Typography variant="caption">Уже есть аккаунт?</Typography>
                  <Button
                    variant="weakTextButton"
                    onClick={handlerOnTransition}
                  >
                    Войти
                  </Button>
                </Box>
              </>
            )}
          </Stack>
        </Paper>
      </Box>
    </Stack>
  );
}

export default Authorization;
