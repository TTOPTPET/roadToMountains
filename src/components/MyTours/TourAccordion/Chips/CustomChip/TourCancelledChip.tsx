import "../BaseChip/BaseChip.css";

import BaseChip, {TypeIconSetForChip} from "../BaseChip/BaseChip";

const TourCancelledChip = () => {
  return (
      <BaseChip setIcon={TypeIconSetForChip.AttentionRed} textInput={"Тур был отменен"}/>
  );
};

export default TourCancelledChip;
