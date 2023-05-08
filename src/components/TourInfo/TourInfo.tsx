import { Box, Grid, Skeleton, Stack, SvgIcon, Typography } from "@mui/material";
import { ReactComponent as WalkingGuy } from "../../media/walking-guy.svg";
import { ReactComponent as MapMarker } from "../../media/map-marker.svg";
import { ReactComponent as ArrowRight } from "../../media/right-arrow-navigation.svg";
import { ReactComponent as ArrlowLeft } from "../../media/left-arrow-navigation.svg";
import Carousel from "react-material-ui-carousel";
import { Dispatch, FC, SetStateAction } from "react";
import { Attention } from "../../components/Attention/Attention";
import { IAddTour } from "../../models/addTourModels/IAddTour";
import { ITourInfo } from "../../models/tourModels/ITourInfo";
import dayjs from "dayjs";
import { baseUrl } from "../../config/config";

interface ITourInfoProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  addTourInfo: boolean;
  tourInfo: IAddTour | ITourInfo;
  isEditing: boolean;
}

export const TourInfo: FC<ITourInfoProps> = ({
  images,
  setImage,
  addTourInfo,
  tourInfo,
  isEditing,
}) => {
  const tagsConverter = (key: "free" | "additional" | "recommend") => {
    switch (key) {
      case "free": {
        return tourInfo?.tourServices?.freeServices &&
          tourInfo?.tourServices?.freeServices.length !== 0
          ? tourInfo?.tourServices?.freeServices.map((service, index) =>
              index === tourInfo?.tourServices?.freeServices.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      }
      case "additional": {
        return tourInfo?.tourServices?.additionalServices &&
          tourInfo?.tourServices?.additionalServices.length !== 0
          ? tourInfo?.tourServices?.additionalServices.map((service, index) =>
              index === tourInfo?.tourServices?.additionalServices.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Ничего не включено";
      }
      case "recommend": {
        return tourInfo?.recommendations &&
          tourInfo?.recommendations.length !== 0
          ? tourInfo?.recommendations.map((service, index) =>
              index === tourInfo?.recommendations.length - 1
                ? `${service}`
                : `${service} • `
            )
          : "Рекомендаций нет";
      }
    }
  };

  return (
    <>
      <Stack direction={"row"} alignItems={"center"} gap={1} marginBottom={2}>
        <SvgIcon>
          <MapMarker />
        </SvgIcon>
        <Typography variant={"caption"}>
          {tourInfo?.region ?? "Регион"}
        </Typography>
        <SvgIcon>
          <WalkingGuy />
        </SvgIcon>
        <Typography variant={"caption"}>
          {tourInfo?.category ?? "Категория"}
        </Typography>
      </Stack>
      <Grid container justifyContent={"space-between"}>
        <Grid item width={"100%"} md={5.1} className="addtour__carousel">
          <Carousel
            navButtonsAlwaysVisible
            indicators={false}
            navButtonsProps={{
              style: {
                backgroundColor: "white",
              },
            }}
            NextIcon={
              <SvgIcon fontSize="small">
                <ArrowRight width={24} height={24} />
              </SvgIcon>
            }
            PrevIcon={
              <SvgIcon fontSize="small">
                <ArrlowLeft width={24} height={24} />
              </SvgIcon>
            }
          >
            {tourInfo?.photos === undefined ? (
              images.filter((image) => image?.src === undefined).length !==
              0 ? (
                images
                  .filter((image) => image?.src === undefined)
                  .map((image, index) => (
                    <Box key={index} style={{ width: 490, height: 490 }}>
                      <img
                        src={image}
                        alt={`tour`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 40,
                        }}
                      />
                    </Box>
                  ))
              ) : (
                <Skeleton
                  variant="rounded"
                  sx={{
                    width: 490,
                    height: 490,
                    borderRadius: 8,
                  }}
                />
              )
            ) : isEditing ? (
              images.filter((image) => image?.src === undefined).length !==
              0 ? (
                images
                  .filter((image) => image?.src === undefined)
                  .map((image, index) => (
                    <Box key={index} style={{ width: 490, height: 490 }}>
                      <img
                        src={
                          image.includes("data:image/")
                            ? image
                            : baseUrl + "/" + image
                        }
                        alt={`tour`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: 40,
                        }}
                      />
                    </Box>
                  ))
              ) : (
                <Skeleton
                  variant="rounded"
                  sx={{
                    width: 490,
                    height: 490,
                    borderRadius: 8,
                  }}
                />
              )
            ) : (
              tourInfo?.photos &&
              tourInfo?.photos.map((image, index) => (
                <Box key={index} style={{ width: 490, height: 490 }}>
                  <img
                    src={baseUrl + "/" + image}
                    alt={`tour`}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 40,
                    }}
                  />
                </Box>
              ))
            )}
          </Carousel>
          <Typography variant={"h6"} marginY={2}>
            Описание
          </Typography>
          <Typography variant={"caption"}>
            {tourInfo?.tourDescription ?? "Описание тура"}
          </Typography>
        </Grid>
        <Grid container direction={"column"} item md={6} gap={2}>
          {addTourInfo ? <Attention /> : <></>}
          <Typography variant={"h5"}>
            {tourInfo?.price !== undefined
              ? tourInfo?.price ?? 0
              : tourInfo?.prices?.from === tourInfo?.prices?.to
              ? tourInfo?.prices?.from
              : (tourInfo?.prices?.from ?? 0) +
                " до " +
                (tourInfo?.prices?.to ?? 1000000)}
            ₽
          </Typography>
          {addTourInfo ? (
            <></>
          ) : (
            <>
              <Typography variant={"h6"}>Дата ближайшего тура</Typography>
              <Typography variant={"caption"}>
                {"nearestDate" in tourInfo
                  ? (dayjs(tourInfo?.nearestDate?.from).format("D MMMM YYYY") ??
                      "") +
                    " - " +
                    (dayjs(tourInfo?.nearestDate?.to).format("D MMMM YYYY") ??
                      "")
                  : ""}
              </Typography>
            </>
          )}
          <Typography variant={"h6"}>Проживание</Typography>
          <Typography variant={"caption"}>
            {tourInfo?.housingInclude !== null
              ? (tourInfo?.housingInclude?.housingName ?? "Отель") +
                ", " +
                (tourInfo?.housingInclude?.housingAddress ?? "Адрес") +
                ", " +
                (tourInfo?.housingInclude?.housingDescription ?? "Описание")
              : "Проживание не включено"}
          </Typography>
          <Typography variant={"h6"}>Страхование</Typography>
          <Typography variant={"caption"}>
            {tourInfo?.insuranceInclude !== null
              ? `Страхование включено, до ${
                  tourInfo?.insuranceInclude?.insuranceAmount ?? 0
                }₽`
              : "Страхование не включено"}
          </Typography>
          <Typography variant={"h6"}>Рекомендуемый возраст</Typography>
          <Typography variant={"caption"}>
            {tourInfo?.recommendedAge?.from === tourInfo?.recommendedAge?.to
              ? "C " + tourInfo?.recommendedAge?.to
              : (tourInfo?.recommendedAge?.from ?? "") +
                (tourInfo?.recommendedAge?.to !== undefined ? " - " : "") +
                (tourInfo?.recommendedAge?.to ?? "+")}
          </Typography>
          {addTourInfo ? (
            <></>
          ) : (
            <>
              <Typography variant={"h6"}>Сложность</Typography>
              <Typography variant={"caption"}>
                {tourInfo?.complexity ?? "1"}
              </Typography>
            </>
          )}
          <Typography variant={"h6"}>Включено в стоимость</Typography>
          <Typography variant={"caption"}>{tagsConverter("free")}</Typography>
          <Typography variant={"h6"}>Дополнительные услуги</Typography>
          <Typography variant={"caption"}>
            {tagsConverter("additional")}
          </Typography>
          <Typography variant={"h6"}>Рекомендации туристу</Typography>
          <Typography variant={"caption"}>
            {tagsConverter("recommend")}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
};
