export interface ITextProps {
  name: string;
  value: string;
  type: string;
  required: boolean;
  error: boolean;
}

export interface ILoginComponent {
  login: ITextProps;
  password: ITextProps;
}

export interface IRegisterComponent {
  email: ITextProps;
  name: ITextProps;
  phone: ITextProps;
  password: ITextProps;
  passwordSecond: ITextProps;
}
