import { FC, useState } from "react";
import { tourStepsMap } from "../TourPage";
import { TourFirstPage } from "../TourFirstPage/TourFirstPage";
import { TourSecondPage } from "../TourSecondPage/TourSecondPage";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";

interface TourStepsProps {
  page: tourStepsMap;
  tourInfo: ITourInfo;
}

export const TourSteps: FC<TourStepsProps> = ({ page, tourInfo }) => {
  const [images, setImage] = useState<any[]>([]);

  switch (page) {
    case tourStepsMap.first: {
      return (
        <TourFirstPage
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
        />
      );
    }
    case tourStepsMap.second: {
      return <TourSecondPage />;
    }
    default: {
      break;
    }
  }
};
