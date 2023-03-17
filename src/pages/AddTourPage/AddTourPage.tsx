import { useContext } from "react";
import AddTourRouting, {
  RoutingContext,
  pagesMap,
} from "./AddTourRouting/AddTourRouting";
import { AddTourDescription } from "./AddTourDescription/AddTourDescription";
import { AddTourTravel } from "./AddTourTravel/AddTourTravel";
import { AddTourControl } from "./AddTourControl/AddTourControl";
import { AddTourDefault } from "./AddTourDefault/AddTourDefault";

const AddTourPageContent = () => {
  const { page } = useContext(RoutingContext);
  return (
    <>
      {!Object.values(pagesMap).includes(page as pagesMap) && (
        <AddTourDefault />
      )}
      {pagesMap.description === page && <AddTourDescription />}
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
