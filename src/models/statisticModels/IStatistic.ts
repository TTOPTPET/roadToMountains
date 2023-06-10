export enum TourStatus {
  deleted = "deleted",
  banned = "banned",
  published = "published",
  nonPublished = "nonPublished",
}

export interface IStatistic {
  tourName?: string;
  tourStatus?: TourStatus;
  tourAmount?: number;
  personNum?: number;
  stats: {
    name?: string;
    lables?: string[];
    data?: number[];
    units?: string;
  }[];
}
