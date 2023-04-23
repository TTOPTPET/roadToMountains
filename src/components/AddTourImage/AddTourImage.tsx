import {
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  SvgIcon,
} from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactComponent as AddImageLogo } from "../../media/add-image.svg";
import { ReactComponent as DeleteIcon } from "../../media/DeleteCreatorDocumentIcon.svg";

const MAXIMUM_UPLOAD = 20 * 1024 * 1024;

export const AddTourImage = ({
  images,
  setImage,
  files,
  setFiles,
}: {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  files: any[];
  setFiles: (prop: any[]) => void;
}) => {
  const [reader] = useState(new FileReader());

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

  const handlerDeleteImage = (index: number) => {
    setImage([
      ...images.filter((item, i) => i !== index),
      {
        src: "",
        loading: true,
      },
    ]);
    setFiles([...files.filter((item, i) => i !== index)]);
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
                  src={image}
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
