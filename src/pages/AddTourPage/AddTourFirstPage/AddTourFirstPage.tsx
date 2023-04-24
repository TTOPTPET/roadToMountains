import {
  Autocomplete,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { AddTourImage } from "../../../components/AddTourImage/AddTourImage";
import { Dispatch, SetStateAction, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTourField } from "../../../redux/AddTour/AddTourReducer";
import { RootState } from "../../../redux/store";
import { Attention } from "../../../components/Attention/Attention";

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

interface IAddTourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  files: any[];
  setFiles: (prop: any[]) => void;
  isEditing: boolean;
}

export const AddTourFirstPage: FC<IAddTourFirstPageProps> = ({
  images,
  setImage,
  files,
  setFiles,
  isEditing,
}) => {
  const dispatch = useDispatch();

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);
  return (
    <Stack gap={1} marginTop={2}>
      <TextField
        sx={{ width: "45%" }}
        placeholder={"Название тура"}
        value={tourInfo?.tourName ?? ""}
        onChange={(e) => dispatch(setTourField({ tourName: e.target.value }))}
      />
      <Grid container spacing={6}>
        <Grid item sm={5.6}>
          <AddTourImage
            images={images}
            setImage={setImage}
            files={files}
            setFiles={setFiles}
            isEditing={isEditing}
          />
          <Typography variant={"h6"} marginBottom={1}>
            Описание
          </Typography>
          <TextField
            fullWidth
            placeholder={"Описание тура (не более 2500 символов)"}
            InputProps={{ inputProps: { maxLength: 2500 } }}
            value={tourInfo?.tourDescription ?? ""}
            onChange={(e) =>
              dispatch(setTourField({ tourDescription: e.target.value }))
            }
          />
        </Grid>
        <Grid container item sm={6}>
          <Grid item>
            <Attention />
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
                value={tourInfo?.region ?? ""}
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
              <Typography variant={"h6"} marginTop={30}>
                Рекомендуемый возраст
              </Typography>
              <Stack direction={"row"} marginTop={1} gap={2}>
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  type={"number"}
                  placeholder={"От"}
                  value={tourInfo?.recommendedAge?.from ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setTourField({
                        recommendedAge: {
                          ...tourInfo?.recommendedAge,
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
                  value={tourInfo?.recommendedAge?.to ?? ""}
                  onChange={(e) =>
                    dispatch(
                      setTourField({
                        recommendedAge: {
                          ...tourInfo?.recommendedAge,
                          to: +e.target.value,
                        },
                      })
                    )
                  }
                />
              </Stack>
              <Typography variant={"h6"} marginTop={2}>
                Стоимость тура на человека
              </Typography>
              <TextField
                sx={{ marginTop: 1 }}
                fullWidth
                type={"number"}
                InputProps={{ inputProps: { min: 0 } }}
                placeholder={"Стоимость тура"}
                value={tourInfo?.price ?? ""}
                onChange={(e) =>
                  dispatch(setTourField({ price: +e.target.value }))
                }
              />
            </Grid>
            <Grid item xs={5}>
              <Typography variant={"h6"}>Категория тура</Typography>
              <RadioGroup
                value={tourInfo?.category ?? ""}
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
        </Grid>
      </Grid>
    </Stack>
  );
};
