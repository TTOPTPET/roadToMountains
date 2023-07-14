import { FC, SetStateAction, Dispatch } from "react";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import {
  Stack,
  Typography,
  Avatar as MuiAvatar,
  Paper,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { TourBooking } from "../../../components/TourInfo/TourBooking/TourBooking";
import { tourStepsMap } from "../TourPage";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";

import { Cookies } from "react-cookie";
import { USER_ROLE } from "../../../config/types";
import { UserType } from "../../../models/userModels/IUserInfo";
import TourCreatorInfo from "../TourCreatorInfo/TourCreatorInfo";

interface TourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: ITourInfo;
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  page: tourStepsMap;
  setPage: (prop: any) => void;
  bookingDate: ITourBookingDate[];
  selectedDate: ITourBookingDate;
  setSelectedDate: Dispatch<SetStateAction<ITourBookingDate>>;
}

let cookie = new Cookies();

export const TourFirstPage: FC<TourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
  bookingData,
  setBookingData,
  page,
  setPage,
  bookingDate,
  selectedDate,
  setSelectedDate,
}) => {
  const theme = useTheme();

  const lessThenSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const upperThenMid = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography variant={lessThenSmall ? "h4" : "h3"} marginBottom={1}>
          {tourInfo?.tourName || "Название тура"}
        </Typography>
        {upperThenMid && <TourCreatorInfo tourInfo={tourInfo} />}
      </Stack>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo={false}
        tourInfo={tourInfo}
        isEditing={false}
      />
      {bookingDate.length === 0 ||
      cookie.get(USER_ROLE) === UserType.creator ? (
        <></>
      ) : (
        <TourBooking
          tourInfo={tourInfo}
          bookingData={bookingData}
          setBookingData={setBookingData}
          setPage={setPage}
          bookingDate={bookingDate}
          isFirstPage
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
      )}
    </>
  );
};
