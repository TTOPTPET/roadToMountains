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
import { Button, Link, Stack, TextField, Typography } from "@mui/material";
import { AuthComponent } from "../../components/AuthFabric/AuthFabic";
import { IUserLogin } from "../../models/authModels/IUserLogin";
import { IUserRegister } from "../../models/authModels/IUserRegister";
import {
  ILoginComponent,
  IRegisterComponent,
  ITextProps,
} from "../../components/AuthFabric/AuthTypes/AuthTypes";

function Authorization() {
  const loginDefault: IUserLogin = {
    email: "",
    password: "",
    phone: "",
  };
  const registerDefault: IUserRegister = {
    email: "",
    name: "",
    password: "",
    phone: "",
    typeUser: "",
  };
  const [userLoginData, setUserLoginData] = useState<IUserLogin>(loginDefault);
  const [userRegisterData, setUserRegisterData] =
    useState<IUserRegister>(registerDefault);
  const [regState, setRegState] = useState<boolean>(true);

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

  const hadnlerOnTransition = () => {
    setUserLoginData(loginDefault);
    setUserRegisterData(registerDefault);
    setRegState(!regState);
  };

  return (
    <Stack width={"30%"} margin={"0 auto"}>
      <Typography component={"h1"} fontSize={"50"}>
        {regState ? "Вход" : "Регистрация"}
      </Typography>
      {regState
        ? Object.entries<ITextProps>(
            AuthComponent("login") as unknown as { [s: string]: ITextProps }
          ).map(([key, value], index) => (
            <TextField
              key={index}
              label={value.name}
              type={value.type}
              required={value.required}
              value={userLoginData[key as keyof ILoginComponent]}
              onChange={(e) =>
                handlerUpdateLoginField(key as keyof ILoginComponent, e)
              }
            />
          ))
        : Object.entries<ITextProps>(
            AuthComponent("register") as unknown as { [s: string]: ITextProps }
          ).map(([key, value], index) => (
            <TextField
              key={index}
              label={value.name}
              type={value.type}
              required={value.required}
              value={userRegisterData[key as keyof IRegisterComponent]}
              onChange={(e) =>
                handlerUpdateRegisterField(key as keyof IRegisterComponent, e)
              }
            />
          ))}
      {regState ? <Button>Вход</Button> : <Button>Регистрация</Button>}
      <Stack direction={"row"}>
        {regState ? (
          <>
            <Typography component={"h5"}>Нет аккаунта?</Typography>
            <Link component={"button"} onClick={hadnlerOnTransition}>
              Зарегистрироваться
            </Link>
          </>
        ) : (
          <>
            <Typography component={"h5"}>Уже есть аккаунт?</Typography>
            <Link component={"button"} onClick={hadnlerOnTransition}>
              Войти
            </Link>
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default Authorization;