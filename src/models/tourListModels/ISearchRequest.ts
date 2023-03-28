export interface ISearchRequest {
  searchParam: string;
  category: string[];
  tourDuration: {
    from: number;
    to: number;
  };
  complexity: string[];
  price: {
    from: number;
    to: number;
  };
  recommendedAge: {
    from: number;
    to: number;
  };
  region: string;
  tourDate: {
    from: string;
    to: string;
  };
  maxPersonNumber: number;
}
