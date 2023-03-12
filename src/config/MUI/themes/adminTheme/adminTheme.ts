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
      ],
    },
  },
});
