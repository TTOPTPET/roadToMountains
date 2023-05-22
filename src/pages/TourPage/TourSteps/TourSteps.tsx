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

export const TourSteps: FC<TourStepsProps> = ({
  page,
  setPage,
  tourInfo,
  bookingDate,
}) => {
  const [images, setImage] = useState<any[]>([]);
  const [bookingData, setBookingData] = useState<ITourBooking>({});
  const [selectedDate, setSelectedDate] = useState<ITourBookingDate>(
    bookingDate.reduce(
      (a, b) =>
        Number(dayjs(a?.date?.from).toDate()) - Number(new Date()) <
        Number(dayjs(b?.date?.from).toDate()) - Number(new Date())
          ? a
          : b,
      bookingDate[0]
    )
  );
  useEffect(() => {
    setBookingData((data) => ({
      ...data,
      tourDate: {
        from: selectedDate?.date?.from,
        to: selectedDate?.date?.to,
      },
      creatorId: tourInfo?.creatorId,
      tourId: tourInfo?.id,
      size: 0,
      tourAmount: selectedDate?.price,
      publicTourId: selectedDate?.publicTourId,
      touristsInfo: [],
    }));
  }, [tourInfo, selectedDate]);

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
