export interface ITourBookingDate {
  bookingNumber?: number;
  contactInformation?: string;
  date?: {
    from: string;
    to: string;
  };
  meetingPoint?: string;
  meetingTime?: string;
  price?: number;
  publicTourId: string;
}
