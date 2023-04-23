import { FC, useState } from "react";
import { tourStepsMap } from "../TourPage";
import { TourFirstPage } from "../TourFirstPage/TourFirstPage";
import { TourSecondPage } from "../TourSecondPage/TourSecondPage";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import dayjs from "dayjs";

interface TourStepsProps {
  page: tourStepsMap;
  tourInfo: ITourInfo;
}

const tourBookingDefault: ITourBooking = {
  publicTourId: "",
  creatorId: "",
  tourId: "",
  tourDate: {
    from: "",
    to: "",
  },
  tourAmount: 0,
  touristsInfo: [],
  comment: "",
};

export const TourSteps: FC<TourStepsProps> = ({ page, tourInfo }) => {
  const [images, setImage] = useState<any[]>([]);
  const [bookingData, setBookingData] = useState<ITourBooking>({
    ...tourBookingDefault,
    tourDate: {
      from: new Date().toString(),
      to: dayjs(tourInfo?.nearestDate?.from ?? new Date())
        .add(-1, "day")
        .format("D MMMM YYYY"),
    },
  });

  switch (page) {
    case tourStepsMap.first: {
      return (
        <TourFirstPage
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
          bookingData={bookingData}
          setBookingData={setBookingData}
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
