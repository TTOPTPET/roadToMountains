import { ILoginComponent, IRegisterComponent } from "./AuthTypes/AuthTypes";

export const AuthComponent = (
  type: string
): ILoginComponent | IRegisterComponent => {
  switch (type) {
    case "login": {
      const loginComponent: ILoginComponent = {
        email: {
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
        name: {
          name: "Имя",
          required: false,
          type: "",
          value: "",
        },
        phone: {
          name: "Номер телефона",
          required: true,
          type: "",
          value: "",
        },
        email: {
          name: "Электронная почта",
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

      return registerComponent;
    }
  }
};
