import { ChangeEvent, useContext, useState } from "react";
import AddTourRouting, {
  RoutingContext,
  pagesMap,
} from "./AddTourRouting/AddTourRouting";
import { AddTourDescription } from "./AddTourDescription/AddTourDescription";
import { AddTourTravel } from "./AddTourTravel/AddTourTravel";
import { AddTourControl } from "./AddTourControl/AddTourControl";
import { AddTourDefault } from "./AddTourDefault/AddTourDefault";
import { IAddTour, IRecomendedAge } from "../../models/addTourModels/IAddTour";
import { SelectChangeEvent } from "@mui/material";

export interface IAddTourProps {
  handlerTextFieldChange: (
    key: keyof IAddTour,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handlerSelectChange: (key: keyof IAddTour, e: SelectChangeEvent) => void;
  handlerChangeAge: (
    key: keyof IRecomendedAge,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addTourData: IAddTour;
}

const tourDefault: IAddTour = {
  tourName: "",
  tourDescription: "",
  category: "",
  region: "Регион РФ",
  recomendedAge: undefined,
  price: 0,
};

const AddTourPageContent = () => {
  const [addTourData, setAddTourData] = useState<IAddTour>(tourDefault);
  const [age, setAge] = useState<IRecomendedAge>(null);

  const handlerTextFieldChange = (
    key: keyof IAddTour,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAddTourData({ ...addTourData, [key]: e.target.value });
    console.log(addTourData);
  };

  const hadnlerChangeAge = (
    key: keyof IRecomendedAge,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAge({ ...age, [key]: e.target.value });
    setAddTourData({
      ...addTourData,
      recomendedAge: { ...age, [key]: +e.target.value },
    });
  };

  const handlerSelectChange = (key: keyof IAddTour, e: SelectChangeEvent) => {
    setAddTourData({ ...addTourData, [key]: e.target.value });
  };

  const { page } = useContext(RoutingContext);
  return (
    <>
      {!Object.values(pagesMap).includes(page as pagesMap) && (
        <AddTourDefault />
      )}
      {pagesMap.description === page && (
        <AddTourDescription
          handlerTextFieldChange={handlerTextFieldChange}
          handlerSelectChange={handlerSelectChange}
          handlerChangeAge={hadnlerChangeAge}
          addTourData={addTourData}
        />
      )}
      {pagesMap.travel === page && <AddTourTravel />}
      {pagesMap.control === page && <AddTourControl />}
    </>
  );
};

function AddTourPage() {
  return (
    <AddTourRouting>
      <AddTourPageContent />
    </AddTourRouting>
  );
}

export default AddTourPage;
