import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

import { ITour } from "../../../models/tourCardModel/ITour";

import { Link } from "react-router-dom";
import {
  lightTurquoiseColor,
  darkBlueColor,
  darkTurquoiseColor,
  whiteColor,
} from "../../../config/MUI/color/color";

type TourCardProps = {
  tour: ITour;
};

function TourCardContentCreatorLk({ tour }: TourCardProps) {
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
        {new Intl.NumberFormat("ru-RU").format(tour.price.from)}₽
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
          <Button component={Link} to={`/creator/lk/edit/${tour?.id}`}>
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
          <Button className="tour-card__button-delete">Удалить</Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TourCardContentCreatorLk;
