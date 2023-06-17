import {
  Chip,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, FC, Dispatch, SetStateAction } from "react";
import { redColor } from "../../../config/MUI/color/color";
import MapLeaflet from "../../../components/MapLeaflet/MapLeaflet";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

const turnOnDefault: string[] = ["Не включено", "Включено"];

const difficultDefault: string[] = [
  "Легко",
  "Ниже среднего",
  "Релакс",
  "Средне",
  "Сложно",
  "Тренировка",
  "Экстрим",
];

interface IAddTourSecondPageProps {
  addError: boolean;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
}

export const AddTourSecondPage: FC<IAddTourSecondPageProps> = ({
  addError,
  tourInfo,
  setTourInfo,
}) => {
  const [residency, setResidency] = useState<string>(turnOnDefault[0]);
  const [insurance, setInsurance] = useState<string>(turnOnDefault[0]);

  const handleChangeResidency = () => {
    if (residency === turnOnDefault[0]) {
      setResidency(turnOnDefault[1]);
    } else {
      setResidency(turnOnDefault[0]);
    }
  };

  const handleChangeInsurance = () => {
    if (insurance === turnOnDefault[0]) {
      setInsurance(turnOnDefault[1]);
    } else {
      setInsurance(turnOnDefault[0]);
    }
  };

  const handleDeleteTourServices = (
    e: string,
    key: "free" | "additional" | "recommend"
  ) => {
    switch (key) {
      case "free": {
        setTourInfo({
          ...tourInfo,
          tourServices: {
            ...tourInfo?.tourServices,
            freeServices: [
              ...(tourInfo?.tourServices?.freeServices.filter(
                (item) => item !== e
              ) || []),
            ],
          },
        });
        break;
      }
      case "additional": {
        setTourInfo({
          ...tourInfo,
          tourServices: {
            ...tourInfo?.tourServices,
            additionalServices: [
              ...(tourInfo?.tourServices?.additionalServices.filter(
                (item) => item !== e
              ) || []),
            ],
          },
        });
        break;
      }
      case "recommend": {
        setTourInfo({
          ...tourInfo,
          recommendations: [
            ...(tourInfo?.recommendations.filter((item) => item !== e) || []),
          ],
        });
        break;
      }
      default:
        break;
    }
  };

  const handleFreeServices = (e: any) => {
    if (e.keyCode === 13) {
      setTourInfo({
        ...tourInfo,
        tourServices: {
          ...tourInfo?.tourServices,
          freeServices: [
            ...(tourInfo?.tourServices?.freeServices || []),
            e.target.value,
          ],
        },
      });
    }
  };

  const handleAdditionalServices = (e: any) => {
    if (e.keyCode === 13) {
      setTourInfo({
        ...tourInfo,
        tourServices: {
          ...tourInfo?.tourServices,
          additionalServices: [
            ...(tourInfo?.tourServices?.additionalServices || []),
            e.target.value,
          ],
        },
      });
    }
  };

  const handleRecommendations = (e: any) => {
    if (e.keyCode === 13) {
      setTourInfo({
        ...tourInfo,
        recommendations: [...(tourInfo?.recommendations || []), e.target.value],
      });
    }
  };

  return (
    <Stack gap={1}>
      <Typography variant={"h3"}>
        {tourInfo?.tourName || "Название тура"}
      </Typography>
      <Grid container item direction={"row"} justifyContent={"space-between"}>
        <Grid item sm={3.5} className="add__residency">
          <Stack minHeight={350}>
            <Typography variant={"h5"}>Проживание</Typography>
            <RadioGroup
              defaultValue={turnOnDefault[0]}
              onChange={handleChangeResidency}
            >
              {turnOnDefault.map((turnOn, index) => (
                <FormControlLabel
                  key={index}
                  label={turnOn}
                  control={<Radio />}
                  value={turnOn}
                />
              ))}
            </RadioGroup>
            <Stack gap={1}>
              <TextField
                placeholder={"Название гостиницы"}
                disabled={residency === turnOnDefault[0] ? true : false}
                value={tourInfo?.housingInclude?.housingName || ""}
                sx={{ width: "75%" }}
                onChange={(e) =>
                  setTourInfo({
                    ...tourInfo,
                    housingInclude: {
                      ...tourInfo?.housingInclude,
                      housingName: e.target.value,
                    },
                  })
                }
              />
              <TextField
                placeholder={"Адрес гостиницы"}
                disabled={residency === turnOnDefault[0] ? true : false}
                value={tourInfo?.housingInclude?.housingAddress || ""}
                sx={{ width: "75%" }}
                onChange={(e) =>
                  setTourInfo({
                    ...tourInfo,
                    housingInclude: {
                      ...tourInfo?.housingInclude,
                      housingAddress: e.target.value,
                    },
                  })
                }
              />
              <TextField
                placeholder={"Описание гостиницы"}
                disabled={residency === turnOnDefault[0] ? true : false}
                value={tourInfo?.housingInclude?.housingDescription || ""}
                sx={{ width: "75%" }}
                onChange={(e) =>
                  setTourInfo({
                    ...tourInfo,
                    housingInclude: {
                      ...tourInfo?.housingInclude,
                      housingDescription: e.target.value,
                    },
                  })
                }
              />
            </Stack>
          </Stack>

          <Typography variant={"h5"}>Включено в стоимость</Typography>
          <Stack flexWrap={"wrap"} direction={"row"} gap={1} marginBottom={1}>
            {tourInfo?.tourServices?.freeServices &&
              tourInfo?.tourServices?.freeServices.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant={"outlined"}
                  onDelete={() => handleDeleteTourServices(tag, "free")}
                />
              ))}
          </Stack>
          <TextField
            placeholder={"Услуга"}
            sx={{ width: "75%" }}
            onKeyDown={handleFreeServices}
          />
        </Grid>
        <Grid item sm={3.5} className="add__insurance">
          <Stack minHeight={350}>
            <Typography variant={"h5"}>Страхование</Typography>
            <RadioGroup
              defaultValue={turnOnDefault[0]}
              onChange={handleChangeInsurance}
            >
              {turnOnDefault.map((turnOn, index) => (
                <FormControlLabel
                  key={index}
                  label={turnOn}
                  control={<Radio />}
                  value={turnOn}
                />
              ))}
            </RadioGroup>
            <Stack gap={1}>
              <TextField
                placeholder={"Номер страхования"}
                disabled={insurance === turnOnDefault[0] ? true : false}
                type={"number"}
                value={tourInfo?.insuranceInclude?.insuranceNumber || ""}
                sx={{ width: "75%" }}
                onChange={(e) =>
                  setTourInfo({
                    ...tourInfo,
                    insuranceInclude: {
                      ...tourInfo?.insuranceInclude,
                      insuranceNumber: +e.target.value,
                    },
                  })
                }
              />
              <TextField
                placeholder={"Сумма страхования"}
                disabled={insurance === turnOnDefault[0] ? true : false}
                type={"number"}
                value={tourInfo?.insuranceInclude?.insuranceAmount || ""}
                sx={{ width: "75%" }}
                onChange={(e) =>
                  setTourInfo({
                    ...tourInfo,
                    insuranceInclude: {
                      ...tourInfo?.insuranceInclude,
                      insuranceAmount: +e.target.value,
                    },
                  })
                }
              />
            </Stack>
          </Stack>

          <Typography variant={"h5"}>Дополнительные услуги</Typography>
          <Stack flexWrap={"wrap"} direction={"row"} gap={1} marginBottom={1}>
            {tourInfo?.tourServices?.additionalServices &&
              tourInfo?.tourServices?.additionalServices.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant={"outlined"}
                  onDelete={() => handleDeleteTourServices(tag, "additional")}
                />
              ))}
          </Stack>
          <TextField
            placeholder={"Услуга"}
            sx={{ width: "75%" }}
            onKeyDown={handleAdditionalServices}
          />
        </Grid>
        <Grid item sm={3.5} className="add__recommendations">
          <Stack minHeight={350}>
            <Typography variant={"h5"}>Сложность маршрута</Typography>
            <RadioGroup
              value={tourInfo?.complexity || ""}
              onChange={(e) =>
                setTourInfo({ ...tourInfo, complexity: e.target.value })
              }
            >
              {difficultDefault.map((difficult, index) => (
                <FormControlLabel
                  key={index}
                  label={difficult}
                  control={
                    <Radio
                      sx={{
                        color:
                          (addError && tourInfo?.complexity === undefined) ||
                          tourInfo?.complexity === ""
                            ? redColor
                            : "",
                      }}
                    />
                  }
                  value={difficult}
                />
              ))}
            </RadioGroup>
          </Stack>

          <Typography variant={"h5"}>Рекомендации туристу</Typography>
          <Stack flexWrap={"wrap"} direction={"row"} gap={1} marginBottom={1}>
            {tourInfo?.recommendations &&
              tourInfo?.recommendations.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  variant={"outlined"}
                  onDelete={() => handleDeleteTourServices(tag, "recommend")}
                />
              ))}
          </Stack>
          <TextField
            placeholder={"Услуга"}
            sx={{ width: "75%" }}
            onKeyDown={handleRecommendations}
          />
        </Grid>
      </Grid>
      <Typography variant={"h5"} mt={5}>
        Маршрут
      </Typography>
      <MapLeaflet
        width={"100%"}
        height={"330px"}
        accessType="insert"
        positions={tourInfo?.mapPoints}
        setPositions={(positions) => {
          setTourInfo({ ...tourInfo, mapPoints: positions });
        }}
      />
    </Stack>
  );
};
