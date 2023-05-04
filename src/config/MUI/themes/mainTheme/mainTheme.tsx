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
    whiteColor: true;
    textButton: true;
    fileInput: true;
    weakTextButton: true;
    arrowButton: true;
  }
}

declare module "@mui/material/InputBase" {
  interface InputBasePropsColorOverrides {
    whiteColor: true;
    lightTurquoiseColor: true;
  }
}

declare module "@mui/material/Paper" {
  interface PaperPropsVariantOverrides {
    helpButton: true;
    bigPadding: true;
    header: true;
    whiteBlue: true;
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
          "&.MuiPickersPopper-paper": {
            padding: 5,
          },
        },
      },
      variants: [
        {
          props: { variant: "helpButton" },
          style: {
            height: "70px",
            width: "70px",
            borderRadius: "50%",
            backgroundColor: lightTurquoiseColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
          },
        },
        {
          props: { variant: "bigPadding" },
          style: {
            padding: "50px",
          },
        },
        {
          props: { variant: "header" },
          style: {
            padding: 0,
            paddingLeft: "15px",
            paddingRight: "15px",
            backgroundColor: lightTurquoiseColor,
            height: 70,
            borderRadius: 0,
          },
        },
        {
          props: { variant: "whiteBlue" },
          style: {
            backgroundColor: whiteColor,
          },
        },
      ],
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          width: "100%",
          borderRadius: "30px",
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
          minWidth: "fit-content",
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
          props: { variant: "weakTextButton" },
          style: {
            backgroundColor: "transparent",
            "&:hover": { backgroundColor: "transparent" },
            color: darkBlueColor,
            fontFamily: "Montserrat",
            fontSize: "16px",
            fontWeight: 400,
            padding: 5,
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
        {
          props: { variant: "arrowButton" },
          style: {
            minWidth: "34px",
            width: "fit-content",
            backgroundColor: whiteColor,
            color: darkBlueColor,
            borderRadius: "100%",
            height: "34px",
            padding: "0",
          },
        },
      ],
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: lightTurquoiseColor,
          borderRadius: "30px",
          height: "50px",
          // "& > fieldset": {
          //   borderColor: lightTurquoiseColor,
          // },
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
            padding: "6px",
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
          "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
              borderColor: lightTurquoiseColor,
            },
          },
          "& .MuiInputBase-colorPrimary": {
            "&:hover fieldset": {
              borderColor: lightTurquoiseColor,
            },
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px ${lightTurquoiseColor} inset`,
                borderRadius: "30px",
              },
            },
          },
          "& .MuiInputBase-colorSecondary": {
            "&:hover fieldset": {
              borderColor: "#FFF",
            },
            input: {
              "&:-webkit-autofill": {
                WebkitBoxShadow: `0 0 0 1000px #FFF inset`,
                borderRadius: "30px",
              },
            },
          },
          "& .MuiInputBase-colorSecondary.Mui-focused, .MuiInputBase-colorSecondary.Mui-disabled":
            {
              fieldset: {
                borderColor: "#FFF",
              },
            },
          "& .MuiInputBase-colorSecondary.MuiOutlinedInput-root": {
            backgroundColor: "#FFF",
          },
          "& .Mui-error": {
            "&:hover fieldset": {
              borderColor: "#d32f2f",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#d32f2f",
            },
          },
          "& .Mui-disabled": {
            "& .MuiOutlinedInput-notchedOutline": {
              border: "none",
            },
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          padding: "0 15px 0 12px !important ",
        },
      },
      variants: [
        {
          props: { color: "primary" },
          style: {
            input: {
              backgroundColor: lightTurquoiseColor,
              borderRadius: "30px",
            },
            fieldset: {
              borderColor: lightTurquoiseColor,
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
            fieldset: {
              borderColor: "#FFF",
            },
          },
        },
      ],
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: darkBlueColor,
          "&.Mui-focused": {
            color: darkBlueColor,
          },
        },
      },
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
          textTransform: "none",
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
          "&:before": {
            backgroundColor: "rgba(0,0,0,0)",
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
    MuiTabs: {
      styleOverrides: {
        root: {
          borderRadius: 30,
        },
        indicator: {
          visibility: "hidden",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: "none",
          backgroundColor: lightTurquoiseColor,
          color: darkBlueColor,
          "&.Mui-selected": {
            backgroundColor: darkTurquoiseColor,
            color: whiteColor,
          },
        },
      },
    },
  },
});
