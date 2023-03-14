import { ChangeEvent, FC } from "react";
import { LoginTypes } from "../AuthTypes/AuthTypes";
import { Stack, TextField } from "@mui/material";

interface ILoginFormProps {
  userData: LoginTypes;
  setUserData: (
    key: keyof LoginTypes,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

export const LoginForm: FC<ILoginFormProps> = ({
  userData,
  setUserData,
}: ILoginFormProps) => {
  return (
    <Stack direction={"column"}>
      <div className="author__auth">
        <TextField
          label={"Логин"}
          style={{ width: "100%" }}
          value={userData.email}
          variant={"standard"}
          required={true}
          onChange={(e) => setUserData("email", e)}
        />
        <TextField
          label={"Пароль"}
          style={{ width: "100%" }}
          value={userData.password}
          variant={"standard"}
          type={"password"}
          required={true}
          onChange={(e) => setUserData("password", e)}
        />
      </div>
    </Stack>
  );
};
