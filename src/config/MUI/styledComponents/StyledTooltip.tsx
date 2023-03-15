import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { darkTurquoiseColor, whiteColor } from "../color/color";

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
