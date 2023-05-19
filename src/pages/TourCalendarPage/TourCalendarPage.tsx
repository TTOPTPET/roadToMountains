import { Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";
import { getPublicTours } from "../../API/calendarAPI/getPublicTours";
import CalendarSidebar from "../../components/CalendarModules/CalendarSidebar/CalendarSidebar";
import { ITour } from "../../models/tourCardModel/ITour";
import { getMyTours } from "../../API/creatorAPI/getMyTours";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import NewPublicModal from "../../components/Modals/NewPublicModal/NewPublicModal";
import { Calendar } from "../../components/CalendarModules/Calendar/Calendar";
import CalendarDatePicker from "../../components/CalendarModules/CalendarDatePicker/CalendarDatePicker";
import dayjs, { Dayjs } from "dayjs";
import ConfirmCancelPostedTourModal from "../../components/Modals/ConfirmCancelPostedTourModal/ConfirmCancelPostedTourModal";
import BookingInfoModal from "../../components/Modals/BookingInfoModal/BookingInfoModal";

function TourCalendarPage() {
  const [publicTours, setPublicTours] = useState<IPublicTour[]>([]);
  const [selectedPublic, setSelectedPublic] = useState<IPublicTour>();
  const [myTours, setMyTours] = useState<ITour[]>([]);
  const [viewMonth, setViewMonth] = useState<Dayjs>(dayjs());
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    getMyTours(
      (value) => {
        setMyTours(value);
      },
      undefined,
      false
    );
  }, []);

  useEffect(() => {
    getPublicTours(
      { calendarDate: viewMonth.toISOString() },
      (value) => setPublicTours(value),
      undefined,
      false
    );
  }, [viewMonth]);

  return (
    <Box pt={10}>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <CalendarDatePicker
            viewMonth={viewMonth}
            setViewMonth={setViewMonth}
          />
          <Calendar
            viewMonth={viewMonth}
            publicTours={publicTours}
            selectedPublic={selectedPublic}
            setSelectedPublic={setSelectedPublic}
          />
        </Grid>
        <Grid item xs={4}>
          <CalendarSidebar
            selectedPublic={selectedPublic}
            setErrorMessage={setErrorMessage}
            errorMessage={errorMessage}
            setSelectedPublic={setSelectedPublic}
            setPublicTours={setPublicTours}
          />
          {/* Это говнище будет работать по клику, так что потом просто логику малесь переделать */}
        </Grid>
      </Grid>
      <NewPublicModal
        myTours={myTours}
        selectedPublic={selectedPublic}
        setSelectedPublic={setSelectedPublic}
        setPublicTours={setPublicTours}
      />
      {selectedPublic?.bookingInfo && (
        <BookingInfoModal selectedBooking={selectedPublic} />
      )}
    </Box>
  );
}

export default TourCalendarPage;
