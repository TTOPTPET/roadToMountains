import { useEffect, useState } from "react";
import { getMyTours } from "../../submitFunctions/creatorAPI";

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
  const [myTours, setMyTours] = useState<Array<IMyTours>>();

  useEffect(() => {
    getMyTours((value) => setMyTours(value), undefined, true);
  }, []);
  return <div>{JSON.stringify(myTours)}</div>;
}

export default CreatorLk;
