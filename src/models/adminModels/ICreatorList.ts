interface ICreatorDocuments {
  documentName: string;
  documentPath: string;
}

interface IDataUser {
  regisryId: string;
  ceratorType: string;
  statusVerify: string;
  changeVerifyDate: string;
  creatorDocuments: ICreatorDocuments[];
}

export interface ICreatorList {
  phone: string;
  email: string;
  name: string;
  creatorId: string;
  dataUser: IDataUser;
}
