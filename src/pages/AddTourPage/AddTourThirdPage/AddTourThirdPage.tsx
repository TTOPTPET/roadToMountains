import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dispatch, SetStateAction, FC } from "react";
import { Stack, Typography } from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";

interface IAddTourThirdPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  isEditing: boolean;
}

export const AddTourThirdPage: FC<IAddTourThirdPageProps> = ({
  images,
  setImage,
  isEditing,
}) => {
  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);

  return (
    <Stack gap={1}>
      <Typography variant={"h3"}>
        {tourInfo?.tourName ?? "Название тура"}
      </Typography>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo
        tourInfo={tourInfo}
        isEditing={isEditing}
      />
    </Stack>
  );
};
