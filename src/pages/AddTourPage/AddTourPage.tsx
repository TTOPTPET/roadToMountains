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
  const [files, setFiles] = useState<any[]>([]);
  return (
    <>
      <AddTourRouting page={page} setPage={setPage} files={files} />
      <AddTourSteps page={page} files={files} setFiles={setFiles} />
    </>
  );
}

export default AddTourPage;
