import { ChangeEvent, FC } from "react";
import { IFilter } from "../../../models/tourListModels/IFilter";
import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  FormControl,
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
import { IFilterProps } from "../FilterTypes/IFilterProps";
import { ISearchRequest } from "../../../models/tourListModels/ISearchRequest";

const tourDuration: string[] = [
  "Менее недели",
  "1-2 недели",
  "2 недели - 1 месяц",
  "Более месяца",
  "Другое:",
];

export const ComplexFilter: FC<IFilterProps> = ({
  filters,
  searchData,
  setSearchData,
}) => {
  const { maxPrice, category, complexity } = filters;
  const activeModals = useSelector(
    (state: RootState) => state.modal.activeModals
  );
  const dispatch = useDispatch();

  const handlerCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchData.category.indexOf(e.target.value) === -1) {
      setSearchData({
        ...searchData,
        category: [...searchData.category, e.target.value],
      });
    } else {
      setSearchData({
        ...searchData,
        category: [
          ...searchData.category.filter((item) => item !== e.target.value),
        ],
      });
    }
  };

  const handlerComplexityChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (searchData.complexity.indexOf(e.target.value) === -1) {
      setSearchData({
        ...searchData,
        complexity: [...searchData.complexity, e.target.value],
      });
    } else {
      setSearchData({
        ...searchData,
        complexity: [
          ...searchData.complexity.filter((item) => item !== e.target.value),
        ],
      });
    }
  };

  const handleChangeField = (key: keyof ISearchRequest, e: number[]) => {
    let numbers = Object.values(e);
    setSearchData({
      ...searchData,
      [key]: { from: numbers[0], to: numbers[1] },
    });
  };

  const handlerConfirmClick = () => {
    dispatch(setModalInactive("filterModal"));
  };

  const handlerClearClick = () => {
    setSearchData({
      searchParam: searchData.searchParam,
      category: [],
      tourDuration: searchData.tourDuration,
      complexity: [],
      price: {
        from: 0,
        to: 5000,
      },
      recommendedAge: {
        from: 0,
        to: 14,
      },
      region: searchData.region,
      tourDate: searchData.tourDate,
      maxPersonNumber: searchData.maxPersonNumber,
    });
  };

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
                  checked={
                    searchData.category.indexOf(cat) !== -1 ? true : false
                  }
                  value={cat}
                  control={<Checkbox onChange={handlerCategoryChange} />}
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
            <Slider
              max={maxPrice}
              marks={marks}
              value={[searchData.price.from, searchData.price.to]}
              onChange={(e, value) =>
                handleChangeField("price", value as number[])
              }
              valueLabelDisplay="auto"
            />
          </Grid>
          <Grid item sm={3}>
            <Typography variant={"h5"}>Сложность маршрута</Typography>
            <RadioGroup>
              {complexity.map((compl, index) => (
                <FormControlLabel
                  key={index}
                  checked={
                    searchData.complexity.indexOf(compl) !== -1 ? true : false
                  }
                  value={compl}
                  control={<Checkbox onChange={handlerComplexityChange} />}
                  label={compl}
                />
              ))}
            </RadioGroup>
            <Typography variant={"h5"} marginTop={5}>
              Рекомендуемый возраст
            </Typography>
            <Slider
              max={120}
              marks={age}
              value={[
                searchData.recommendedAge.from,
                searchData.recommendedAge.to,
              ]}
              onChange={(e, value) =>
                handleChangeField("recommendedAge", value as number[])
              }
              valueLabelDisplay="auto"
            />
          </Grid>
        </Grid>
        <Stack direction={"row"} justifyContent={"end"} marginTop={4} gap={1}>
          <Button onClick={handlerConfirmClick}>Применить</Button>
          <Button onClick={handlerClearClick}>Сбросить</Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};
