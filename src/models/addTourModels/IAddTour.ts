export interface IAddTour {
  id?: string;
  tourName?: string;
  tourDescription?: string;
  category?: string;
  complexity?: string;
  region?: string;
  price?: number;
  photos?: (string | File)[];
  prices?: {
    from?: number;
    to?: number;
  };
  recommendedAge?: {
    from?: number;
    to?: number;
  };
  mapPoints?: [number, number][];
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
