import { createTheme } from "@mui/material";
import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
  redColor,
  whiteColor,
} from "../../color/color";

export const themes = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "15px",
          textTransform: "none",
          maxHeight: "70px",
          color: darkBlueColor,
          "&:active": {
            backgroundColor: darkTurquoiseColor,
            color: whiteColor,
          },
          "&.active": {
            backgroundColor: lightTurquoiseColor,
          },
        },
      },
      variants: [
        {
          props: { color: "error" },
          style: {
            color: redColor,
            "&:active": {
              backgroundColor: redColor,
            },
          },
        },
        {
          props: { color: "secondary" },
          style: {
            backgroundColor: lightTurquoiseColor,
            "&:hover": {
              backgroundColor: darkBlueColor,
              color: whiteColor,
            },
            "&:active": {
              backgroundColor: redColor,
            },
          },
        },
      ],
    },
  },
});
