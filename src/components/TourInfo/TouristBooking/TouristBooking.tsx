import { Autocomplete, TextField, Typography } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { Dispatch, SetStateAction, FC } from "react";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import {
  ITourBooking,
  ITouristBookingData,
} from "../../../models/tourModels/ITourBooking";
import { Sex } from "../../../models/userModels/IUserInfo";

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

  return (
    <Box
      sx={{ width: "100%", backgroundColor: lightTurquoiseColor }}
      borderRadius={10}
      padding={4}
    >
      <Typography variant={"h5"} mb={2}>
        Турист
      </Typography>
      <Stack direction={"row"} gap={4}>
        <TextField
          placeholder={"ФИО"}
          value={bookingData.touristsInfo[index]?.name}
          onChange={(e) => handlerFieldChange("name", e.target.value)}
        />
        <TextField
          placeholder={"Возраст"}
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
              placeholder={"Регион"}
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
