import { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { IAuthComponent } from "./AuthTypes/AuthTypes";
import { LoginForm } from "./LoginForm/LoginForm";
import { Button, Link, Stack, Typography } from "@mui/material";
import { IUserLogin } from "../../models/authModels/IUserLogin";
import { loginUser } from "../../submitFunctions/authAPI";

interface IAuthComponentProps {
  props: IAuthComponent;
  setUserData: Dispatch<SetStateAction<any>>;
  setRegState: Dispatch<SetStateAction<boolean>>;
}

export const AuthComponent: FC<IAuthComponentProps> = ({
  props,
  setUserData,
  setRegState,
}: IAuthComponentProps) => {
  const handlerUpdateField = (
    key: keyof IAuthComponent,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUserData({ ...props, [key]: e.target.value });
  };

  switch (props.type) {
    case "user-login": {
      const { email, password, phone } = props;

      const handlerUserLogin = (params: string, data: IUserLogin) => {
        loginUser((value) => value, params, data, undefined, true);
        setUserData(null);
      };

      return (
        <Stack textAlign={"center"} padding={1} gap={2}>
          <Typography component={"h1"} fontSize={50}>
            Вход
          </Typography>
          <LoginForm
            userData={{ email, password, phone }}
            setUserData={handlerUpdateField}
          />
          <Button
            onClick={() =>
              handlerUserLogin(props.type, { email, password, phone })
            }
            sx={{ width: "50%", margin: "0 auto" }}
          >
            Вход
          </Button>
          <Stack direction={"row"} margin={"0 auto"}>
            <Typography component={"h5"}>Нет аккаунта? </Typography>
            <Link component={"button"} onClick={() => setRegState(false)}>
              Зарегистрироваться
            </Link>
          </Stack>
        </Stack>
      );
    }
    case "user-register": {
      return (
        <>
          {" "}
          <Link component={"button"} onClick={() => setRegState(true)}>
            Назад
          </Link>
        </>
      );
    }
    case "admin-login": {
      return <></>;
    }
    case "admin-register": {
      return <></>;
    }
  }
};
