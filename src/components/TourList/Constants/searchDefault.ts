import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";

export const searchDefault: ISearchRequest = {
  searchParam: "",
  category: [],
  tourDuration: {
    from: 0,
    to: 0,
  },
  complexity: [],
  prices: {
    from: 0,
    to: 5000,
  },
  recommendedAge: {
    from: 0,
    to: 14,
  },
  region: "",
  tourDate: {
    from: null,
    to: null,
  },
  maxPersonNumber: 0,
};
