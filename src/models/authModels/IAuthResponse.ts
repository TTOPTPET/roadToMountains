import { ICreatorInfo, ITouristInfo } from "../userModels/IUserInfo";

export interface IAuthResponse {
  accessTocken?: string;
  refreshTocken?: string;
  userInfo?: ICreatorInfo | ITouristInfo;
}
