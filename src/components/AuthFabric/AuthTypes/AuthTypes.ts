import { IAdminLogin } from "../../../models/adminModels/IAdminLogin";
import { IAdminRegister } from "../../../models/adminModels/IAdminRegister";
import { IUserLogin } from "../../../models/authModels/IUserLogin";
import { IUserRegister } from "../../../models/authModels/IUserRegister";

interface IUserLoginComponent extends IUserLogin {
  type: "user-login";
}

interface IUserRegisterComponent extends IUserRegister {
  type: "user-register";
}

interface IAdminLoginComponent extends IAdminLogin {
  type: "admin-login";
}

interface IAdminRegisterComponent extends IAdminRegister {
  type: "admin-register";
}

export type IAuthComponent =
  | IUserLoginComponent
  | IUserRegisterComponent
  | IAdminLoginComponent
  | IAdminRegisterComponent;

export type LoginTypes = IUserLogin | IAdminLogin;

export type RegisterTypes = IUserRegister | IAdminRegister;
