import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
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
import { useState } from "react";
import { setTourField } from "../../../redux/AddTour/AddTourReducer";

const turnOnDefault: string[] = ["Не включено", "Включено"];

const difficultDefault: string[] = ["1", "2", "3", "4", "5"];

export const AddTourSecondPage = () => {
  const [residency, setResidency] = useState<string>(turnOnDefault[0]);
  const [insurance, setInsurance] = useState<string>(turnOnDefault[0]);

  const dispatch = useDispatch();

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);

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
        dispatch(
          setTourField({
            tourServices: {
              ...tourInfo?.tourServices,
              freeServices: [
                ...(tourInfo?.tourServices?.freeServices.filter(
                  (item) => item !== e
                ) ?? []),
              ],
            },
          })
        );
        break;
      }
      case "additional": {
        dispatch(
          setTourField({
            tourServices: {
              ...tourInfo?.tourServices,
              additionalServices: [
                ...(tourInfo?.tourServices?.additionalServices.filter(
                  (item) => item !== e
                ) ?? []),
              ],
            },
          })
        );
        break;
      }
      case "recommend": {
        dispatch(
          setTourField({
            recommendations: [
              ...(tourInfo?.recommendations.filter((item) => item !== e) ?? []),
            ],
          })
        );
        break;
      }
    }
  };

  const handleFreeServices = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(
        setTourField({
          tourServices: {
            ...tourInfo?.tourServices,
            freeServices: [
              ...(tourInfo?.tourServices?.freeServices ?? []),
              e.target.value,
            ],
          },
        })
      );
    }
  };

  const handleAdditionalServices = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(
        setTourField({
          tourServices: {
            ...tourInfo?.tourServices,
            additionalServices: [
              ...(tourInfo?.tourServices?.additionalServices ?? []),
              e.target.value,
            ],
          },
        })
      );
    }
  };

  const handleRecommendations = (e: any) => {
    if (e.keyCode === 13) {
      dispatch(
        setTourField({
          recommendations: [
            ...(tourInfo?.recommendations ?? []),
            e.target.value,
          ],
        })
      );
    }
  };

  return (
    <Stack gap={1} marginTop={2}>
      {JSON.stringify(tourInfo)}
      <Typography variant={"h3"}>
        {tourInfo?.tourName ?? "Название тура"}
      </Typography>
      <Grid container item direction={"row"} justifyContent={"space-between"}>
        <Grid item sm={3.5} className="add__residency">
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
          <TextField
            placeholder={"Адрес гостиницы"}
            disabled={residency === turnOnDefault[0] ? true : false}
            value={tourInfo?.housingInclud?.housingAddress ?? ""}
            sx={{ width: "75%" }}
            onChange={(e) =>
              dispatch(
                setTourField({
                  housingInclud: {
                    ...tourInfo?.housingInclud,
                    housingAddress: e.target.value,
                  },
                })
              )
            }
          />
          <Typography variant={"h5"} marginTop={10}>
            Включено в стоимость
          </Typography>
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
          <TextField
            placeholder={"Сумма страхования"}
            disabled={insurance === turnOnDefault[0] ? true : false}
            type={"number"}
            value={tourInfo?.insuranceInclude?.insuranceNumber ?? ""}
            sx={{ width: "75%" }}
            onChange={(e) =>
              dispatch(
                setTourField({
                  insuranceInclude: {
                    ...tourInfo?.insuranceInclude,
                    insuranceNumber: +e.target.value,
                  },
                })
              )
            }
          />
          <Typography variant={"h5"} marginTop={10}>
            Дополнительные услуги
          </Typography>
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
          <Typography variant={"h5"}>Сложность маршрута</Typography>
          <RadioGroup
            onChange={(e) =>
              dispatch(setTourField({ complexity: e.target.value }))
            }
          >
            {difficultDefault.map((difficult, index) => (
              <FormControlLabel
                key={index}
                label={difficult}
                control={<Radio />}
                value={difficult}
              />
            ))}
          </RadioGroup>
          <Typography variant={"h5"} marginTop={0.5}>
            Рекомаендации туристу
          </Typography>
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
    </Stack>
  );
};
