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
  name: ITextProps;
  login: ITextProps;
  password: ITextProps;
  passwordSecond: ITextProps;
}
