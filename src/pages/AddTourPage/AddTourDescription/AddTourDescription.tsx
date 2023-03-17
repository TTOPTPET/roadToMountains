import {
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  SvgIcon,
  TextField,
  Typography,
} from "@mui/material";
import { AddTourImage } from "../../../components/AddTourImage/AddTourImage";
import { useContext, useState } from "react";
import { RoutingContext, pagesMap } from "../AddTourRouting/AddTourRouting";
import { IAddTourProps } from "../AddTourPage";
import { ReactComponent as AttentionIcon } from "../../../media/Attention.svg";

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

export const AddTourDescription = ({
  handlerTextFieldChange,
  handlerSelectChange,
  handlerChangeAge,
  addTourData,
}: IAddTourProps) => {
  const [images, setImage] = useState<any[]>([]);

  const { page, setPage } = useContext(RoutingContext);

  return (
    <Stack gap={1}>
      {page}
      <Stack direction={"row"} justifyContent={"space-between"}>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage("addTour")}
        >
          {"< "} Назад
        </Typography>
        <Typography
          variant={"button"}
          component={"button"}
          onClick={() => setPage(pagesMap.travel)}
        >
          Вперёд {" >"}
        </Typography>
      </Stack>

      <TextField
        sx={{ width: 500, height: 50 }}
        label={"Название тура"}
        onChange={(e) => handlerTextFieldChange("tourName", e)}
      />

      <Grid container justifyContent={"space-between"} direction={"row"}>
        <Grid item xs={6}>
          <AddTourImage images={images} setImage={setImage} />
          <Typography component={"h5"}> Описание</Typography>
          <TextField
            sx={{ width: 500, height: 110 }}
            label={"Описание тура (не более 2500 символов)"}
            onChange={(e) => handlerTextFieldChange("tourDescription", e)}
            InputProps={{ inputProps: { maxLength: 2500 } }}
          />
        </Grid>
        <Grid container direction={"column"} width={"50%"}>
          <Grid item>
            <Stack
              padding={2}
              gap={1}
              direction={"row"}
              width={464}
              height={136}
              borderRadius={5}
              boxShadow={4}
            >
              <SvgIcon viewBox="0 0 33.33 33.33" fontSize="large">
                <AttentionIcon />
              </SvgIcon>
              <Typography component={"p"} width={"auto"}>
                Обращаем Ваше внимание, что все <br />
                изменения будут применены только <br />
                к предстоящим записям. Забронированные <br /> туры обслуживаются
                по старому тарифу.
              </Typography>
            </Stack>
          </Grid>

          <Grid container direction={"row"} marginTop={5}>
            <Grid item xs={5}>
              <Typography component={"h5"}>Регион проведения</Typography>
              <Select
                value={addTourData.region}
                onChange={(e) => handlerSelectChange("region", e)}
              >
                {regions.map((region, index) => (
                  <MenuItem value={region} key={index}>
                    {region}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item xs={5}>
              <Typography component={"h5"}>Категория тура</Typography>
              <RadioGroup
                value={addTourData.category}
                onChange={(e) => handlerTextFieldChange("category", e)}
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
            <Typography component={"h5"}>Рекомендуемый возраст</Typography>
            <Stack direction={"row"} marginTop={2}>
              <TextField
                sx={{ width: 105 }}
                InputProps={{ inputProps: { min: 0 } }}
                type={"number"}
                label={"От"}
                onChange={(e) => handlerChangeAge("from", e)}
              />
              <TextField
                sx={{ width: 105 }}
                InputProps={{ inputProps: { min: 0 } }}
                type={"number"}
                label={"До"}
                onChange={(e) => handlerChangeAge("to", e)}
              />
            </Stack>
          </Grid>
          <Grid item marginTop={1}>
            <Typography component={"h5"}>Стоимость тура на человека</Typography>
            <TextField
              sx={{ width: 220, marginTop: 2 }}
              type={"number"}
              InputProps={{ inputProps: { min: 0 } }}
              label={"Стоимость тура"}
              onChange={(e) => handlerTextFieldChange("price", e)}
            />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};
