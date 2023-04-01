import { useState } from "react";
import { AddTourFirstPage } from "../AddTourFirstPage/AddTourFirstPage";
import { addTourStepsMap } from "../AddTourPage";
import { AddTourSecondPage } from "../AddTourSecondPage/AddTourSecondPage";
import { AddTourThirdPage } from "../AddTourThirdPage/AddTourThirdPage";

interface addTourStepsProps {
  page: addTourStepsMap;
}

const loadImages = {
  src: "",
  loading: true,
};

function AddTourSteps({ page }: addTourStepsProps) {
  const [images, setImage] = useState<any[]>(
    new Array<typeof loadImages>(8).fill(loadImages)
  );
  switch (page) {
    case addTourStepsMap.first:
      return <AddTourFirstPage images={images} setImage={setImage} />;
    case addTourStepsMap.second:
      return <AddTourSecondPage />;
    case addTourStepsMap.third:
      return <AddTourThirdPage images={images} setImage={setImage} />;
    default:
      break;
  }
}

export default AddTourSteps;
