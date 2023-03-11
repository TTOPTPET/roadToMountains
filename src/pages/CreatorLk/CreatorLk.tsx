import { useEffect, useState } from "react";
import { getMyTours } from "../../submitFunctions/creatorAPI";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import AddTourButton from "../../components/AddTourButton/AddTourButton";
import TourCard from "../../components/TourCard/TourCard";

export interface IMyTour {
  tourId: string;
  tourName: string;
  category: string;
  complexity: string;
  price: {
    from: number;
    to: number;
  };
  region: string;
  tourDate: {
    from: string;
    to: string;
  };
  personsNumber: number;
  photo: string[];
  banStatus: boolean;
  publicNum: number;
}

function CreatorLk() {
  const [myTours, setMyTours] = useState<IMyTour[]>();
  const [loadingStatus, setLoadingStatus] = useState<Boolean>(true);

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

  const elements = myTours?.map((tour, i) => {
    return (
      <Grid item xs={1}>
        <TourCard tour={tour} key={i} />
      </Grid>
    );
  });

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
    //TODO: уточнить по поводу контейнера.
    <Box className="myTours_grid" sx={{ width: "1024px", m: "0 auto" }}>
      <Grid container spacing={"24px"} columns={3}>
        <Grid item xs={1}>
          <AddTourButton />
        </Grid>
        {loadingStatus ? skeleton() : elements}
      </Grid>
    </Box>
  );
}

export default CreatorLk;
