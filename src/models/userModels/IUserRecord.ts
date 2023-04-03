export interface IUserRecord {
  publicTourId: string;
  bookingId: number;
  bookingStatus: {
    payment: string;
    cancellation: string;
    past: boolean;
  };
  tourDate: {
    from: string;
    to: string;
  };
  tourAmount: number;
  contactInformation: string;
  meetingPoint: string;
  meetingTime: string;
  bookingNumber: number;
  tour: {
    tourId: string;
    tourName: string;
    housingInclud?: {
      housingName: string;
      housingAddress: string;
      housingDescription?: string;
    };
    insuranceInclude?: {
      insuranceNumber: number;
      insuranceAmount: number;
    };
    freeServices?: string[];
  };
}