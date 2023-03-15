import { createTheme } from "@mui/material";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
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

// declare module "@mui/material/styles" {
//   interface Palette {
//     lightTurquoiseColor: Palette["primary"];
//     whiteColor: Palette["secondary"];
//   }

//   interface PaletteOptions {
//     lightTurquoiseColor?: PaletteOptions["primary"];
//     whiteColor?: PaletteOptions["secondary"];
//   }
// }

export const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip
    {...props}
    classes={{ popper: className }}
    enterDelay={1000}
    leaveDelay={300}
  />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: darkTurquoiseColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: darkTurquoiseColor,
    color: whiteColor,
    fontFamily: "Montserrat",
    fontWeight: "400",
    borderRadius: "4px",
    fontSize: "14px",
  },
}));

export const mainThemes = createTheme({
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
  },
});
