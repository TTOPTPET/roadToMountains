import { useEffect, useState } from "react";
import { getMyTours } from "../../submitFunctions/creatorAPI";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import AddTourButton from "../../components/AddTourButton/AddTourButton";
import TourCard from "../../components/TourCard/TourCard";
import { darkBlueColor } from "../../config/MUI/color/color";
import { IMyTour } from "../../models/creatorModels/IMyTour";

function CreatorLk() {
  const [myTours, setMyTours] = useState<IMyTour[]>();
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

  console.log(myTours);

  useEffect(() => {
    setLoadingStatus(true);
    getMyTours(
      (value) => {
        setMyTours(value);
        setLoadingStatus(false);
      },
      undefined,
      true
    );
  }, []);

  const elements = myTours ? (
    myTours?.map((tour) => {
      return (
        <Grid item xs={1}>
          <TourCard tour={tour} key={tour.tourId} />
        </Grid>
      );
    })
  ) : (
    //TODO: изменить дизайн надписи, когда нет туров
    <>
      <Grid item xs={2} sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            m: "0 auto",
            fontFamily: "Jost",
            fontWeight: "800",
            fontSize: "40px",
          }}
        >
          Еще нет созданных туров
        </Box>
      </Grid>
    </>
  );

  const skeleton = () => {
    return (
      <>
        <Grid item xs={1}>
          <Skeleton
            variant="rounded"
            width={326}
            height={491}
            animation="wave"
            sx={{ borderRadius: "30px" }}
          />
        </Grid>
        <Grid item xs={1}>
          <Skeleton
            variant="rounded"
            width={326}
            height={491}
            animation="wave"
            sx={{ borderRadius: "30px" }}
          />
        </Grid>
      </>
    );
  };

  return (
    <>
      <Box
        sx={{
          fontFamily: "Jost",
          fontWeight: "800",
          fontSize: "24px",
          lineHeight: "32px",
          color: darkBlueColor,
          mb: "19px",
        }}
      >
        Мои туры
      </Box>
      <Grid container spacing={"24px"} columns={3}>
        <Grid item xs={1}>
          <AddTourButton />
        </Grid>
        {loadingStatus ? skeleton() : elements}
      </Grid>
    </>
  );
}

export default CreatorLk;
