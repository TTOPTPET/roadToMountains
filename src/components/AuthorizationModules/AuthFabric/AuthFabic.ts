import { ILoginComponent, IRegisterComponent } from "./AuthTypes/AuthTypes";

export const AuthComponent = (
  type: string
): ILoginComponent | IRegisterComponent => {
  switch (type) {
    case "login": {
      const loginComponent: ILoginComponent = {
        login: {
          name: "Логин",
          required: true,
          type: "",
          value: "",
        },
        password: {
          name: "Пароль",
          required: true,
          type: "password",
          value: "",
        },
      };
      return loginComponent;
    }
    case "register": {
      const registerComponent: IRegisterComponent = {
        email: {
          name: "Почта",
          required: true,
          type: "",
          value: "",
        },
        phone: {
          name: "Телефон",
          required: true,
          type: "",
          value: "",
        },
        password: {
          name: "Пароль",
          required: true,
          type: "password",
          value: "",
        },
        passwordSecond: {
          name: "Повторите пароль",
          required: true,
          type: "password",
          value: "",
        },
      };

      return registerComponent;
    }
  }
};
