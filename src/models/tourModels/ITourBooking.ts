import { Sex } from "../userModels/IUserInfo";

export interface ITourBooking {
  publicTourId: string;
  creatorId: string;
  tourId: string;
  tourDate: {
    from: string;
    to: string;
  };
  tourAmount: number;
  touristsInfo: {
    name: string;
    age: string;
    sex: Sex;
  }[];
  comment: string;
}
