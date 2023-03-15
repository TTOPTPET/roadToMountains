export interface ITextProps {
  name: string;
  value: string;
  type: string;
  required: boolean;
}

export interface ILoginComponent {
  //phone: ITextProps;
  email: ITextProps;
  password: ITextProps;
}

export interface IRegisterComponent {
  phone: ITextProps;
  email: ITextProps;
  name: ITextProps;
  password: ITextProps;
}
