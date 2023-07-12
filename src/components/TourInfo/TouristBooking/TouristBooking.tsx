import { Autocomplete, IconButton, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Dispatch, SetStateAction, FC } from "react";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import {
  ITourBooking,
  ITouristBookingData,
} from "../../../models/tourModels/ITourBooking";
import { Sex } from "../../../models/userModels/IUserInfo";
import { ReactComponent as DeleteIcon } from "../../../media/DeleteCreatorDocumentIcon.svg";

interface ITouristBookingProps {
  bookingData: ITourBooking;
  touristData: ITouristBookingData;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  index: number;
  purchaseError: boolean;
}

export const TouristBooking: FC<ITouristBookingProps> = ({
  bookingData,
  touristData,
  setBookingData,
  index,
  purchaseError,
}) => {
  const handlerFieldChange = (
    key: keyof ITouristBookingData,
    value: string
  ) => {
    setBookingData({
      ...bookingData,
      touristsInfo: bookingData.touristsInfo.map((item, i) => {
        if (i === index) {
          return { ...item, [key]: value };
        } else {
          return { ...item };
        }
      }),
    });
  };
  const handlerDeleteTourist = () => {
    setBookingData({
      ...bookingData,
      touristsInfo: [
        ...bookingData.touristsInfo.filter((val, i) => i !== index),
      ],
      size: bookingData.size - 1,
    });
  };

  return (
    <Box
      sx={{ width: "100%", backgroundColor: lightTurquoiseColor }}
      borderRadius={10}
      padding={4}
    >
      <IconButton
        onClick={handlerDeleteTourist}
        sx={{ float: "right", marginTop: "-20px", marginRight: "-15px" }}
      >
        <DeleteIcon width={20} height={20} />
      </IconButton>
      <Typography variant={"h5"} mb={2}>
        Турист
      </Typography>
      <Stack direction={"row"} gap={4}>
        <TextField
          label={"ФИО"}
          color={"secondary"}
          value={touristData?.name || ""}
          error={
            touristData?.name === "" ||
            (touristData?.name === undefined && purchaseError)
          }
          onChange={(e) => handlerFieldChange("name", e.target.value)}
        />
        <TextField
          label={"Возраст"}
          color={"secondary"}
          value={touristData?.age || ""}
          error={
            touristData?.age === "" ||
            (touristData?.age === undefined && purchaseError)
          }
          onChange={(e) => handlerFieldChange("age", e.target.value)}
        />
        <Autocomplete
          freeSolo
          disableClearable
          onChange={(e, value) => handlerFieldChange("sex", value)}
          value={touristData?.sex || ""}
          options={Object.values(Sex)}
          renderInput={(params) => (
            <TextField
              label={"Пол"}
              color={"secondary"}
              error={
                touristData?.sex === "" ||
                (touristData?.sex === undefined && purchaseError)
              }
              onChange={(e) => handlerFieldChange("sex", e.target.value)}
              {...params}
              value={touristData?.sex || ""}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
      </Stack>
    </Box>
  );
};
