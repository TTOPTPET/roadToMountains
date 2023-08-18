import { Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { lightTurquoiseColor } from "../../../config/MUI/color/color";
import Plus from "../../../media/plus-circle-outline.svg";
import { Dispatch, SetStateAction, FC } from "react";
import "./svgStyling.css";
import { ITourBooking } from "../../../models/tourModels/ITourBooking";

interface IAddTouristButton {
  bookingData: ITourBooking;
  setBookingData: Dispatch<SetStateAction<ITourBooking>>;
}

export const AddTouristButton: FC<IAddTouristButton> = ({
  bookingData,
  setBookingData,
}) => {
  return (
    <Box
      component={Link}
      sx={{
        width: "100%",
        backgroundColor: lightTurquoiseColor,
        textDecoration: "none",
      }}
      padding={4}
      borderRadius={10}
      onClick={() =>
        setBookingData({
          ...bookingData,
          size: bookingData.size + 1,
          touristsInfo: [...bookingData.touristsInfo, {}],
        })
      }
    >
      <Stack direction={"row"} gap={1} alignItems={"center"}>
        <Typography variant={"h5"}>Добавить туриста</Typography>
        <Box
          sx={{
            width: { lg: "33px", xs: "20px" },
            height: { lg: "33px", xs: "20px" },
          }}
        >
          <img src={Plus} alt="plus" />
        </Box>
      </Stack>
    </Box>
  );
};
