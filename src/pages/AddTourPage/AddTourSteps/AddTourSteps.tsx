import { useState } from "react";
import { useSelector } from "react-redux";
import { IFilter } from "../../../models/tourListModels/IFilter";
import { RootState } from "../../../redux/store";
import { AddTourFirstPage } from "../AddTourFirstPage/AddTourFirstPage";
import { addTourStepsMap } from "../AddTourPage";
import { AddTourSecondPage } from "../AddTourSecondPage/AddTourSecondPage";
import { AddTourThirdPage } from "../AddTourThirdPage/AddTourThirdPage";

interface addTourStepsProps {
  page: addTourStepsMap;
  files: any[];
  setFiles: (prop: any[]) => void;
  filters: IFilter;
  isEditing: boolean;
}

const loadImages = {
  src: "",
  loading: true,
};

const imageLoaderHelper = (newImages: string[], skeleton: any[]) => {
  newImages.forEach((image) => {
    skeleton.pop();
    skeleton = [image, ...skeleton];
  });
  return skeleton;
};

function AddTourSteps({
  page,
  files,
  setFiles,
  filters,
  isEditing,
}: addTourStepsProps) {
  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);
  const [images, setImage] = useState<any[]>(
    tourInfo?.photos && tourInfo?.photos.length !== 0
      ? imageLoaderHelper(
          tourInfo.photos,
          new Array<typeof loadImages>(8).fill(loadImages)
        )
      : new Array<typeof loadImages>(8).fill(loadImages)
  );
  switch (page) {
    case addTourStepsMap.first:
      return (
        <AddTourFirstPage
          images={images}
          setImage={setImage}
          files={files}
          setFiles={setFiles}
          filters={filters}
          isEditing={isEditing}
        />
      );
    case addTourStepsMap.second:
      return <AddTourSecondPage />;
    case addTourStepsMap.third:
      return (
        <AddTourThirdPage
          images={images}
          setImage={setImage}
          isEditing={isEditing}
        />
      );
    default:
      break;
  }
}

export default AddTourSteps;
