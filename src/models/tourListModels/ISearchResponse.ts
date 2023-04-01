export interface ISearchResponse {
  tourId: string;
  tourName: string;
  category: string;
  complexity?: string;
  price: {
    from: number;
    to?: number;
  };
  region: string;
  tourDate: {
    from: string;
    to: string;
  };
  maxPersonNumber?: number;
}
