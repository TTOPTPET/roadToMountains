import { FC } from "react";
import { IFilter } from "../../../models/tourListModels/IFilter";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Slider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  isModalActive,
  setModalInactive,
} from "../../../redux/Modal/ModalReducer";
import { RootState } from "../../../redux/store";

const tourDuration: string[] = [
  "Менее недели",
  "1-2 недели",
  "2 недели - 1 месяц",
  "Более месяца",
  "Другое:",
];

export const ComplexFilter: FC<IFilter> = ({
  category,
  complexity,
  maxPrice,
}) => {
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();

  const marks = [
    {
      value: 0,
      label: 0,
    },
    {
      value: maxPrice,
      label: maxPrice,
    },
  ];

  const age = [
    {
      value: 0,
      label: 0,
    },
    {
      value: 120,
      label: 120,
    },
  ];
  return (
    <Dialog
      className="filters"
      onClose={() => dispatch(setModalInactive("filterModal"))}
      open={isModalActive("filterModal", activeModals)}
      fullWidth
      maxWidth={"lg"}
    >
      <DialogContent>
        <Grid container item direction={"row"} justifyContent={"space-between"}>
          <Grid item sm={3}>
            <Typography variant={"h5"}>Категория тура</Typography>
            <RadioGroup>
              {category.map((cat, index) => (
                <FormControlLabel
                  key={index}
                  value={cat}
                  control={<Checkbox />}
                  label={cat}
                />
              ))}
            </RadioGroup>
          </Grid>
          <Grid item sm={4}>
            <Typography variant={"h5"}>Длительность тура</Typography>
            <RadioGroup>
              {tourDuration.map((duration, index) => (
                <FormControlLabel
                  key={index}
                  value={duration}
                  control={<Radio />}
                  label={duration}
                />
              ))}
            </RadioGroup>
            <TextField
              color={"secondary"}
              placeholder="Введите колличество дней"
            />
            <Typography variant={"h5"} marginTop={2}>
              Стоимость
            </Typography>
            <Slider max={maxPrice} marks={marks} valueLabelDisplay="auto" />
          </Grid>
          <Grid item sm={3}>
            <Typography variant={"h5"}>Сложность маршрута</Typography>
            <RadioGroup>
              {complexity.map((compl, index) => (
                <FormControlLabel
                  key={index}
                  value={compl}
                  control={<Checkbox />}
                  label={compl}
                />
              ))}
            </RadioGroup>
            <Typography variant={"h5"} marginTop={5}>
              Рекомендуемый возраст
            </Typography>
            <Slider max={120} marks={age} valueLabelDisplay="auto" />
          </Grid>
        </Grid>
        <Stack direction={"row"} justifyContent={"end"} marginTop={4} gap={1}>
          <Button>Применить</Button>
          <Button>Сбросить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
