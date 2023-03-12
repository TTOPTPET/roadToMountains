interface ICreatorInfo {
  creatorId: string;
  name: string;
  phone: string;
  email: string;
}

export interface ITourList {
  tourId: string;
  tourName: string;
  creatorInfo: ICreatorInfo;
  banStatus: boolean;
}
