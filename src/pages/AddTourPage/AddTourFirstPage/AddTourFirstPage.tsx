import {
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
import { useState, useEffect } from "react";
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

export const AddTourFirstPage = () => {
  const [images, setImage] = useState<any[]>([]);
  const dispatch = useDispatch();

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);

  // dispatch(setTourField({ category: "a" }));

  return (
    <Stack gap={1}>
      <TextField sx={{ width: 500, height: 50 }} label={"Название тура"} />
      {JSON.stringify(tourInfo)}
      <Grid container spacing={6}>
        <Grid item xs={6}>
          <AddTourImage images={images} setImage={setImage} />
          <Typography variant={"h6"}> Описание</Typography>
          <TextField
            sx={{ width: 500, height: 110 }}
            label={"Описание тура (не более 2500 символов)"}
            InputProps={{ inputProps: { maxLength: 2500 } }}
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

          <Grid container direction={"row"} marginTop={5}>
            <Grid item xs={5}>
              {/* <Typography component={"h5"}>Регион проведения</Typography>
              <Select>
                {regions.map((region, index) => (
                  <MenuItem value={region} key={index}>
                    {region}
                  </MenuItem>
                ))}
              </Select> */}
              {/* TODO: AutocompliteMui */}
            </Grid>
            <Grid item xs={5}>
              <Typography variant={"h5"}>Категория тура</Typography>
              <RadioGroup>
                {tourCategory.map((category, index) => (
                  <FormControlLabel
                    key={index}
                    value={category}
                    control={<Radio />}
                    //TODO: Стилизация в mainTheme
                    label={category}
                  />
                ))}
              </RadioGroup>
            </Grid>
          </Grid>
          <Grid item marginTop={1}>
            <Typography variant={"h5"}>Рекомендуемый возраст</Typography>
            <Stack direction={"row"} marginTop={2}>
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                type={"number"}
                label={"От"}
              />
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                type={"number"}
                label={"До"}
              />
            </Stack>
          </Grid>
          <Grid item marginTop={1}>
            <Typography variant={"h5"}>Стоимость тура на человека</Typography>
            <TextField
              sx={{ marginTop: 2 }}
              fullWidth
              type={"number"}
              InputProps={{ inputProps: { min: 0 } }}
              label={"Стоимость тура"}
              // onChange={(e)=>dispatch(setNewTour({date:e.target.value}))}
            />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
