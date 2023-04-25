import { Button, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { IPublicTour } from "../../models/calendarModels/IPublicTour";
import { getPublicTours } from "../../submitFunctions/calendarAPI/getPublicTours";
import { CalendarSidebar } from "./CalendarSidebar/CalendarSidebar";
import { INewPublic } from "../../models/calendarModels/INewPublic";
import { ITour } from "../../models/tourCardModel/ITour";
import { getMyTours } from "../../submitFunctions/creatorAPI/getMyTours";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../redux/Modal/ModalReducer";
import NewPublicModal from "../Modals/NewPublicModal/NewPublicModal";
import { NewPublicDefault } from "./NewPublicDefault";

export const Calendar = () => {
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
  });
  return (
    <div>
      <Grid container>
        <Grid item md={8}></Grid>
        <Grid item md={4}>
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
    </div>
  );
};
