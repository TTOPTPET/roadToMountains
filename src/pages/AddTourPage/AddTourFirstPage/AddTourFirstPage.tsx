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
import { AddTourImage } from "../../../components/AddTourModules/AddTourImage/AddTourImage";
import { Dispatch, SetStateAction, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTourField } from "../../../redux/AddTour/AddTourReducer";
import { RootState } from "../../../redux/store";
import { Attention } from "../../../components/Attention/Attention";
import { IFilter } from "../../../models/tourListModels/IFilter";
import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";
import { lightTurquoiseColor, redColor } from "../../../config/MUI/color/color";

interface IAddTourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  files: any[];
  setFiles: (prop: any[]) => void;
  filters: IFilter;
  isEditing: boolean;
  addError: boolean;
}

export const AddTourFirstPage: FC<IAddTourFirstPageProps> = ({
  images,
  setImage,
  files,
  setFiles,
  filters,
  isEditing,
  addError,
}) => {
  const dispatch = useDispatch();

  const tourInfo = useSelector((state: RootState) => state.addTour.tourFields);
  console.log(tourInfo);
  return (
    <Stack gap={1} marginTop={2}>
      <TextField
        sx={{ width: "45%" }}
        placeholder={"Название тура"}
        value={tourInfo?.tourName ?? ""}
        required
        error={addError && tourInfo?.tourName === ""}
        onChange={(e) => dispatch(setTourField({ tourName: e.target.value }))}
      />
      <Grid container justifyContent={"space-between"}>
        <Grid item md={5.6}>
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
          <StyledTextAreaAutosize
            placeholder={"Описание тура (не более 2500 символов)"}
            maxLength={2500}
            minRows={2}
            sx={{
              minHeight: "30px",
              backgroundColor: lightTurquoiseColor,
              margin: "0 0",
              border:
                addError && tourInfo?.tourDescription === ""
                  ? `1px solid ${redColor}`
                  : "",
            }}
            value={tourInfo?.tourDescription ?? ""}
            onChange={(e) =>
              dispatch(setTourField({ tourDescription: e.target.value }))
            }
          />
        </Grid>
        <Grid container item md={6}>
          <Grid item>
            <Attention />
          </Grid>

          <Grid container direction={"row"} marginTop={5} spacing={2}>
            <Grid item md={6}>
              <Typography variant={"h6"} marginBottom={1}>
                Регион проведения
              </Typography>
              <Autocomplete
                freeSolo
                disableClearable
                options={filters.regions.map((region) => region)}
                value={tourInfo?.region ?? ""}
                renderInput={(params) => (
                  <TextField
                    placeholder={"Регион"}
                    {...params}
                    error={addError && tourInfo?.region === ""}
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
                  required
                  error={addError && tourInfo?.recommendedAge?.from === null}
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
                  required
                  error={addError && tourInfo?.recommendedAge?.to === null}
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
                error={addError && tourInfo?.price === null}
                required
                onChange={(e) =>
                  dispatch(setTourField({ price: +e.target.value }))
                }
              />
            </Grid>
            <Grid item md={5}>
              <Typography variant={"h6"}>Категория тура</Typography>
              <RadioGroup
                value={tourInfo?.category ?? ""}
                onChange={(e) =>
                  dispatch(setTourField({ category: e.target.value }))
                }
              >
                {filters.category.map((category, index) => (
                  <FormControlLabel
                    key={index}
                    value={category}
                    control={
                      <Radio
                        sx={{
                          color:
                            addError && tourInfo?.category === ""
                              ? redColor
                              : "",
                        }}
                      />
                    }
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
