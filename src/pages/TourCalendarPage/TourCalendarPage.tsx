import { Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";
import { getPublicTours } from "../../API/calendarAPI/getPublicTours";
import { CalendarSidebar } from "../../components/CalendarModules/CalendarSidebar/CalendarSidebar";
import { INewPublic } from "../../models/calendarModels/INewPublic";
import { ITour } from "../../models/tourCardModel/ITour";
import { getMyTours } from "../../API/creatorAPI/getMyTours";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import NewPublicModal from "../../components/Modals/NewPublicModal/NewPublicModal";
import { Calendar } from "../../components/CalendarModules/Calendar/Calendar";
import CalendarDatePicker from "../../components/CalendarModules/CalendarDatePicker/CalendarDatePicker";
import dayjs, { Dayjs } from "dayjs";

const NewPublicDefault: INewPublic = {
  tourId: "",
  tourDate: {
    from: "",
    to: "",
  },
  tourAmount: 0,
  contactInformation: "",
  meetingPoint: "",
  meetingTime: "",
  maxPersonNum: 0,
};

function TourCalendarPage() {
  const [publicTour, setPublicTour] = useState<IPublicTour[]>([]);
  const [newPublic, setNewPublic] = useState<INewPublic>(NewPublicDefault);
  const [myTours, setMyTours] = useState<ITour[]>([]);
  const [viewMonth, setViewMonth] = useState<Dayjs>(dayjs());

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
      (value) => setPublicTour(value),
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
            publicTour={publicTour}
            setNewPublic={setNewPublic}
          />
        </Grid>
        <Grid item xs={4}>
          <CalendarSidebar {...newPublic} />
          {/* Это говнище будет работать по клику, так что потом просто логику малесь переделать */}
        </Grid>
      </Grid>
      <NewPublicModal
        myTours={myTours}
        newPublic={newPublic}
        setNewPublic={setNewPublic}
      />
    </Box>
  );
}

export default TourCalendarPage;
