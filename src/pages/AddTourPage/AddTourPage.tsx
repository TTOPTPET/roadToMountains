import { useState } from "react";
import AddTourRouting from "./AddTourRouting/AddTourRouting";
import AddTourSteps from "./AddTourSteps/AddTourSteps";

export enum addTourStepsMap {
  first,
  second,
  third,
}

function AddTourPage() {
  const [page, setPage] = useState<addTourStepsMap>(addTourStepsMap.first);
  return (
    <>
      <AddTourRouting page={page} setPage={setPage} />
      <AddTourSteps page={page} />
    </>
  );
}

export default AddTourPage;
