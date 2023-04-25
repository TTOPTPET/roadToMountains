export interface INewPublic {
  tourId: string;
  tourDate: {
    from: string;
    to: string;
  };
  tourAmount: number;
  contactInformation: string;
  meetingPoint: string;
  meetingTime: string;
  maxPersonNum: number;
}
