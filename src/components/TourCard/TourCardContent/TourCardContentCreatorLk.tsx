import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ITour } from "../../../models/tourCardModel/ITour";

import { Link } from "react-router-dom";
import {
  lightTurquoiseColor,
  darkBlueColor,
} from "../../../config/MUI/color/color";
import DeleteTourModal from "../../Modals/DeleteTourModal/DeleteTourModal";
import { useDispatch } from "react-redux";
import { setModalActive } from "../../../redux/Modal/ModalReducer";
import SuccessDeleteTourModal from "../../Modals/SuccessDeleteTourModal/SuccessDeleteTourModal";
import { SetStateAction, Dispatch } from "react";
import { MyTours } from "../../MyTours/MyTours";

type TourCardProps = {
  tour: ITour;
  myTours: ITour[];
  setMyTours: Dispatch<SetStateAction<ITour[]>>;
};

function TourCardContentCreatorLk({
  tour,
  myTours,
  setMyTours,
}: TourCardProps) {
  console.log(tour);
  const dispatch = useDispatch();
  return (
    <Box
      className="tour-card__content"
      sx={{
        width: "100%",
        height: "230px",
        backgroundColor: lightTurquoiseColor,
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        padding: "30px 20px 20px",
        display: "flex",
        flexDirection: "column",
        flex: "0 0 auto",
      }}
    >
      <Box
        className="tour-card__content-title"
        sx={{
          fontFamily: "Jost",
          fontWeight: "800",
          fontSize: "24px",
          lineHeight: "32px",
          color: darkBlueColor,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {tour.tourName}
      </Box>
      <Box
        className="tour-card__content-price"
        sx={{
          fontFamily: "Jost",
          fontWeight: "700",
          fontSize: "20px",
          lineHeight: "20px",
          color: darkBlueColor,
          marginTop: "13px",
          flex: "1 0 auto",
        }}
      >
        {new Intl.NumberFormat("ru-RU").format(
          tour?.prices?.from || tour.price
        )}
        ₽
      </Box>
      <Box
        display={"flex"}
        flexDirection={"column"}
        flex={"0 0 auto"}
        className="tour-card__button-wrapper"
      >
        <Box
          display="flex"
          justifyContent={"flex-end"}
          className="tour-card__button-edit"
        >
          <Button component={Link} to={`/creator/editTour/${tour?.tourId}`}>
            Редактировать
          </Button>
        </Box>
        <Box
          className="tour-card__buttons-wrapper"
          display="flex"
          justifyContent={"flex-end"}
          mt="10px"
          columnGap={"10px"}
        >
          <Button
            className="tour-card__button-place"
            disabled={tour.banStatus ? true : false}
          >
            Разместить
          </Button>
          <Button
            className="tour-card__button-delete"
            onClick={() => dispatch(setModalActive("deleteTourModal"))}
          >
            Удалить
          </Button>
        </Box>
      </Box>
      <DeleteTourModal
        tourId={tour?.tourId}
        myTours={myTours}
        setMyTours={setMyTours}
      />
      <SuccessDeleteTourModal />
    </Box>
  );
}

export default TourCardContentCreatorLk;
