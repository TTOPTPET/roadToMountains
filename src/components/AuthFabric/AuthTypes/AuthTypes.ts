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
  phone: ITextProps;
  email: ITextProps;
  name: ITextProps;
  password: ITextProps;
}
