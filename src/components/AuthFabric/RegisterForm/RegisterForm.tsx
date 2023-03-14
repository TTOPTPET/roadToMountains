import { ChangeEvent, FC } from "react";
import { RegisterTypes } from "../AuthTypes/AuthTypes";
import { Stack, TextField } from "@mui/material";

interface IRegisterFormProps {
  userData: RegisterTypes;
  setUserData: (
    key: keyof RegisterTypes,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const RegisterForm: FC<IRegisterFormProps> = ({
  userData,
  setUserData,
}: IRegisterFormProps) => {
  return (
    <Stack direction={"column"}>
      <div className="author__auth">
        <TextField
          label={"Имя"}
          style={{ width: "100%" }}
          value={userData.name}
          variant={"standard"}
          required={true}
          onChange={(e) => setUserData("name", e)}
        />
        <TextField
          label={"Номер телефона"}
          style={{ width: "100%" }}
          value={userData.phone}
          variant={"standard"}
          required={true}
          onChange={(e) => setUserData("phone", e)}
        />
        <TextField
          label={"Электронная почта"}
          style={{ width: "100%" }}
          value={userData.email}
          variant={"standard"}
          required={true}
          onChange={(e) => setUserData("email", e)}
        />
        <TextField
          label={"Пароль"}
          style={{ width: "100%" }}
          value={userData.email}
          variant={"standard"}
          type={"password"}
          required={true}
          onChange={(e) => setUserData("email", e)}
        />
        <TextField
          label={"Повторить пароль"}
          style={{ width: "100%" }}
          value={userData.email}
          variant={"standard"}
          type={"password"}
          required={true}
          onChange={(e) => setUserData("email", e)}
        />
      </div>
    </Stack>
  );
};
