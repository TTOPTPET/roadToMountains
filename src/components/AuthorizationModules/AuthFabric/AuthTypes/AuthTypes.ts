export interface ITextProps {
  name: string;
  value: string;
  type: string;
  required: boolean;
}

export interface ILoginComponent {
  login: ITextProps;
  password: ITextProps;
}

export interface IRegisterComponent {
  email: ITextProps;
  phone: ITextProps;
  password: ITextProps;
  passwordSecond: ITextProps;
}
