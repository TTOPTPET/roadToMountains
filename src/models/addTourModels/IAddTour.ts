export interface IAddTour {
  tourName?: string;
  tourDescription?: string;
  category?: string;
  complexity?: string;
  region?: string;
  price?: number;
  photos?: string[];
  prices?: {
    from?: number;
    to?: number;
  };
  recommendedAge?: {
    from?: number;
    to?: number;
  };
  mapPoints?: string[];
  housingInclude?: {
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
