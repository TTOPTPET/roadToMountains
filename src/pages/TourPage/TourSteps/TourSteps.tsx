import { FC, useState } from "react";
import { tourStepsMap } from "../TourPage";
import { TourFirstPage } from "../TourFirstPage/TourFirstPage";
import { TourSecondPage } from "../TourSecondPage/TourSecondPage";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import dayjs from "dayjs";

interface TourStepsProps {
  page: tourStepsMap;
  setPage: (prop: any) => void;
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
  size: 0,
  tourAmount: 0,
  touristsInfo: [],
  comment: "",
};

export const TourSteps: FC<TourStepsProps> = ({ page, setPage, tourInfo }) => {
  const [images, setImage] = useState<any[]>([]);
  const [bookingData, setBookingData] = useState<ITourBooking>({
    ...tourBookingDefault,
    tourDate: {
      from: dayjs(new Date()).toISOString(),
      to: dayjs(tourInfo?.nearestDate?.to ?? new Date())
        .add(-1, "day")
        .toISOString(),
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
          page={page}
          setPage={setPage}
        />
      );
    }
    case tourStepsMap.second: {
      return (
        <TourSecondPage
          bookingData={bookingData}
          setBookingData={setBookingData}
          setPage={setPage}
          tourInfo={tourInfo}
        />
      );
    }
    default: {
      break;
    }
  }
};
