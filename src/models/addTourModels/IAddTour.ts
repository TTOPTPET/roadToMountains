export interface IAddTour {
  tourName?: string;
  tourDescription?: string;
  category?: string;
  complexity?: string;
  region?: string;
  price?: number;
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
