import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { DarkStyledTooltip } from "../../../config/MUI/styledComponents/StyledTooltip";

import { ITour } from "../../../models/tourCardModel/ITour";

import { Link } from "react-router-dom";
import {
  lightTurquoiseColor,
  darkBlueColor,
  darkTurquoiseColor,
  whiteColor,
} from "../../../config/MUI/color/color";

import mapMarker from "../../../media/map-marker.svg";
import calendar from "../../../media/calendar.svg";
import categoryIcon from "../../../media/walking-guy.svg";

type TourCardProps = {
  tour: ITour;
};

function TourCardContentCardList({ tour }: TourCardProps) {
  return (
    <Box
      className="tour-card__content"
      sx={{
        width: "100%",
        height: "230px",
        backgroundColor: lightTurquoiseColor,
        borderBottomLeftRadius: "30px",
        borderBottomRightRadius: "30px",
        padding: "16px 15px 20px",
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
        className="tour-card__content-wrapper"
        sx={{
          mt: "7px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          flex: "1 0 auto",
        }}
      >
        <Box
          className="tour-card__content-region-wrapper"
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <Box className="tour-card__content-region-icon">
            <img src={mapMarker} alt="map marker" />
          </Box>
          <DarkStyledTooltip title="Регион" arrow placement="top">
            <Box
              className="tour-card__content-region-descr"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "20px",
                color: darkBlueColor,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {tour.region}
            </Box>
          </DarkStyledTooltip>
        </Box>

        <Box
          className="tour-card__content-date-wrapper"
          sx={{ display: "flex", gap: "5px", alignItems: "center" }}
        >
          <Box className="tour-card__content-date-icon">
            <img src={calendar} alt="calendar" />
          </Box>
          <DarkStyledTooltip title="Даты ближайшего тура" arrow placement="top">
            <Box
              className="tour-card__content-date-descr"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "20px",
                color: darkBlueColor,
              }}
            >
              {tour.tourDate.from} - {tour.tourDate.to}
            </Box>
          </DarkStyledTooltip>
          {Boolean(tour.publicNum) && (
            <Box
              className="tour-card__content-date-publicNum"
              sx={{
                ml: "15px",
                fontFamily: "Montserrat",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "20px",
                color: darkTurquoiseColor,
              }}
            >
              +{tour.publicNum - 1}
            </Box>
          )}
        </Box>

        <Box
          className="tour-card__content-category-wrapper"
          sx={{ display: "flex", gap: "6px", alignItems: "center" }}
        >
          <Box className="tour-card__content-category-icon">
            <img src={categoryIcon} alt="walking guy" />
          </Box>
          <DarkStyledTooltip title="Категория тура" arrow placement="top">
            <Box
              className="tour-card__content-category-descr"
              sx={{
                fontFamily: "Montserrat",
                fontWeight: "400",
                fontSize: "16px",
                lineHeight: "20px",
                color: darkTurquoiseColor,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {tour.category}
            </Box>
          </DarkStyledTooltip>
        </Box>
      </Box>
      <Box
        sx={{ display: "flex", flexDirection: "column", flex: "0 0 auto" }}
        className="tour-card__button-wrapper"
      >
        <Box
          sx={{ display: "flex", justifyContent: "flex-end" }}
          className="tour-card__button-price"
        >
          <Button component={Link} to={`/tours/tour/${tour.tourId}`}>
            {`от ${new Intl.NumberFormat("ru-RU").format(tour.price.from)}₽`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default TourCardContentCardList;
