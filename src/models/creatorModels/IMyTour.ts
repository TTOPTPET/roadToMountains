export interface IMyTour {
    tourId: string;
    tourName: string;
    category: string;
    complexity: string;
    price: {
      from: number;
      to: number;
    };
    region: string;
    tourDate: {
      from: string;
      to: string;
    };
    personsNumber: number;
    photo: string[];
    banStatus: boolean;
    publicNum: number;
  }