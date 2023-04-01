import { FC, SetStateAction, Dispatch } from "react";
import { ITourInfo } from "../../../models/tourModels/ITourInfo";
import { Stack, Typography, SvgIcon } from "@mui/material";
import { ReactComponent as Icon } from "../../../media/logo.svg";
import { TourInfo } from "../../../components/TourInfo/TourInfo";

interface TourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: ITourInfo;
}

export const TourFirstPage: FC<TourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
}) => {
  return (
    <>
      <Stack justifyContent={"space-between"} direction={"row"}>
        <Typography variant={"h3"} marginBottom={1}>
          {tourInfo.tourName}
        </Typography>
        <Stack direction={"row"} gap={1} alignItems={"center"}>
          <SvgIcon fontSize={"large"} viewBox={"0 0 70 70"}>
            <Icon />
          </SvgIcon>
          <Typography variant={"button"}>ООО "Алтайский тур"</Typography>
        </Stack>
      </Stack>
      <TourInfo
        images={images}
        setImage={setImage}
        addTourInfo={false}
        tourInfo={tourInfo}
      />
    </>
  );
};
