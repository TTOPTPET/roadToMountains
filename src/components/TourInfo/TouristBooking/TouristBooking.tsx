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
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
  index: number;
}

export const TouristBooking: FC<ITouristBookingProps> = ({
  bookingData,
  setBookingData,
  index,
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
    console.log(index);
    console.log(bookingData?.touristsInfo[index]);
    setBookingData({
      ...bookingData,
      touristsInfo: [
        ...bookingData.touristsInfo.filter((vale, i) => i !== index),
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
          placeholder={"ФИО"}
          color={"secondary"}
          value={bookingData.touristsInfo[index]?.name}
          onChange={(e) => handlerFieldChange("name", e.target.value)}
        />
        <TextField
          placeholder={"Возраст"}
          color={"secondary"}
          value={bookingData.touristsInfo[index]?.age}
          onChange={(e) => handlerFieldChange("age", e.target.value)}
        />
        <Autocomplete
          freeSolo
          disableClearable
          onChange={(e, value) => handlerFieldChange("sex", value)}
          options={Object.values(Sex)}
          renderInput={(params) => (
            <TextField
              placeholder={"Пол"}
              color={"secondary"}
              {...params}
              value={bookingData.touristsInfo[index]?.sex}
              onChange={(e) => handlerFieldChange("sex", e.target.value)}
              InputProps={{ ...params.InputProps, type: "search" }}
            />
          )}
        />
      </Stack>
    </Box>
  );
};
