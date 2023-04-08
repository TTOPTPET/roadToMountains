export interface IBookingInfo {
  userInfo: {
    phone: string;
    email: string;
    name: string;
  };
  bookingId: string;
  tourAmount: number;
  bookingDate: {
    from: string;
    to: string;
  };
  touristsInfo: {
    name: string;
    age: string;
    sex: string;
  }[];
  comment: string;
}

export interface IPublicTour {
  publicTourId?: string;
  publicTourProfit?: number;
  meetingPoint?: string;
  meetingTime?: string;
  tourAmount?: number;
  bookingId?: number;
  contactInformation?: string;
  maxPersonNum?: number;
  personNum?: number;
  bookingNumber?: number;
  cancelDeadline?: string;
  updateDeadline?: string;
  tourDate?: {
    from: string;
    to: string;
  };
  bookingInfo?: IBookingInfo[];
  tour?: {
    tourId: string;
    tourName: string;
  };
}
