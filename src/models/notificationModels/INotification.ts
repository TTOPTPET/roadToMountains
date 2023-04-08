export interface INotification {
  notifType?: string;
  createAt?: string;
  notifData?: {
    paymentStatus: string;
    amount: number;
    bookingId: number;
    tour?: {
      tourId: string;
      tourName: string;
      tourDate?: {
        from: string;
        to: string;
      };
    };
  };
}
