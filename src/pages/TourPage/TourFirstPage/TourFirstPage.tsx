import { FC, SetStateAction, Dispatch } from "react";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { Stack, Typography, Avatar as MuiAvatar, Paper } from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";
import { TourBooking } from "../../../components/TourInfo/TourBooking/TourBooking";
import { tourStepsMap } from "../TourPage";
import { ITourBookingDate } from "../../../models/tourModels/ITourBookingDate";
import { baseUrl } from "../../../config/config";
import userPhoto from "../../../media/userPhoto.svg";

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
  return (
    <>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography variant={"h3"} marginBottom={1}>
          {tourInfo?.tourName ?? "Название тура"}
        </Typography>
        <Stack direction={"row"} gap={"20px"} alignItems={"center"}>
          <Paper
            variant="avatarBg"
            className="tourInfo__creator-avatar"
            sx={{
              width: "70px",
              height: "70px",
            }}
          >
            {tourInfo && tourInfo?.creatorInfo?.photo ? (
              <MuiAvatar
                src={baseUrl + "/" + tourInfo?.creatorInfo?.photo}
                alt="user avatar"
                sx={{ width: "70px", height: "70px" }}
              />
            ) : (
              <img src={userPhoto} alt="person icon" />
            )}
          </Paper>

          <Typography variant={"button"}>
            {tourInfo?.creatorInfo?.creatorType
              ? tourInfo?.creatorInfo?.creatorType === "SELF"
                ? ""
                : tourInfo?.creatorInfo?.creatorType === "OOO"
                ? "ООО"
                : "ИП"
              : ""}{" "}
            {tourInfo?.creatorInfo?.name
              ? tourInfo?.creatorInfo?.creatorType === "SELF"
                ? tourInfo?.creatorInfo?.name
                : `"${tourInfo?.creatorInfo?.name}"`
              : "Название компании"}
          </Typography>
        </Stack>
      </Stack>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo={false}
        tourInfo={tourInfo}
        isEditing={false}
      />
      {bookingDate.length === 0 ? (
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
