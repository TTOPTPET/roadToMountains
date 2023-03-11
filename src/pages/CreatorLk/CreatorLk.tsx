import { useEffect, useState } from "react";
import { getMyTours } from "../../submitFunctions/creatorAPI";
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

  const elements = myTours?.map((tour, i) => <TourCard tour={tour} key={i} />);

  return (
    <div>
      <AddTourButton />
      {elements}
    </div>
  );
}

export default CreatorLk;
