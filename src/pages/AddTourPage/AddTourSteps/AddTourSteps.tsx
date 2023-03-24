import { AddTourFirstPage } from "../AddTourFirstPage/AddTourFirstPage";
import { addTourStepsMap } from "../AddTourPage";
import { AddTourSecondPage } from "../AddTourSecondPage/AddTourSecondPage";

interface addTourStepsProps {
  page: addTourStepsMap;
}

function AddTourSteps({ page }: addTourStepsProps) {
  switch (page) {
    case addTourStepsMap.first:
      return <AddTourFirstPage />;
    case addTourStepsMap.second:
      return <AddTourSecondPage />;
    case addTourStepsMap.third:
      break;
    default:
      break;
  }
}

export default AddTourSteps;
