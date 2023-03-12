import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import Box from "@mui/material/Box";

import {
  lightTurquoiseColor,
  darkBlueColor,
} from "../../../config/MUI/color/color";

import cancelIcon from "../../../media/ban-status-icon.svg";
import cardbg from "../../../media/cardbg.png";
import noPhoto from "../../../media/noPhoto.png";

import { ITour } from "../../../models/tourCardModel/ITour";

type CardType = "tourList" | "myTours";
type TourCardProps = {
  tour: ITour;
  tourCardType: CardType;
};

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: lightTurquoiseColor,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: lightTurquoiseColor,
    color: darkBlueColor,
    fontFamily: "Montserrat",
    fontWeight: "400",
    borderRadius: "4px",
    fontSize: "14px",
  },
}));

function TourCardPhoto({ tour, tourCardType }: TourCardProps) {
  return (
    <>
      <Box
        className="tour-card__photo-wrapper"
        sx={{
          width: "100%",
          height: "261px",
          position: "relative",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          backgroundImage: `url(${tour.photo.length === 0 ? noPhoto : cardbg})`, //TODO: подставить картинку, которая приходит с бэка.
        }}
      >
        {tourCardType === "myTours" && (
          <Box
            className="tour-card__photo-layout"
            sx={{
              width: "100%",
              height: "100%",
              background: "rgba(0, 0, 0, 0.5)",
              position: "absolute",
              zIndex: "1",
              borderTopLeftRadius: "30px",
              borderTopRightRadius: "30px",
            }}
          >
            <Box
              className="tour-card__photo-publicNum"
              sx={{
                width: "100%",
                textAlign: "center",
                fontFamily: "Montserrat",
                fontWeight: "400",
                color: "#FFFFFF",
                fontSize: "16px",
                lineHeight: "20px",
                position: "absolute",
                zIndex: "3",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              {tour.publicNum
                ? `Размещенных туров: ${tour.publicNum}`
                : "Нет размещенных туров"}
            </Box>
          </Box>
        )}
      </Box>

      {tourCardType === "myTours" && (
        <Box className="tour-card__photo-banStatus">
          {tour.banStatus && (
            <>
              <StyledTooltip title="Тур заблокирован" arrow placement="right">
                <Box
                  className="tour-card__photo-banStatus-wrapper"
                  sx={{
                    position: "absolute",
                    top: "25px",
                    left: "25px",
                    width: "50px",
                    height: "50px",
                    borderRadius: "100%",
                    bgcolor: lightTurquoiseColor,
                    zIndex: "5",
                  }}
                >
                  <img
                    className="tour-card__photo-banStatus-icon"
                    src={cancelIcon}
                    alt="cancel icon"
                    style={{
                      width: "40px",
                      zIndex: "10",
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  />
                </Box>
              </StyledTooltip>
            </>
          )}
        </Box>
      )}
    </>
  );
}

export default TourCardPhoto;
