import Box from "@mui/material/Box";

import { ITour } from "../../models/tourCardModel/ITour";

import TourCardPhoto from "./TourCardPhoto/TourCardPhoto";
import TourCardContentCreatorLk from "./TourCardContent/TourCardContentCreatorLk";
import TourCardContentCardList from "./TourCardContent/TourCardContentCardList";

type CardType = "tourList" | "myTours";

type TourCardProps = {
  tour: ITour;
  tourCardType: CardType;
};

function TourCard({ tour, tourCardType }: TourCardProps) {
  return (
    <Box
      className="tour_card"
      sx={{
        width: 325,
        height: 490,
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <TourCardPhoto tour={tour} tourCardType={tourCardType} />

      {tourCardType === "myTours" && <TourCardContentCreatorLk tour={tour} />}
      {tourCardType === "tourList" && <TourCardContentCardList tour={tour} />}
    </Box>
  );
}

export default TourCard;
