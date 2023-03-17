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

declare module "@mui/material/InputBase" {
  interface InputBasePropsColorOverrides {
    whiteColor: true;
    lightTurquoiseColor: true;
  }
}

export const mainThemes = createTheme({
  typography: {
    fontFamily: "Montserrat",
    h3: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "50px",
      lineHeight: "50px",
      "@media (min-width:700px)": {
        fontSize: "100px",
      },
    },
    h4: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "34px",
      lineHeight: "40px",
      letterSpacing: "0.25px",
    },
    h5: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "24px",
      lineHeight: "32px",
    },
    h6: {
      fontFamily: "Jost",
      fontWeight: "800",
      fontSize: "18px",
      lineHeight: "18px",
    },
    button: {
      fontFamily: "Jost",
      fontWeight: "700",
      fontSize: "20px",
      lineHeight: "20px",
    },
    caption: {
      fontFamily: "Montserrat",
      fontWeight: "400",
      fontSize: "16px",
      lineHeight: "20px",
    },
    body2: {
      fontFamily: "Montserrat",
      fontWeight: "400",
      fontSize: "14px",
      lineHeight: "20px",
    },
  },
  palette: {
    primary: {
      main: "#D2F7FF",
    },
    secondary: {
      main: "#FFF",
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "center",
          width: "100%",
          height: "50px",
          padding: "12px 15px",
          backgroundColor: lightTurquoiseColor,
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
            border: "none",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          input: {
            width: "100%",
            height: "50px",
            // backgroundColor: lightTurquoiseColor,
            padding: "12px 15px",
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
    MuiInputBase: {
      variants: [
        {
          props: { color: "primary" },
          style: {
            input: {
              backgroundColor: lightTurquoiseColor,
              borderRadius: "30px",
            },
          },
        },
        {
          props: { color: "secondary" },
          style: {
            input: {
              backgroundColor: "#FFF",
              borderRadius: "30px",
            },
          },
        },
      ],
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: darkBlueColor,
        },
      },
    },
  },
});
