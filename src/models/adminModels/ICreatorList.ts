interface ICreatorDocuments {
  filename: string;
  path: string;
}

interface IDataUser {
  regisryId?: string;
  ceratorType?: string;
  statusVerify?: string;
  changeVerifyDate?: string;
  documents?: ICreatorDocuments[];
}

export interface ICreatorList {
  phone?: string;
  banStatus?: boolean;
  email?: string;
  name?: string;
  creatorId?: string;
  dataUser?: IDataUser;
}
