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

import React from "react";

function Authorization() {
  return <div>Authorization</div>;
}

export default Authorization;
