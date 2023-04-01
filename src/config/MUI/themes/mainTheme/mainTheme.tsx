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
    textButton: true;
    fileInput: true;
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
      main: whiteColor,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          padding: 30,
        },
      },
    },
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
          // fontSize: "16px",
          // lineHeight: "20px",
          // fontFamily: "Montserrat",
          // fontWeight: "400",
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
          width: "fit-content",
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
        {
          props: { variant: "textButton" },
          style: {
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            color: darkBlueColor,
          },
        },
        {
          props: { variant: "fileInput" },
          style: {
            backgroundColor: lightTurquoiseColor,
            width: "100%",
            height: "50px",
            display: "flex",
            justifyContent: "space-between",
            "&:hover": { backgroundColor: lightTurquoiseColor },
            color: darkBlueColor,
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
            "&::-webkit-outer-spin-button": {
              "-webkit-appearance": "none",
            },
            "&::-webkit-inner-spin-button": {
              "-webkit-appearance": "none",
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
      defaultProps: {
        variantMapping: {
          h1: "div",
          h2: "div",
          h3: "div",
          h4: "div",
          h5: "div",
          h6: "div",
          subtitle1: "div",
          subtitle2: "div",
          button: "div",
          caption: "div",
          body1: "div",
          body2: "div",
          inherit: "div",
        },
      },
      styleOverrides: {
        root: {
          color: darkBlueColor,
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          color: darkBlueColor,

          "&.Mui-checked": {
            color: darkBlueColor,
          },
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          backgroundColor: whiteColor,
          borderRadius: 20,
          "&.MuiPaper-root": {
            borderRadius: 20,
            padding: 0,
          },
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          backgroundColor: lightTurquoiseColor,
          borderRadius: 20,
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: whiteColor,
        },
      },
    },
  },
});
