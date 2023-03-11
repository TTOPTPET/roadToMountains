import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import {
  lightTurquoiseColor,
  darkBlueColor,
  darkTurquoiseColor,
  whiteColor,
} from "../../config/config";
import { IMyTour } from "../../pages/CreatorLk/CreatorLk";
import cancelIcon from "../../media/ban-status-icon.svg";
import cardbg from "../../media/cardbg.png";
import noPhoto from "../../media/noPhoto.png";

type TourCardProps = {
  tour: IMyTour;
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

function TourCard({ tour }: TourCardProps) {
  console.log(tour);

  return (
    <Box
      sx={{
        width: 325,
        height: 490,
        borderRadius: "30px",
        position: "relative",
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "261px",
          position: "relative",
          borderTopLeftRadius: "30px",
          borderTopRightRadius: "30px",
          backgroundImage: `url(${tour.photo.length === 0 ? noPhoto : cardbg})`,
        }}
      >
        <Box
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
      </Box>

      <Box>
        {tour.banStatus && (
          <>
            <StyledTooltip title="Тур заблокирован" arrow>
              <Box
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

      <Box
        sx={{
          width: "100%",
          height: "230px",
          backgroundColor: lightTurquoiseColor,
          borderBottomLeftRadius: "30px",
          borderBottomRightRadius: "30px",
          padding: "30px 20px 20px",
          display: "flex",
          flexDirection: "column",
          flex: "0 0 auto",
        }}
      >
        <Box
          sx={{
            fontFamily: "Jost",
            fontWeight: "800",
            fontSize: "24px",
            lineHeight: "32px",
            color: darkBlueColor,
          }}
        >
          {tour.tourName}
        </Box>
        <Box
          sx={{
            fontFamily: "Jost",
            fontWeight: "700",
            fontSize: "20px",
            lineHeight: "20px",
            color: darkBlueColor,
            marginTop: "13px",
            flex: "1 0 auto",
          }}
        >
          {new Intl.NumberFormat("ru-RU").format(tour.price.from)}₽
        </Box>
        <Box display={"flex"} flexDirection={"column"} flex={"0 0 auto"}>
          <Box display="flex" justifyContent={"flex-end"}>
            <Button
              component={Link}
              to={"/addTour"}
              sx={{
                bgcolor: darkTurquoiseColor,
                padding: "0px 16px",
                width: "178px",
                height: "30px",
                borderRadius: "30px",
                fontFamily: "Jost",
                fontWeight: "700",
                fontSize: "15px",
                lineHeight: "20px",
                color: whiteColor,
                "&:hover": { bgcolor: darkTurquoiseColor },
              }}
            >
              Редактировать
            </Button>
          </Box>
          <Box
            display="flex"
            justifyContent={"flex-end"}
            mt="10px"
            columnGap={"10px"}
          >
            <Button
              disabled={tour.banStatus ? true : false}
              sx={{
                bgcolor: darkTurquoiseColor,
                padding: "0px 16px",
                width: "140px",
                height: "30px",
                borderRadius: "30px",
                fontFamily: "Jost",
                fontWeight: "700",
                fontSize: "15px",
                lineHeight: "20px",
                color: whiteColor,
                "&:hover": { bgcolor: darkTurquoiseColor },
                "&.Mui-disabled": {
                  background: "#97d5e4",
                  color: whiteColor,
                },
              }}
            >
              Разместить
            </Button>
            <Button
              sx={{
                bgcolor: darkTurquoiseColor,
                padding: "0px 16px",
                width: "112px",
                height: "30px",
                borderRadius: "30px",
                fontFamily: "Jost",
                fontWeight: "700",
                fontSize: "15px",
                lineHeight: "20px",
                color: whiteColor,
                "&:hover": { bgcolor: darkTurquoiseColor },
              }}
            >
              Удалить
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TourCard;
