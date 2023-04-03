export interface ITourInfo {
  photos?: string[];
  tourName?: string;
  tourDescription?: string;
  category?: string;
  complexity?: string;
  region?: string;
  nearestDate?: {
    from: string;
    to: string;
  };
  price?: {
    from: number;
    to: number;
  };
  recommendedAge?: {
    from?: number;
    to?: number;
  };
  mapPoints?: string[];
  housingInclud?: {
    housingName: string;
    housingAddress: string;
    housingDescription?: string;
  };
  insuranceInclude?: {
    insuranceNumber: number;
    insuranceAmount: number;
  };
  recommendations?: string[];
  tourServices?: {
    freeServices?: string[];
    additionalServices?: string[];
  };
}
