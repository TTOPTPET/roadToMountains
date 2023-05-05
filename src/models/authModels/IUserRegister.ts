import { UserType } from "../userModels/IUserInfo";

export interface IUserRegister {
  email: string;
  phone: string;
  password: string;
  passwordSecond?: string;
  typeUser: UserType | null;
}
