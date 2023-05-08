import { SetStateAction, Dispatch } from "react";
import { ITour } from "../../../models/tourCardModel/ITour";
import { IFilter } from "../../../models/tourListModels/IFilter";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";

export interface IFilterProps {
  filters: IFilter;
  searchData: ISearchRequest;
  setSearchData: Dispatch<SetStateAction<ISearchRequest>>;
  setTours: Dispatch<SetStateAction<ITour[]>>;
}
