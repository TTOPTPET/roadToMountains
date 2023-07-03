export enum CreatorType {
  OOO = "OOO",
  IP = "IP",
  SELF = "SELF",
}

export enum StatusVerify {
  notVerified = "notVerified",
  verified = "verified",
  sendVerified = "sendVerified",
  waitVerified = "waitVerified",
}

export enum Sex {
  male = "мужской",
  female = "женский",
}

export enum UserType {
  admin = "admin",
  tourist = "tourist",
  creator = "creator",
}

export interface CreatorDocuments {
  documentName: string;
  documentPath?: string;
  file?: File;
  tempId?: string;
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
export interface ICreatorOOOData {
  changeStatus?: boolean;
  timeToSend?: string;
  documents?: CreatorDocuments[];
  dataVerify?: string;
  creatorType?: CreatorType.OOO;
  statusVerify?: StatusVerify;
  fieldsCreator?: ICreatorOOOFields;
}

export interface ICreatorIPData {
  changeStatus?: boolean;
  timeToSend?: string;
  documents?: CreatorDocuments[];
  dataVerify?: string;
  creatorType?: CreatorType.IP;
  statusVerify?: StatusVerify;
  fieldsCreator?: ICreatorIPFields;
}
export interface ICreatorSELFData {
  changeStatus?: boolean;
  timeToSend?: string;
  documents?: CreatorDocuments[];
  dataVerify?: string;
  creatorType?: CreatorType.SELF;
  statusVerify?: StatusVerify;
  fieldsCreator?: ICreatorSELFFields;
}

export interface ITouristData {
  sex: Sex;
  region: string;
}

interface IUserInfo {
  photo?: string | File;
  name?: string;
  phone?: string;
  email?: string;
  banStatus?: boolean;
  id?: string;
  createAt?: string;
}
export interface ICreatorInfo extends IUserInfo {
  typeUser?: UserType.creator;
  dataUser?: ICreatorOOOData | ICreatorIPData | ICreatorSELFData;
}

export interface ITouristInfo extends IUserInfo {
  typeUser?: UserType.tourist;
  dataUser?: ITouristData;
}
