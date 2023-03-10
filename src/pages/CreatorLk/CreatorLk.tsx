import { useEffect, useState } from "react";
import { getMyTours } from "../../submitFunctions/creatorAPI";
import AddTourButton from "../../components/AddTourButton/AddTourButton";

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
}

function CreatorLk() {
  const [myTours, setMyTours] = useState<IMyTours[]>();

  useEffect(() => {
    getMyTours((value) => setMyTours(value), undefined, true);
  }, []);
  return (
    <div>
      <AddTourButton />
    </div>
  );
}

export default CreatorLk;
