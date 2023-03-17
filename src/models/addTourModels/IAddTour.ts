export interface IRecomendedAge {
  from: number;
  to: number;
}

export interface IAddTour {
  tourName: string;
  tourDescription: string;
  category: string;
  region: string;
  recomendedAge: IRecomendedAge;
  price: number;
}
