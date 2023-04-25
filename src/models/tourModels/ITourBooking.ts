import { Sex } from "../userModels/IUserInfo";

export interface ITourBooking {
  publicTourId?: string;
  creatorId?: string;
  tourId?: string;
  tourDate?: {
    from: string;
    to: string;
  };
  size?: number;
  tourAmount?: number;
  touristsInfo?: {
    name: string;
    age: string;
    sex: string;
  }[];
  comment?: string;
}

export interface ITouristBookingData {
  name: string;
  age: string;
  sex: string;
}
