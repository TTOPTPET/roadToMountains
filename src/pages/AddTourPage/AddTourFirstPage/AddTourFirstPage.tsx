import {
  Autocomplete,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { AddTourImage } from "../../../components/AddTourModules/AddTourImage/AddTourImage";
import { Dispatch, SetStateAction, FC } from "react";
import { Attention } from "../../../components/Attention/Attention";
import { IFilter } from "../../../models/tourListModels/IFilter";
import { StyledTextAreaAutosize } from "../../../config/MUI/styledComponents/StyledTextAreaAutosize";
import { lightTurquoiseColor, redColor } from "../../../config/MUI/color/color";
import { IAddTour } from "../../../models/addTourModels/IAddTour";

interface IAddTourFirstPageProps {
  images: any[];
  setImage: Dispatch<SetStateAction<any[]>>;
  tourInfo: IAddTour;
  setTourInfo: Dispatch<SetStateAction<IAddTour>>;
  filters: IFilter;
  isEditing: boolean;
  addError: boolean;
}

export const AddTourFirstPage: FC<IAddTourFirstPageProps> = ({
  images,
  setImage,
  tourInfo,
  setTourInfo,
  filters,
  isEditing,
  addError,
}) => {
  const media = useMediaQuery("(max-width: 1200px)", { noSsr: true });
  return (
    <Grid container justifyContent={media ? "center" : "space-between"}>
      <Grid item xs={5.2} minWidth={500}>
        <TextField
          label={"Название тура"}
          value={tourInfo?.tourName || ""}
          required
          error={
            (addError && tourInfo?.tourName === undefined) ||
            tourInfo?.tourName === ""
          }
          sx={{ marginBottom: "15px" }}
          onChange={(e) =>
            setTourInfo({ ...tourInfo, tourName: e.target.value })
          }
        />
        <AddTourImage
          images={images}
          setImage={setImage}
          tourInfo={tourInfo}
          setTourInfo={setTourInfo}
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
              (addError && tourInfo?.tourDescription === undefined) ||
              tourInfo?.tourDescription === ""
                ? `1px solid ${redColor}`
                : "",
          }}
          value={tourInfo?.tourDescription || ""}
          onChange={(e) =>
            setTourInfo({ ...tourInfo, tourDescription: e.target.value })
          }
        />
      </Grid>
      <Grid
        container
        item
        xs={6}
        justifyContent={"flex-start"}
        minWidth={500}
        mt={media ? 2 : 0}
      >
        <Grid item>
          <Attention text="Обращаем Ваше внимание, что все изменения будут применены только к предстоящим записям. Забронированные туры обслуживаются по старому тарифу." />
        </Grid>
        <Grid container item justifyContent={"space-between"} mt={2}>
          <Stack direction={"column"}>
            <Typography variant={"h6"} marginBottom={1}>
              Регион проведения
            </Typography>
            <Autocomplete
              freeSolo
              disableClearable
              options={filters.regions.map((region) => region)}
              value={tourInfo?.region || ""}
              renderInput={(params) => (
                <TextField
                  label={"Регион"}
                  {...params}
                  error={
                    (addError && tourInfo?.region === undefined) ||
                    tourInfo?.region === ""
                  }
                  onChange={(e) =>
                    setTourInfo({ ...tourInfo, region: e.target.value })
                  }
                  InputProps={{ ...params.InputProps, type: "search" }}
                />
              )}
              onChange={(e: any, value: string) =>
                setTourInfo({ ...tourInfo, region: value })
              }
            />
          </Stack>
          <Stack direction={"column"}>
            <Typography variant={"h6"}>Категория тура</Typography>
            <RadioGroup
              value={tourInfo?.category || ""}
              onChange={(e) =>
                setTourInfo({
                  ...tourInfo,
                  category: e.target.value,
                })
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
                          (addError && tourInfo?.category === undefined) ||
                          tourInfo?.category === ""
                            ? redColor
                            : "",
                      }}
                    />
                  }
                  label={category}
                />
              ))}
            </RadioGroup>
          </Stack>
        </Grid>
        <Grid item container md={6}>
          <Typography variant={"h6"}>Рекомендуемый возраст</Typography>
          <Stack direction={"row"} marginTop={1} gap={2} width={"100%"}>
            <TextField
              InputProps={{ inputProps: { min: 0 } }}
              type={"number"}
              label={"От"}
              value={tourInfo?.recommendedAge?.from || ""}
              required
              error={
                (addError && tourInfo?.recommendedAge?.from === undefined) ||
                tourInfo?.recommendedAge?.from === 0
              }
              onChange={(e) =>
                setTourInfo({
                  ...tourInfo,
                  recommendedAge: {
                    ...tourInfo?.recommendedAge,
                    from: +e.target.value,
                  },
                })
              }
            />
            <TextField
              InputProps={{ inputProps: { min: 0 } }}
              type={"number"}
              label={"До"}
              value={tourInfo?.recommendedAge?.to || ""}
              required
              error={
                (addError && tourInfo?.recommendedAge?.to === undefined) ||
                tourInfo?.recommendedAge?.to === 0
              }
              onChange={(e) =>
                setTourInfo({
                  ...tourInfo,
                  recommendedAge: {
                    ...tourInfo?.recommendedAge,
                    to: +e.target.value,
                  },
                })
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
            label={"Стоимость тура"}
            value={tourInfo?.price || ""}
            error={
              (addError && tourInfo?.price === undefined) || tourInfo?.price < 1
            }
            required
            onChange={(e) =>
              setTourInfo({
                ...tourInfo,
                price: +e.target.value,
              })
            }
          />
          {tourInfo?.price && tourInfo?.price < 1 ? (
            <Typography
              variant="caption"
              sx={{ color: redColor, mt: "10px", textAlign: "center" }}
            >
              Минимальная стоимость - 1 рубль
            </Typography>
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
};
