import { createTheme } from "@mui/material";
import {
  darkBlueColor,
  darkTurquoiseColor,
  lightTurquoiseColor,
  redColor,
  whiteColor,
} from "../../color/color";

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    high: true;
  }
}

export const mainThemes = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: "0 16px",
          backgroundColor: darkTurquoiseColor,
          height: "30px",
          borderRadius: "30px",
          fontFamily: "Jost",
          fontWeight: "700",
          fontSize: "20px",
          lineHeight: "20px",
          color: whiteColor,
          textTransform: "none",
          "&:hover": { backgroundColor: darkTurquoiseColor },
          "&.Mui-disabled": {
            backgroundColor: "#97d5e4",
            color: whiteColor,
          },
        },
      },
      variants: [
        {
          props: { variant: "high" },
          style: {
            height: "50px",
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          "& > fieldset": {
            border: "none"
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          input: {
            width: "700px", 
            height: "50px",
            padding: "12px 15px", 
            backgroundColor: whiteColor, 
            borderRadius: "30px",
            border: "none",
            color: darkBlueColor,
            fontSize: "16px",
            lineHeight: "20px",
            fontFamily: "Montserrat",
            fontWeight: "400",
            boxSizing: "border-box",
            "&::placeholder": {
              color: darkBlueColor,
              opacity: "1",
              fontSize: "16px",
              lineHeight: "20px",
              fontFamily: "Montserrat",
              fontWeight: "400",
            },
          },
        },
      },
    },
  },
});
