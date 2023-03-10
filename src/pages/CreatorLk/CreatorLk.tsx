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
  const [myTours, setMyTours] = useState<IMyTours[]>();
  const [def, setDef] = useState<any>();

  useEffect(() => {
    getMyTours((value) => setMyTours(value), undefined, true);
  }, [myTours, def]);
  return (
    <>
      <div>{JSON.stringify(myTours)}</div>
      <div
        className="btn"
        style={{ marginTop: 200 }}
        onClick={() => {
          console.log("first");
          setDef([
            {
              tourId: 2,
              tourName: "aaa",
              category: "aaa",
              complexity: "aaa",
              price: {
                from: 2,
                to: 2,
              },
              region: "aaa",
              tourDate: {
                from: "aaa",
                to: "aaa",
              },
              personsNumber: 2,
            },
          ]);
        }}
      >
        OOOOO
      </div>
    </>
  );
}

export default CreatorLk;
