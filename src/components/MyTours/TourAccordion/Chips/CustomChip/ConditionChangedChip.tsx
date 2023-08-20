import "../BaseChip/BaseChip.css";

import BaseChip, {TypeIconSetForChip} from "../BaseChip/BaseChip";

const ConditionChangedChip = () => {
  return (
      <BaseChip setIcon={TypeIconSetForChip.Attention} textInput={"Условия изменились"}/>
  );
};

export default ConditionChangedChip;
