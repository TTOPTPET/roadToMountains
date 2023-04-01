import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { Dispatch, SetStateAction } from "react";
import { Stack, Typography } from "@mui/material";
import { TourInfo } from "../../../components/TourInfo/TourInfo";

export const AddTourThirdPage = ({
  images,
  setImage,
}: {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
}) => {
  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);

  return (
    <Stack gap={1} marginTop={2}>
      <Typography variant={"h3"}>
        {tourInfo?.tourName ?? "Название тура"}
      </Typography>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo
        tourInfo={tourInfo}
      />
    </Stack>
  );
};
