import { useEffect, useState } from "react";
import { getMyTours } from "../../API/creatorAPI/getMyTours";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import AddTourButton from "../../components/AddTourModules/AddTourButton/AddTourButton";
import TourCard from "../../components/TourCard/TourCard";
import { darkBlueColor } from "../../config/MUI/color/color";
import { ITour } from "../../models/tourCardModel/ITour";

import CreatorInfo from "../../components/UserInfo/CreatorInfo/CreatorInfo";
import { Stack } from "@mui/system";
import { mobileWidth } from "../../config/config";
import { Typography, useMediaQuery, useTheme } from "@mui/material";
import DeleteTourModal from "../../components/Modals/DeleteTourModal/DeleteTourModal";
import SuccessDeleteTourModal from "../../components/Modals/SuccessDeleteTourModal/SuccessDeleteTourModal";

function CreatorLk() {
  const [myTours, setMyTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState<Boolean>(true);

  const theme = useTheme();

  const moreThenMid = useMediaQuery(theme.breakpoints.up("md"));

  useEffect(() => {
    setLoading(true);
    getMyTours(
      (value) => {
        setMyTours(value);
        setLoading(false);
      },
      undefined,
      false
    );
  }, []);

  const elements =
    myTours &&
    myTours?.map((tour, i) => {
      return (
        <Grid key={i} item lg={3} md={3} sm={4}>
          <TourCard
            tour={tour}
            key={tour.tourId}
            tourCardType={"myTours"}
            myTours={myTours}
            setMyTours={setMyTours}
          />
        </Grid>
      );
    });

  const skeleton = () => {
    return (
      <>
        <Grid item lg={3} md={3} sm={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { xs: 220, sm: 180, md: 205, lg: 280 },
              height: { xs: 330, sm: 270, md: 310, lg: 420 },
            }}
          />
        </Grid>
        <Grid item lg={3} md={3} sm={4}>
          <Skeleton
            variant="rounded"
            animation="wave"
            sx={{
              borderRadius: "30px",
              width: { xs: 220, sm: 180, md: 205, lg: 280 },
              height: { xs: 330, sm: 270, md: 310, lg: 420 },
            }}
          />
        </Grid>
        {moreThenMid && (
          <Grid item lg={3} md={3}>
            <Skeleton
              variant="rounded"
              animation="wave"
              sx={{
                borderRadius: "30px",
                width: { md: 205, lg: 280 },
                height: { md: 310, lg: 420 },
              }}
            />
          </Grid>
        )}
      </>
    );
  };

  return (
    <>
      <CreatorInfo />
      <Typography
        variant="h5"
        sx={{
          mb: { lg: "19px", md: "20px", sm: "10px", xs: "10px" },
          mt: "10px",
        }}
      >
        Мои туры
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent={{ sm: "flex-start", xs: "center" }}
        alignItems={"center"}
      >
        <Grid item lg={3} md={3} sm={4}>
          <AddTourButton />
        </Grid>
        {loading ? skeleton() : elements}
      </Grid>
      <DeleteTourModal myTours={myTours} setMyTours={setMyTours} />
      <SuccessDeleteTourModal />
    </>
  );
}

export default CreatorLk;
