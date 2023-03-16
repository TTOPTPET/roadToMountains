import { useState } from "react";
import { AddImage } from "../../components/AddImage/AddImage";

function AddTourPage() {
  const [images, setImage] = useState<any[]>([]);
  return (
    <div>
      AddTourPage
      <AddImage images={images} setImage={setImage} />
    </div>
  );
}

export default AddTourPage;
