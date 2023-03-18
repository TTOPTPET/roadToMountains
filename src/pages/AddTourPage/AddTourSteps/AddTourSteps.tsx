import { AddTourFirstPage } from "../AddTourFirstPage/AddTourFirstPage";
import { addTourStepsMap } from "../AddTourPage";

interface addTourStepsProps {
  page: addTourStepsMap;
}

function AddTourSteps({ page }: addTourStepsProps) {
  switch (page) {
    case addTourStepsMap.first:
      return <AddTourFirstPage />;
    case addTourStepsMap.second:
      break;
    case addTourStepsMap.third:
      break;
    default:
      break;
  }
}

export default AddTourSteps;
