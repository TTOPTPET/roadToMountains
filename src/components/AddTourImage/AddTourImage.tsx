import { Box, Button, Skeleton, Stack, SvgIcon } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import { ReactComponent as AddImageLogo } from "../../media/add-image.svg";

const MAXIMUM_UPLOAD = 20 * 1024 * 1024;

export const AddTourImage = ({
  images,
  setImage,
}: {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
}) => {
  const [reader] = useState(new FileReader());

  const fileHandler = (e: any) => {
    const files = e.target.files[0];
    if (files) {
      reader.readAsDataURL(files);
      reader.addEventListener("load", () => {
        if (files.size > MAXIMUM_UPLOAD) {
          return;
        }
        setImage([reader?.result, ...images]);
      });
      images.pop();
      setImage([...images]);
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
              <img
                src={image}
                alt={`tour`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 40,
                }}
              />
            )}
          </Box>
        ))}
    </Stack>
  );
};
