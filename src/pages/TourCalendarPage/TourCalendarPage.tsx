import { Box, Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";
import { getPublicTours } from "../../submitFunctions/calendarAPI/getPublicTours";
import { CalendarSidebar } from "../../components/CalendarSidebar/CalendarSidebar";
import { INewPublic } from "../../models/calendarModels/INewPublic";
import { ITour } from "../../models/tourCardModel/ITour";
import { getMyTours } from "../../submitFunctions/creatorAPI/getMyTours";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import NewPublicModal from "../../components/Modals/NewPublicModal/NewPublicModal";
import { Calendar } from "../../components/Calendar/Calendar";

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
  const dispatch = useDispatch();

  useEffect(() => {
    getMyTours(
      (value) => {
        setMyTours(value);
      },
      undefined,
      true
    );
  }, []);

  useEffect(() => {
    getPublicTours(
      { calendarDate: "2018-04-04T16:00:00.000Z" },
      (value) => setPublicTour(value),
      undefined,
      true
    );
  }, []);

  return (
    <Box pt={10}>
      <Grid container spacing={8}>
        <Grid item xs={8}>
          <Calendar />
        </Grid>
        <Grid item xs={4}>
          <CalendarSidebar {...publicTour[0]} />
          {/* Это говнище будет работать по клику, так что потом просто логику малесь переделать */}
        </Grid>
      </Grid>
      <Button onClick={() => dispatch(setModalActive("newPublicModal"))}>
        Модалка
      </Button>
      <NewPublicModal
        myTours={myTours}
        newPublic={newPublic}
        setNewPublic={setNewPublic}
      />
    </Box>
  );
}

export default TourCalendarPage;
