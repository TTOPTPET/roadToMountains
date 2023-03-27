export enum CreatorType {
  OOO = "OOO",
  IP = "IP",
  SELF = "SELF",
}

export enum StatusVerify {
  notVerified = "notVerified",
  verified = "verified",
  sendVerified = "sendVerified",
}

export enum Sex {
  male = "мужской",
  female = "женский",
  other = "другое",
}

export enum UserType {
  admin = "admin",
  tourist = "tourist",
  creator = "creator",
}

interface IBaseUserInfo {
  photo?: string;
  name?: string;
  phone?: string;
  email?: string;
  banStatus?: boolean;
  typeUser?: UserType;
  id?: string;
  createAt?: string;
}

export interface CreatorDocuments {
  docName?: string;
  docUrl?: string;
}

export interface ICreatorOOOFields {
  innOOO?: string;
  kppOOO?: string;
  ogrnOOO?: string;
  okpoOOO?: string;
  okatoOOO?: string;
  okvedOOO?: string;
  urAdress?: string;
  registryId?: string;
}
interface ICreatorIPFields {
  innIP?: string;
  egripIP?: string;
  adressIP?: string;
  ogrnipIP?: string;
}
interface ICreatorSELFFields {
  innSELF?: string;
  adressSELF?: string;
  pasportSELF?: string;
}
export interface ICreatorOOOData extends IBaseUserInfo {
  type?: strongUserType.CreatorOOO;
  dataUser?: {
    documents?: CreatorDocuments[];
    dataVerify?: string;
    creatorType?: CreatorType;
    statusVerify?: StatusVerify;
    fieldsCreator?: ICreatorOOOFields;
  };
}

interface ICreatorIPData extends IBaseUserInfo {
  type?: strongUserType.CreatorIP;
  dataUser?: {
    documents?: CreatorDocuments[];
    dataVerify?: string;
    creatorType?: CreatorType;
    statusVerify?: StatusVerify;
    fieldsCreator?: ICreatorIPFields;
  };
}
interface ICreatorSELFData extends IBaseUserInfo {
  type?: strongUserType.CreatorSELF;
  dataUser?: {
    documents?: CreatorDocuments[];
    dataVerify?: string;
    creatorType?: CreatorType;
    statusVerify?: StatusVerify;
    fieldsCreator?: ICreatorSELFFields;
  };
}

interface ITouristData extends IBaseUserInfo {
  type?: strongUserType.Tourist;
  dataUser?: { sex: Sex; region: string };
}

export type IUserInfo =
  | ITouristData
  | ICreatorIPData
  | ICreatorOOOData
  | ICreatorSELFData;

export enum strongUserType {
  Tourist,
  CreatorSELF,
  CreatorIP,
  CreatorOOO,
}
