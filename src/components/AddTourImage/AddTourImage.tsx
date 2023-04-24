import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  SvgIcon,
} from "@mui/material";
import { Dispatch, SetStateAction, useState, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { baseUrl } from "../../config/config";
import { ReactComponent as AddImageLogo } from "../../media/add-image.svg";
import { ReactComponent as DeleteIcon } from "../../media/DeleteCreatorDocumentIcon.svg";
import { setPhotoToDelete } from "../../redux/Photo/PhotoReducer";
import { RootState } from "../../redux/store";

const MAXIMUM_UPLOAD = 20 * 1024 * 1024;

interface IAddTourImageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  files: any[];
  setFiles: (prop: any[]) => void;
  isEditing: boolean;
}

export const AddTourImage: FC<IAddTourImageProps> = ({
  images,
  setImage,
  files,
  setFiles,
  isEditing,
}) => {
  const [reader] = useState(new FileReader());

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);

  const photoToDelete = useSelector(
    (state: RootState) => state.photoToDelete.photo
  );

  const dispatch = useDispatch();

  const fileHandler = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      reader.readAsDataURL(file);
      reader.addEventListener("load", () => {
        if (file.size > MAXIMUM_UPLOAD) {
          return;
        }
        setImage([reader?.result, ...images]);
      });
      images.pop();
      setImage([...images]);
      setFiles([...files, file]);
    }
  };
  console.log(photoToDelete);
  const handlerDeleteImage = (index: number) => {
    if (isEditing) {
      if (tourInfo.photos.includes(images[index])) {
        dispatch(setPhotoToDelete(images[index]));
      }

      setImage([
        ...images.filter((item, i) => i !== index),
        {
          src: "",
          loading: true,
        },
      ]);
    } else {
      setImage([
        ...images.filter((item, i) => i !== index),
        {
          src: "",
          loading: true,
        },
      ]);
      setFiles([...files.filter((item, i) => i !== index)]);
    }
  };
  return (
    <Stack direction={"row"} gap={1} flexWrap={"wrap"} width={500}>
      <Button
        sx={{ width: 156, height: 156, margin: "0 auto 16px" }}
        variant="contained"
        component="label"
      >
        <input
          type={"file"}
          accept={".jpg, .jpeg, .png"}
          onChange={fileHandler}
          hidden
        />
        <SvgIcon viewBox="0 0 35 35" fontSize="large">
          <AddImageLogo color="#fff" />
        </SvgIcon>
      </Button>
      {images &&
        images.map((image, index) => (
          <Box
            sx={{ width: 156, height: 156, margin: "0 auto 16px" }}
            key={index}
          >
            {image.loading ? (
              <Skeleton
                variant="rounded"
                sx={{
                  width: 156,
                  height: 156,
                  margin: "0 auto 16px",
                  borderRadius: 8,
                }}
              />
            ) : (
              <>
                {" "}
                <IconButton onClick={() => handlerDeleteImage(index)}>
                  <DeleteIcon />
                </IconButton>
                <img
                  src={
                    isEditing
                      ? image.includes("data:image/")
                        ? image
                        : baseUrl + "/" + image
                      : image
                  }
                  alt={`tour`}
                  style={{
                    marginTop: -30,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: 25,
                  }}
                />
              </>
            )}
          </Box>
        ))}
    </Stack>
  );
};
