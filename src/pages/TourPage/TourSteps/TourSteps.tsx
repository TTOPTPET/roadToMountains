import { FC, useState, useEffect } from "react";
import { tourStepsMap } from "../TourPage";
import { TourFirstPage } from "../TourFirstPage/TourFirstPage";
import { TourSecondPage } from "../TourSecondPage/TourSecondPage";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import dayjs from "dayjs";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";

interface TourStepsProps {
  page: tourStepsMap;
  setPage: (prop: any) => void;
  tourInfo: ITourInfo;
  bookingDate: ITourBookingDate[];
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

export const TourSteps: FC<TourStepsProps> = ({
  page,
  setPage,
  tourInfo,
  bookingDate,
}) => {
  const [images, setImage] = useState<any[]>([]);
  const [bookingData, setBookingData] =
    useState<ITourBooking>(tourBookingDefault);
  const [selectedDate, setSelectedDate] = useState<ITourBookingDate>(
    bookingDate[0]
  );

  useEffect(() => {
    setBookingData((data) => ({
      ...data,
      tourDate: {
        from: dayjs().toISOString(),
        to: dayjs(tourInfo?.nearestDate?.to).add(-1, "day").toISOString(),
      },
      creatorId: tourInfo?.creatorId,
      tourId: tourInfo?.id,
    }));
  }, [tourInfo]);

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
          bookingDate={bookingDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
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
          bookingDate={bookingDate}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      );
    }
    default: {
      break;
    }
  }
};
