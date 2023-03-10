import { useEffect, useState } from "react";
import { getMyTours } from "../../submitFunctions/creatorAPI";
import AddTourButton from "../../components/AddTourButton/AddTourButton";
import TourCard from "../../components/TourCard/TourCard";

export interface IMyTours {
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
  const [myTours, setMyTours] = useState<IMyTours[]>();

  useEffect(() => {
    getMyTours((value) => setMyTours(value), undefined, true);
  }, []);
  return (
    <div>
      <AddTourButton />
      <TourCard
        photo={myTours && myTours[0].photo}
        tourName={myTours && myTours[0].tourName}
        myTours={myTours}
        price={myTours && myTours[0].price.from}
      />
    </div>
  );
}

export default CreatorLk;
