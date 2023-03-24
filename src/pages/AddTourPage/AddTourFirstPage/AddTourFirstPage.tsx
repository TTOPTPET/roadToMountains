import {
  Autocomplete,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { AddTourImage } from "../../../components/AddTourImage/AddTourImage";
import { useState } from "react";
import { ReactComponent as AttentionIcon } from "../../../media/Attention.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTourField } from "../../../redux/AddTour/AddTourReducer";
import { RootState } from "../../../redux/store";

const regions = [
  "Регион РФ",
  "Алтайский край",
  "Владимирская область",
  "Иркутская область",
  "Москва",
  "Самарская область",
  "Тверская область",
];

const tourCategory = [
  "Джип-тур",
  "Кемпинг",
  "Конные прогулки",
  "Рафтинг",
  "Треккинг",
  "Хайкинг",
  "Экскурсия",
];

const loadImages = {
  src: "",
  loading: true,
};

export const AddTourFirstPage = () => {
  const [images, setImage] = useState<any[]>(
    new Array<typeof loadImages>(8).fill(loadImages)
  );
  const dispatch = useDispatch();

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);

  return (
    <Stack gap={1}>
      <TextField
        sx={{ width: "48%" }}
        placeholder={"Название тура"}
        onChange={(e) => dispatch(setTourField({ tourName: e.target.value }))}
      />
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <AddTourImage images={images} setImage={setImage} />
          <Typography variant={"h6"} marginBottom={1}>
            Описание
          </Typography>
          <TextField
            fullWidth
            placeholder={"Описание тура (не более 2500 символов)"}
            InputProps={{ inputProps: { maxLength: 2500 } }}
            onChange={(e) =>
              dispatch(setTourField({ tourDescription: e.target.value }))
            }
          />
        </Grid>
        <Grid container item xs={6}>
          <Grid item>
            <Paper elevation={5} sx={{ height: "136px" }}>
              <Stack gap={1} direction={"row"}>
                <SvgIcon viewBox="0 0 33.33 33.33" fontSize="large">
                  <AttentionIcon />
                </SvgIcon>
                <Typography variant="caption" width={"auto"}>
                  Обращаем Ваше внимание, что все <br />
                  изменения будут применены только <br />
                  к предстоящим записям. Забронированные <br /> туры
                  обслуживаются по старому тарифу.
                </Typography>
              </Stack>
            </Paper>
          </Grid>

          <Grid container direction={"row"} marginTop={5} spacing={2}>
            <Grid item xs={6}>
              <Typography variant={"h6"} marginBottom={1}>
                Регион проведения
              </Typography>
              <Autocomplete
                freeSolo
                disableClearable
                options={regions.map((region) => region)}
                renderInput={(params) => (
                  <TextField
                    placeholder={"Регион"}
                    {...params}
                    InputProps={{ ...params.InputProps, type: "search" }}
                  />
                )}
                onChange={(e: any, value: string) =>
                  dispatch(setTourField({ region: value }))
                }
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant={"h6"}>Категория тура</Typography>
              <RadioGroup
                onChange={(e) =>
                  dispatch(setTourField({ category: e.target.value }))
                }
              >
                {tourCategory.map((category, index) => (
                  <FormControlLabel
                    key={index}
                    value={category}
                    control={<Radio />}
                    label={category}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid item marginTop={1}>
            <Typography variant={"h6"}>Рекомендуемый возраст</Typography>
            <Stack direction={"row"} marginTop={1}>
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                type={"number"}
                placeholder={"От"}
                onChange={(e) =>
                  dispatch(
                    setTourField({
                      recommendedAge: {
                        ...tourInfo.recommendedAge,
                        from: +e.target.value,
                      },
                    })
                  )
                }
              />
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                type={"number"}
                placeholder={"До"}
                onChange={(e) =>
                  dispatch(
                    setTourField({
                      recommendedAge: {
                        ...tourInfo.recommendedAge,
                        to: +e.target.value,
                      },
                    })
                  )
                }
              />
            </Stack>
          </Grid>
          <Grid item marginTop={1}>
            <Typography variant={"h6"}>Стоимость тура на человека</Typography>
            <TextField
              sx={{ marginTop: 1 }}
              fullWidth
              type={"number"}
              InputProps={{ inputProps: { min: 0 } }}
              placeholder={"Стоимость тура"}
              onChange={(e) =>
                dispatch(setTourField({ price: +e.target.value }))
              }
            />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
