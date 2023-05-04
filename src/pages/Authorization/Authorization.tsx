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
import { lightTurquoiseColor } from "../../config/MUI/color/color";
import EnterMobileCodeModal from "../../components/Modals/EnterMobileCodeModal/EnterMobileCodeModal";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import { UserType } from "../../models/userModels/IUserInfo";

const registerTypes = [
  { id: UserType.creator, name: "туросоздатель" },
  { id: UserType.tourist, name: "турист" },
];

function Authorization() {
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

  const dispatch = useDispatch();

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
      },
      userRegisterData,
      undefined,
      false
    );
    console.log(codeStatus);

    dispatch(setModalActive("enterMobileCodeModal"));
  };

  const handlerLoginClick = () => {
    loginUser(userLoginData, undefined, undefined, false);
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
          {regState ? (
            <Button onClick={handlerLoginClick}>Вход</Button>
          ) : (
            <Button onClick={handlerRegisterClick}>Регистрация</Button>
          )}
          <EnterMobileCodeModal />

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
